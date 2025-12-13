import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout"
import Discover from "./pages/Discover";
import Welcome from "./pages/Welcome";
import { createContext, useState } from 'react';
import courseData from './data/CSE.json'

export const SelectedCoursesContext = createContext();
export const SelectedInfoContext = createContext();

const SelectedCoursesProvider = ({ children }) => {
	const [ selectedCourses, setCourses ] = useState(JSON.parse(localStorage.getItem("wishlistedCourses")) || {[""]: "none"});
	const [ totalUnits, setUnits ] = useState(localStorage.getItem("totalUnits") || 0)
	const [ totalUpperUnits, setUpperUnits ] = useState(localStorage.getItem("totalUpperUnits" || 0))

	const getUnits = (courseCode) => {
		let units
		if (courseData.filter(obj => obj.course_code === courseCode).length !== 0) {
			units = courseData.filter(obj => obj.course_code === courseCode)[0].units
		} else {
			units = 4 // if we haven't gotten this data yet, default to 4
		}
		return units
	}

	const addCourse = (newCourse, category) => {
		
		setCourses(prev => {
			// we need to put everything into this state setter
			// since the state variable is pretty funky with updating
			// the local storage is a hacky way to stop it from resetting at
			// the second loop of inputting the core classes
			if (newCourse in prev || 
				(JSON.parse(localStorage.getItem("wishlistedCourses") !== null && newCourse in JSON.parse(localStorage.getItem("wishlistedCourses"))))) {
				return JSON.parse(localStorage.getItem("wishlistedCourses"))
			}

			// get course units for the next step
			const units = getUnits(newCourse)

			// checking if the course is an upper div by looking at its number
			const [_, courseNumber] = newCourse.split(' ')
			if (courseNumber.length === 3 && !isNaN(courseNumber)) {
				setUpperUnits(prevUnits => {localStorage.setItem("totalUpperUnits", prevUnits + units); return (prevUnits + parseInt(units))})
			}

			setUnits(prevUnits => {localStorage.setItem("totalUnits", prevUnits + units); return (prevUnits + parseInt(units))})
			const newState = {...prev, [newCourse]: category}
			localStorage.setItem("wishlistedCourses", JSON.stringify(newState))
			return ({...prev, [newCourse]: category})
		})
	}

	const removeCourse = (removedCourse) => {
		if (!(removedCourse in selectedCourses)) {
			return
		}

		const units = getUnits(removedCourse)
		const [_, courseNumber] = removedCourse.split(' ')
		if (courseNumber.length === 3 && !isNaN(courseNumber)) {
			setUpperUnits(totalUpperUnits - units)
			localStorage.setItem("totalUpperUnits", totalUpperUnits - units)
		}
		setUnits(totalUnits - units)
		localStorage.setItem("totalUnits", totalUnits - units)

		let copySelectedCourses = {...selectedCourses}
		delete copySelectedCourses[removedCourse]
		setCourses(copySelectedCourses)
		localStorage.setItem("wishlistedCourses", JSON.stringify(copySelectedCourses))
	}

  return (
    <SelectedCoursesContext.Provider value={{ selectedCoursesObj: [selectedCourses, addCourse, removeCourse], units: [ totalUnits, totalUpperUnits ] }}>
      {children}
    </SelectedCoursesContext.Provider>
  );
};

/**
 * Component that holds the array of planned courses
 */

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
                [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': [], 'units': 4}})
            localStorage.setItem("plannedCourses", {...plannedCourses,
                [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': [], 'units': 4}})
            return
        }

        let afterCurrentCourse = false
        if (currentCourseData[0].prerequisites.length === 0) {
            copyPlannedCourses = {...plannedCourses, 
                [key]: {'courseName': newCourse, 'status': 'green', 'prereqsNeeded': currentCourseData[0].prerequisites, 'units': currentCourseData[0].units}}
        } else {
            copyPlannedCourses = {...plannedCourses, 
                [key]: {'courseName': newCourse, 'status': 'red', 'prereqsNeeded': currentCourseData[0].prerequisites, 'units': currentCourseData[0].units}}
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
                                    "status": status, "prereqsNeeded": newPrereqsNeeded, "units": copyPlannedCourses[quarter].units}}
                }
            } else { // checks if prereqs are satisfied for current course
                if (copyPlannedCourses[key].prereqsNeeded.some(prereq => prereq.includes(copyPlannedCourses[quarter].courseName))) {
                    let newPrereqsNeeded = copyPlannedCourses[key].prereqsNeeded.filter(prereq => !prereq.includes(copyPlannedCourses[quarter].courseName))
                    let status = newPrereqsNeeded.length > 0 ? "red" : "green"
                    copyPlannedCourses = {...copyPlannedCourses, 
                        [key]: {"courseName": newCourse, "status": status, 
                                "prereqsNeeded": newPrereqsNeeded, "units": copyPlannedCourses[key].units}}
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

// "info" includes major and college
const SelectedInfoProvider = ({ children }) => {
	const [selectedInfo, setInfo] = useState(JSON.parse(localStorage.getItem("selectedInfo")) || {major: 'none', college: 'none', year: 'none'})

	const changeInfo = (newInfo) => {
		setInfo(newInfo)
        localStorage.clear()
		localStorage.setItem("selectedInfo", JSON.stringify(newInfo))
	}

	return (
		<SelectedInfoContext.Provider value={{ selectedInfo, changeInfo }}>
			{children}
		</SelectedInfoContext.Provider>
	)
}


function App() {
  return (
		<SelectedInfoProvider>
		<SelectedCoursesProvider>
		<PlannedCoursesProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Welcome />} />
						<Route path="planner" element={<Home />} />
						<Route path="discover" element={<Discover />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</PlannedCoursesProvider>
		</SelectedCoursesProvider>
		</SelectedInfoProvider>
  );
}

export default App;
