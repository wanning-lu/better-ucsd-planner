import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import ScheduleQuarter from './ScheduleQuarter'

function ScheduleYear(props) {
    return (
        <div className="w-full border-2 flex gap-4 h-auto">
            <ScheduleQuarter onModifyCourses={props.modifyCourses}/>
            <ScheduleQuarter onModifyCourses={props.modifyCourses}/>
            <ScheduleQuarter onModifyCourses={props.modifyCourses}/>
            <ScheduleQuarter onModifyCourses={props.modifyCourses}/>
        </div>
    )
}

export default ScheduleYear;