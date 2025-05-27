import { SelectedCoursesContext } from '../App.js'
import { useContext, useState, useEffect } from 'react';
import { PlannedCoursesContext } from '../App.js';
import { Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react';

function sortSelectedCourses(a, b) {
	const [nameA, numA] = a.split(' ');
	const [nameB, numB] = b.split(' ');
	
	// compare course letters
	if (nameA < nameB) return -1;
	if (nameA > nameB) return 1;
	
	// check first that the number isn't something like "20A"
	if (isNaN(numA) || isNaN(numB)) {
		if (numA < numB) return -1;
		if (numA > numB) return 1;
	}

	// sort numerically
	return parseInt(numA) - parseInt(numB);
}

/**
 * Represents each course slot in the planner
 */
function ScheduleCourse(props) {
    const { selectedCoursesObj } = useContext(SelectedCoursesContext)
    const [ selectedCourses, addCourse, removeCourse ] = selectedCoursesObj
    const { plannedCourses, addPlanCourse, removePlanCourse } = useContext(PlannedCoursesContext)

    // needs a key, such as F24-1, where it denotes that it is the first course of Fall '24
    // this allows it to be traceable in the main component, where we need to figure out if we want to add, delete, or modify
    const keyName = props.quarter + props.year + "-" + props.courseNumber;

    const [selectedCourse, changeCourse] = useState(JSON.parse(localStorage.getItem("selectedCourse-" + keyName)) || "")

    useEffect(() => {
    }, [plannedCourses]);

    const sortedSelected = Object.keys(selectedCourses).sort(sortSelectedCourses)

    // for info panel when hovering over warning
    // code taken from https://www.material-tailwind.com/docs/react/popover
    const [openPopover, setOpenPopover] = useState(false)
    const triggers = {
      onMouseEnter: () => setOpenPopover(true),
      onMouseLeave: () => setOpenPopover(false),
    };

    return (
        <div className="flex w-full h-10 justify-items-end">
            <select 
              value={selectedCourse}
              onChange={(e) => {
                  changeCourse(e.target.value);
                  localStorage.setItem("selectedCourse-" + keyName, JSON.stringify(e.target.value));

                  if (e.target.value !== "") {
                    removePlanCourse(keyName)
                    addPlanCourse(keyName, e.target.value)
                  } else {
                    removePlanCourse(keyName)
                  }
                }
              }
              className={ (keyName in plannedCourses && plannedCourses[keyName].status === 'red' ? "bg-red-400 " : "") + "w-5/6 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" }
            >
              {sortedSelected.map((course) => {
                if (typeof plannedCourses === 'undefined' || course === selectedCourse || !(Object.values(plannedCourses).map(obj => obj.courseName).includes(course))) {
                  return (<option value={course}>{course}</option>)
                } else {
                  return (<></>)
                }
              })}
            </select>
            {keyName in plannedCourses && plannedCourses[keyName].status === 'red' ? 
              <div className="flex justify-center flex-1 justify-items-center">
                <Popover open={openPopover} handler={setOpenPopover}>
                  <PopoverHandler {...triggers}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-full size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                  </PopoverHandler>
                  <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
                    <div>missing prereqs:</div>
                    {plannedCourses[keyName].prereqsNeeded.map((course) => 
                      (<div>{course.join(" or ")}</div>)
                    )}
                  </PopoverContent>
                </Popover>
              </div> : <></>
            }
        </div>
    )
}

export default ScheduleCourse;