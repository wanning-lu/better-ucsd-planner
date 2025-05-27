import React from 'react'
import ScheduleQuarter from './ScheduleQuarter'

function ScheduleYear(props) {

    return (
        <>
        <div className="font-semibold">20{props.year-1}-20{props.year}</div>
        <div className="flex w-full h-auto gap-4 mb-4">
            <ScheduleQuarter year={props.year - 1} quarter="FA"/>
            <ScheduleQuarter year={props.year} quarter="WI"/>
            <ScheduleQuarter year={props.year} quarter="SP"/>
            <ScheduleQuarter year={props.year} quarter="SU"/>
        </div>
        </>
    )
}

export default ScheduleYear;