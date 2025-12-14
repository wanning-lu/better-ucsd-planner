import { useState, useContext } from 'react';
import courseData from '../data/courses.json'
import { SelectedCoursesContext } from '../App.js'
import { PlannedCoursesContext } from '../App.js';

/*
 * Component for each individual class in 'Discover'
 */
function ClassInfo(props) {
    const { selectedCoursesObj } = useContext(SelectedCoursesContext)
    const [ selectedCourses, addCourse, removeCourse ] = selectedCoursesObj

    const { plannedCourses, removePlanCourse } = useContext(PlannedCoursesContext)
    
    // Retrieve the class object from our data
    // If it doesn't exist, we just a placeholder first
    let classData = {}

		let classCode = props.classCode.replace("\n", " ")
			
    if (courseData.filter(obj => obj.course_code === classCode).length === 0) {
        classData = {'course_code': 'BLAH XXX', 'course_name': 'ERROR: DOES NOT EXIST IN COURSE CATALOG', 'units': 69, 'desc': 'BLAH'}
    } else {
        classData = courseData.filter(obj => obj.course_code === classCode)[0]
    }
     
    // For when the user clicks on the course name to expand its info
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open)
    }
    
    // Add course to the wishlist
    let isSelected = false;
    if (classCode in selectedCourses) {
        isSelected = true;
    }

    return (
			<>
			{
				classData.course_code == 'BLAH XXX' ? <></> :
				<input type="checkbox" name={classCode} value={classCode} checked={isSelected} onChange={e => {
						if (e.target.checked) {
								addCourse(classCode, props.category)
						} else {
							removeCourse(classCode)
							// if this course has been planned in the schedule
							if (Object.values(plannedCourses).some(courseInfo => courseInfo.courseName === classCode)) {
								removePlanCourse(Object.keys(plannedCourses).find(
										key => plannedCourses[key].courseName === classCode))
							}
						}
				}}/>
			}
			
			<div className="inline-block ml-1" onClick={handleOpen}>{" " + classCode + ": " + classData['course_name']}</div>
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