import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import ScheduleCourse from './ScheduleCourse'

function ScheduleQuarter(props) {
    return (
        <div className="w-full border-2 p-8 flex flex-col gap-4">
            <ScheduleCourse onModifyCourses={props.onModifyCourses}/>
            <ScheduleCourse onModifyCourses={props.onModifyCourses}/>
            <ScheduleCourse onModifyCourses={props.onModifyCourses}/>
        </div>
    )
}

export default ScheduleQuarter;