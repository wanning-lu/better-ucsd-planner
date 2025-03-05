import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import ScheduleQuarter from './ScheduleQuarter'

import { useContext, useState, useEffect } from 'react';
import { PlannedCoursesContext } from './Schedule.js';

function ScheduleYear(props) {
    const { plannedCourses, addPlanCourse, removePlanCourse } = useContext(PlannedCoursesContext)

    return (
        <>
        <div className="w-full border-2 flex gap-4 h-auto">
            <ScheduleQuarter year={props.year - 1} quarter="FA"/>
            <ScheduleQuarter year={props.year} quarter="WI"/>
            <ScheduleQuarter year={props.year} quarter="SP"/>
            <ScheduleQuarter year={props.year} quarter="SU"/>
        </div>
        </>
    )
}

export default ScheduleYear;