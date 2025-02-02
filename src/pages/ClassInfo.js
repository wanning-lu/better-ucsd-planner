import { useState, useContext } from 'react';
import courseData from '../data/CSE.json'
import { SelectedCoursesContext } from '../App.js'

function ClassInfo(props) {
    const { selectedCourses, addCourse, removeCourse } = useContext(SelectedCoursesContext)
    
    let classData = {}
    if (courseData.filter(obj => obj.course_code === props.classCode).length == 0) {
        classData = {'course_code': 'BLAH XXX', 'course_name': 'BLAH', 'units': 69, 'desc': 'BLAH'}
    } else {
        classData = courseData.filter(obj => obj.course_code === props.classCode)[0]
    }
     
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }
    
    let isSelected = false;
    if (selectedCourses.includes(props.classCode)) {
        isSelected = true;
    }

    return (
        <>
        <input type="checkbox" name={props.classCode} value={props.classCode} checked={isSelected} onChange={e => {
            if (e.target.checked) {
                addCourse(props.classCode)
            } else {
                removeCourse(props.classCode)
            }
        }}/>
        <div className="inline-block" onClick={handleOpen}>{" " + props.classCode + ": " + classData['course_name']}</div>
        <div className="w-3/4">
        {open ? ( 
            <>
            <div>
                {classData['units'] + " units"}
            </div>
            <div>
                {classData['desc']}
            </div>
            <div onClick={() => props.onOpenPopup(classData)}>
                View Prerequisites
            </div>
            </>
        ) : null}
        </div>
        </>
    )

}

export default ClassInfo