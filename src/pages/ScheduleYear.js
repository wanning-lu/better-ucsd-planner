import React from 'react'
import ScheduleQuarter from './ScheduleQuarter'

function ScheduleYear(props) {

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