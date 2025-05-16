import { useState, useEffect, useRef, useContext } from 'react';
import { SelectedCoursesContext } from '../App.js'
import { PlannedCoursesContext } from './Home.js';
import CourseViewer from './CourseViewer';
import majorDataArray from '../data/CS26.json'

/**
 * Popup that displays remaining course + course graph information on planner page
 */
function Popup() {
    const { selectedCourses } = useContext(SelectedCoursesContext)
    const { plannedCourses }  = useContext(PlannedCoursesContext)
    const [isOpened, setOpenPopup] = useState(false);

    // construct the remaining requirement object here
    let remainingReq = {}
    let majorData = majorDataArray[0]
    
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
    for (const [key, courseInfo] of Object.entries(plannedCourses)) {
      let courseCode = courseInfo.courseName
      let indexToRemove = remainingReq[selectedCourses[courseCode]][1].indexOf(courseCode)
      remainingReq[selectedCourses[courseCode]][1].splice(indexToRemove, 1)
      remainingReq[selectedCourses[courseCode]][0] -= 1
    }

    const [courseViewed, changeCourseView] = useState("none")

    // using React state to change max height, allows for smooth transition
    const arrowRef = useRef(null);
    const [height, setHeight] = useState("0px");
    useEffect(() => {
        if (arrowRef.current) {
          if (isOpened) {
            setHeight(`${arrowRef.current.scrollHeight}px`);
          } else {
            setHeight("0px");
          }
        }
      }, [isOpened]);

    return (
        <div className="fixed bottom-0 left-0 flex flex-col items-center w-screen">
            <div className="w-20 text-center bg-gray-300 rounded-t-md hover:cursor-pointer" onClick={() => setOpenPopup(!isOpened)}>^</div>
            <div ref={arrowRef} style={{ maxHeight: height }} className="flex w-full overflow-auto transition-all duration-300 ease-out resize-y">
                <div className="w-[20vw] bg-white border-2">
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
                <div className="w-[80vw] relative">
                    <select onChange={(e) => {changeCourseView(e.target.value)}}className="absolute top-5 left-5 z-10 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        {Object.keys(selectedCourses).map((course) => {
                            return (<option value={course}>{course}</option>)
                        })}
                    </select>
                    <CourseViewer selectedClass={courseViewed}/>
                </div>
            </div>
        </div>
    )
}

export default Popup