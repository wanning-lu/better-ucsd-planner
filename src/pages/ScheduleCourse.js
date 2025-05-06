import React from 'react'
import { SelectedCoursesContext } from '../App.js'
import { useContext, useState, useEffect } from 'react';
import { PlannedCoursesContext } from './Schedule.js';

// needs a key, such as F24-1, where it denotes that it is the first course of Fall '24
// this allows it to be traceable in the main component, where we need to figure out if we want to add, delete, or modify

function ScheduleCourse(props) {
    const { selectedCourses } = useContext(SelectedCoursesContext)
    const { plannedCourses, addPlanCourse, removePlanCourse } = useContext(PlannedCoursesContext)

    let keyName = props.quarter + props.year + "-" + props.courseNumber;

    const [selectedCourse, changeCourse] = useState(JSON.parse(localStorage.getItem("selectedCourse-" + keyName)) || "")

    useEffect(() => {
    }, [plannedCourses]);

    return (
        <div className="h-10 flex justify-items-end w-full">
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
              className={ (keyName in plannedCourses && plannedCourses[keyName].status === 'red' ? "bg-red-400 " : "") + "w-5/6 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              }
            >
              {selectedCourses.map((course) => {
                if (typeof plannedCourses === 'undefined' || course === selectedCourse || !(Object.values(plannedCourses).map(obj => obj.courseName).includes(course))) {
                  return (<option value={course}>{course}</option>)
                } else {
                  return (<></>)
                }
              })}
            </select>
            {keyName in plannedCourses && plannedCourses[keyName].status === 'red' ? 
                <div className="flex-1 flex justify-center justify-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-full size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div> : <></>
              }
        </div>
    )
}

export default ScheduleCourse;