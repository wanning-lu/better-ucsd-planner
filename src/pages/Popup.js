import { useState, useEffect, useRef, useContext } from 'react';
import { SelectedCoursesContext } from '../App.js'
import { PlannedCoursesContext } from '../App.js';
import { SelectedInfoContext } from '../App.js';
import CourseViewer from './CourseViewer';
import majorDataArray from '../data/majors.json'

/**
 * Popup that displays remaining course + course graph information on planner page
 */
function Popup() {
    const { selectedCoursesObj } = useContext(SelectedCoursesContext)
    const [ selectedCourses, addCourse, removeCourse ] = selectedCoursesObj
    
    const { plannedCourses }  = useContext(PlannedCoursesContext)
    const [isOpened, setOpenPopup] = useState(false);

    const { selectedInfo } = useContext(SelectedInfoContext)

    // construct the remaining requirement object here
    let remainingReq = {}
    let majorData = majorDataArray.filter(major => major.code === selectedInfo.major)[0]
    
    // initializing the object
    for (const majorKey in majorData) {
      if (majorKey === 'name' || majorKey === 'code') {
          continue
      }

      if (majorKey === 'core_classes') {
        remainingReq['Core'] = [majorData[majorKey].length, []]
        continue
      }

      // first element is num required classes for the category
      // second element is list of classes selected that haven't
      // been planned  yet
      remainingReq[majorKey] = [majorData[majorKey][0], []]
    }

    // adding possible classes to fulfill requirement using selected courses
    for (const [course, category] of Object.entries(selectedCourses)) {
      if (course === "") {
        continue
      }
      remainingReq[category][1].push(course)
    }

    // factoring in the courses that have already been planned
    for (const [_, courseInfo] of Object.entries(plannedCourses)) {
      let courseCode = courseInfo.courseName
      let indexToRemove = remainingReq[selectedCourses[courseCode]][1].indexOf(courseCode)
      remainingReq[selectedCourses[courseCode]][1].splice(indexToRemove, 1)
      remainingReq[selectedCourses[courseCode]][0] -= 1
    }

    // calculate units remaining
    let totalPlannedUnits = 0
    let totalPlannedUpperUnits = 0
    for (const [_, courseInfo] of Object.entries(plannedCourses)) {
      const [_, courseNumber] = courseInfo.courseName.split(' ')
      if (courseNumber.length === 3 && !isNaN(courseNumber)) {
        totalPlannedUpperUnits += courseInfo.units
      }
      totalPlannedUnits += courseInfo.units
    }

    const [courseViewed, changeCourseView] = useState("none")

    // using React state to change max height, allows for smooth transition
    const arrowRef = useRef(null);
    const [width, setWidth] = useState("0px");
    useEffect(() => {
      if (arrowRef.current) {
        if (isOpened) {
          setWidth(`${window.innerWidth / 2}px`);
        } else {
          setWidth("0px");
        }
      }
    }, [isOpened]);

    return (
        <div className="fixed top-0 left-0 flex items-center h-screen">
          <div ref={arrowRef} style={{ maxWidth: width }} className="flex-1 h-screen overflow-auto transition-all duration-300 ease-out resize-x">
            <div className="bg-white border-2">
              <div>{totalPlannedUnits}/180 units</div>
              <div>{totalPlannedUpperUnits}/60 upper div units</div>
              <div className="font-bold">Remaining course requirements</div>
              {Object.keys(remainingReq).map((category) => (
                <>
                <div>{remainingReq[category][0]} {category}</div>
                {remainingReq[category][1].map((course) => (
                  <div className="ml-5">{course}</div>
                ))}
                </>
              ))}
            </div>
            <div className="relative">
              <select onChange={(e) => {changeCourseView(e.target.value)}}className="absolute top-5 left-5 z-10 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                {Object.keys(selectedCourses).map((course) => {
                    return (<option value={course}>{course}</option>)
                })}
              </select>
              <CourseViewer selectedClass={courseViewed}/>
            </div>
          </div>
          <div className="w-5 h-20 text-center bg-gray-300 rounded-r-md hover:cursor-pointer" onClick={() => setOpenPopup(!isOpened)}>{">"}</div>
        </div>
    )
}

export default Popup