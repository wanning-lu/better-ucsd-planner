import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import ScheduleQuarter from './ScheduleQuarter'

import { useContext, useState } from 'react';
import { PlannedCoursesContext } from './Schedule.js';

function ScheduleYear(props) {
    const { plannedCourses, addPlanCourse, removePlanCourse } = useContext(PlannedCoursesContext)

    return (
        <>
        <div>{Object.values(plannedCourses)}</div>
        <div className="w-full border-2 flex gap-4 h-auto">
            <ScheduleQuarter/>
            <ScheduleQuarter/>
            <ScheduleQuarter/>
            <ScheduleQuarter/>
        </div>
        </>
    )
}

export default ScheduleYear;