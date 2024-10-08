import { useState } from 'react';
import courseData from '../data/CSE.json'

function ClassInfo(props) {
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

    return (
        <>
        <label for={props.classCode} className="block cursor-pointer" onClick={handleOpen}>
        <input type="checkbox" name={props.classCode} value={props.classCode}/>
        {" " + props.classCode + ": " + classData['course_name']}
        </label>
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