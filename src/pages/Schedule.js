import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import { useState, createContext, useContext } from 'react';
import ScheduleYear from './ScheduleYear';

// this component will hold the array of current classes added to the schedule
// will also show the courses left

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

    const [plannedCourses, planCourses] = useState(JSON.parse(localStorage.getItem("plannedCourses")) || {});

    const addPlanCourse = (key, newCourse) => {
        let currentCourseData = courseData.filter(obj => obj.course_code === newCourse)
        let copyPlannedCourses;
        // default options if a course doesn't exist in database yet
        if (currentCourseData.length == 0) {
            planCourses({...plannedCourses, [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': []}})
            localStorage.setItem("plannedCourses", {...plannedCourses, [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': []}})
            return
        }
        let afterCurrentCourse = false
        copyPlannedCourses = {...plannedCourses, [key]: {'courseName': newCourse, 'status': 'red', 'prereqsNeeded': currentCourseData[0].prerequisites}}
        // first, sort the quarters chronologically
        let sortedQuarters = Object.keys(copyPlannedCourses).sort(quarterSort)
        // want to check if earlier courses satisfy prereqs for current course
        // then see if later courses have the current course as prereq
        for (const quarter of sortedQuarters) {
            console.log(quarter)
            if (quarter.slice(0, 4) === key.slice(0, 4)) {
                afterCurrentCourse = true;
                continue;
            }

            if (afterCurrentCourse) {
                if (copyPlannedCourses[quarter].prereqsNeeded.some(prereq => prereq.includes(newCourse))) {
                    let newPrereqsNeeded = copyPlannedCourses[quarter].prereqsNeeded.filter(prereq => !prereq.includes(newCourse))
                    let status = newPrereqsNeeded.length > 0 ? "red" : "green"
                    copyPlannedCourses = {...copyPlannedCourses, [quarter]: {"courseName": copyPlannedCourses[quarter].courseName, "status": status, "prereqsNeeded": newPrereqsNeeded}}
                }
            } else {
                if (copyPlannedCourses[key].prereqsNeeded.some(prereq => prereq.includes(copyPlannedCourses[quarter].courseName))) {
                    let newPrereqsNeeded = copyPlannedCourses[key].prereqsNeeded.filter(prereq => !prereq.includes(copyPlannedCourses[quarter].courseName))
                    let status = newPrereqsNeeded.length > 0 ? "red" : "green"
                    copyPlannedCourses = {...copyPlannedCourses, [key]: {"courseName": newCourse, "status": status, "prereqsNeeded": newPrereqsNeeded}}
                }
            }
        }

        planCourses(copyPlannedCourses)
        localStorage.setItem("plannedCourses", JSON.stringify(copyPlannedCourses))
    }

    const removePlanCourse = (key) => {
        const copyPlannedCourses = {...plannedCourses}
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

function Schedule() {
    return (
        <>
        <PlannedCoursesProvider>
            <div className="w-5/6 border-2 p-8">
                <ScheduleYear year="24"/> 
                <ScheduleYear year="25"/> 
                <ScheduleYear year="26"/> 
            </div>
        </PlannedCoursesProvider>
        </>
    )
}

export default Schedule;