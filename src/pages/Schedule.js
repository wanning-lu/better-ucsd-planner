import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import { useState, createContext, useContext } from 'react';
import ScheduleYear from './ScheduleYear';

// This component will hold the array of current classes added to the schedule
// Will also show the courses left

export const PlannedCoursesContext = createContext();

const PlannedCoursesProvider = ({ children }) => {
    const [plannedCourses, planCourses] = useState({});

    const addPlanCourse = (key, newCourse) => {
        planCourses({...plannedCourses, [key]: newCourse})
    }

    const removePlanCourse = (key) => {
        const copyPlannedCourses = {...plannedCourses}
        delete copyPlannedCourses[key]
        planCourses(copyPlannedCourses)
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
            </div>
        </PlannedCoursesProvider>
        </>
    )
}

export default Schedule;