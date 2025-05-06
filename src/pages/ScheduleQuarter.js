import React from 'react'
import ScheduleCourse from './ScheduleCourse'

function ScheduleQuarter(props) {
    return (
        <div className="w-full border-2 p-8 flex flex-col gap-4">
            <ScheduleCourse year={props.year} quarter={props.quarter} courseNumber="1"/>
            <ScheduleCourse year={props.year} quarter={props.quarter} courseNumber="2"/>
            <ScheduleCourse year={props.year} quarter={props.quarter} courseNumber="3"/>
        </div>
    )
}

export default ScheduleQuarter;