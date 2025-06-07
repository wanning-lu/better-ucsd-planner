import ScheduleYear from './ScheduleYear';

/** 
 * Component that holds all of the planner components
 */

function Schedule() {
    return (
        <>
            <div className="flex-1">
                <ScheduleYear year="24"/> 
                <ScheduleYear year="25"/> 
                <ScheduleYear year="26"/> 
            </div>
        </>
    )
}

export default Schedule;