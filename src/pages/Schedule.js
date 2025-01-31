import courseData from '../data/CSE.json'
import majorData from '../data/CS26.json'
import React from 'react'
import { useState } from 'react';
import ScheduleYear from './ScheduleYear';

// This component will hold the array of current classes added to the schedule
// Will also show the courses left

function Schedule() {

    const [addedCourses, modifyCourses] = useState({});

    const changeCourses = (courseKey) => {
        modifyCourses();
    }

    return (
        <div className="w-5/6 border-2 p-8">
            <ScheduleYear modifyCourses={modifyCourses}/> 
        </div>
    )
}

export default Schedule;