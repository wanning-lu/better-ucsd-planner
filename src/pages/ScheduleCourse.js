import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import { SelectedCoursesContext } from '../App.js'
import { useContext, useState } from 'react';
import { PlannedCoursesContext } from './Schedule.js';

// needs a key, such as F24-1, where it denotes that it is the first course of Fall '24
// this allows it to be traceable in the main component, where we need to figure out if we want to add, delete, or modify

function ScheduleCourse() {
    const { selectedCourses } = useContext(SelectedCoursesContext)
    const { plannedCourses, addPlanCourse, removePlanCourse } = useContext(PlannedCoursesContext)

    const [selectedCourse, changeCourse] = useState("")

    let keyName = "amongoo";

    return (
        <div className="border-2 h-10">
            <select 
              value = {selectedCourse}
              onChange= {(e) => {
                  changeCourse(e.target.value);

                  if (e.target.value !== "") {
                    addPlanCourse(keyName, e.target.value)
                  } else {
                    removePlanCourse(keyName)
                  }
                }
              }
              className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
            {selectedCourses.map((course) => {
              if (typeof plannedCourses === 'undefined' || !(course in Object.values(plannedCourses))) {
                return (<option value={course}>{course}</option>)
              }
            })}
          </select>
        </div>
    )
}

export default ScheduleCourse;