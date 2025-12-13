import ScheduleYear from './ScheduleYear';
import { SelectedInfoContext } from '../App.js'
import { useContext } from 'react';


/** 
 * Component that holds all of the planner components
 */

function Schedule() {
    const {selectedInfo} = useContext(SelectedInfoContext)
    return (
        <>
            <div className="flex-1 ml-4">
                <ScheduleYear year={parseInt(selectedInfo.year % 1000) + 1}/> 
                <ScheduleYear year={parseInt(selectedInfo.year % 1000) + 2}/> 
                <ScheduleYear year={parseInt(selectedInfo.year % 1000) + 3}/> 
                <ScheduleYear year={parseInt(selectedInfo.year % 1000) + 4}/> 
            </div>
        </>
    )
}

export default Schedule;