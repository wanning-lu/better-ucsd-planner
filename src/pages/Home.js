import { useState, createContext } from 'react';
import courseData from '../data/CSE.json'
import Schedule from './Schedule.js';
import Popup from './Popup.js';

/**
 * Component that holds the array of planned courses
 */

const majors = ["cs major", "ece major"];

export const PlannedCoursesContext = createContext();

function quarterSort(a,b) {
    const seasonOrder = { "WI": 0, "SP": 1, "SU": 2, "FA": 3 };

    let seasonA = a.slice(0, 2);
    let seasonB = b.slice(0, 2);
    let yearA = parseInt(a.slice(2));
    let yearB = parseInt(b.slice(2));

    if (yearA !== yearB) {
        return yearA - yearB; // sort by year first
    }
    return seasonOrder[seasonA] - seasonOrder[seasonB]; // then by season order
}

const PlannedCoursesProvider = ({ children }) => {

    const [plannedCourses, planCourses] = useState(
        JSON.parse(localStorage.getItem("plannedCourses")) || {});

    const addPlanCourse = (key, newCourse) => {
        let currentCourseData = courseData.filter(obj => obj.course_code === newCourse)
        let copyPlannedCourses;

        // default options if a course doesn't exist in database yet
        if (currentCourseData.length === 0) {
            planCourses({...plannedCourses,
                [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': []}})
            localStorage.setItem("plannedCourses", {...plannedCourses,
                [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': []}})
            return
        }

        let afterCurrentCourse = false
        if (currentCourseData[0].prerequisites.length === 0) {
            copyPlannedCourses = {...plannedCourses, 
                [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': currentCourseData[0].prerequisites}}
        } else {
            copyPlannedCourses = {...plannedCourses, 
                [key]: {'courseName': newCourse, 'status': 'red', 'prereqsNeeded': currentCourseData[0].prerequisites}}
        }
        
        // first, sort the quarters chronologically
        let sortedQuarters = Object.keys(copyPlannedCourses).sort(quarterSort)
        // want to check if earlier courses satisfy prereqs for current course
        // then see if later courses have the current course as prereq
        for (const quarter of sortedQuarters) {

            // skip the current quarter
            if (quarter.slice(0, 4) === key.slice(0, 4)) {
                afterCurrentCourse = true;
                continue;
            }

            if (afterCurrentCourse) { // checks if current course satisfies prereq for future courses
                if (copyPlannedCourses[quarter].prereqsNeeded.some(prereq => prereq.includes(newCourse))) {
                    let newPrereqsNeeded = copyPlannedCourses[quarter].prereqsNeeded.filter(prereq => !prereq.includes(newCourse))
                    let status = newPrereqsNeeded.length > 0 ? "red" : "green"
                    copyPlannedCourses = {...copyPlannedCourses, 
                        [quarter]: {"courseName": copyPlannedCourses[quarter].courseName, 
                                    "status": status, "prereqsNeeded": newPrereqsNeeded}}
                }
            } else { // checks if prereqs are satisfied for current course
                if (copyPlannedCourses[key].prereqsNeeded.some(prereq => prereq.includes(copyPlannedCourses[quarter].courseName))) {
                    let newPrereqsNeeded = copyPlannedCourses[key].prereqsNeeded.filter(prereq => !prereq.includes(copyPlannedCourses[quarter].courseName))
                    let status = newPrereqsNeeded.length > 0 ? "red" : "green"
                    copyPlannedCourses = {...copyPlannedCourses, 
                        [key]: {"courseName": newCourse, "status": status, 
                                "prereqsNeeded": newPrereqsNeeded}}
                }
            }
        }

        planCourses(copyPlannedCourses)
        localStorage.setItem("plannedCourses", JSON.stringify(copyPlannedCourses))
    }

    const removePlanCourse = (key) => {
        if (!(key in plannedCourses)) {
            return
        }
        const removedCourse = plannedCourses[key].courseName
        let copyPlannedCourses = {...plannedCourses}
        
        let sortedQuarters = Object.keys(copyPlannedCourses).sort(quarterSort)
        let passedCurrentQuarter = false
        // add back the prereq to any future courses
        for (const quarter of sortedQuarters) {
            if (quarter.slice(0, 4) === key.slice(0, 4)) {
                passedCurrentQuarter = true;
                continue
            } else if (!passedCurrentQuarter) {
                continue
            }

            let currCourseData = courseData.filter(obj => obj.course_code === copyPlannedCourses[quarter].courseName)[0]
            copyPlannedCourses[quarter].prereqsNeeded = copyPlannedCourses[quarter].prereqsNeeded.concat(
                currCourseData.prerequisites.filter(prereq => prereq.includes(removedCourse)))

            if (copyPlannedCourses[quarter].prereqsNeeded.length > 0) {
                copyPlannedCourses[quarter].status = "red"
            }
        }

        delete copyPlannedCourses[key]
        planCourses(copyPlannedCourses)
        localStorage.setItem("plannedCourses", JSON.stringify(copyPlannedCourses));
    }
    return (
      <PlannedCoursesContext.Provider value={{ plannedCourses, addPlanCourse, removePlanCourse }}>
        {children}
      </PlannedCoursesContext.Provider>
    );
};

/**
 * Overall planner page
 */
function Home() {
  const [major, setMajor] = useState('none');

  return (
    <>
    <PlannedCoursesProvider>
      <div className="flex justify-center">
        <Schedule/>
        <Popup/>
      </div>
    </PlannedCoursesProvider>
    </>
  );
}

export default Home;