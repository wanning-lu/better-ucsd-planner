import React from 'react'
import ScheduleCourse from './ScheduleCourse'

function ScheduleQuarter(props) {
    return (
        <>
        <div className="flex flex-col w-full gap-4 p-4 border-2">
            <div>{props.quarter}{props.year}</div>
            <ScheduleCourse year={props.year} quarter={props.quarter} courseNumber="1"/>
            <ScheduleCourse year={props.year} quarter={props.quarter} courseNumber="2"/>
            <ScheduleCourse year={props.year} quarter={props.quarter} courseNumber="3"/>
        </div>
        </>
    )
}

export default ScheduleQuarter;