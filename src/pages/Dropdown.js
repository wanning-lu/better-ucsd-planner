import { useState, useContext, useEffect } from 'react';
import ClassInfo from './ClassInfo';
import { SelectedCoursesContext } from '../App.js'
import courseData from '../data/courses.json'

/**
 * A component representing each category of major requirement
 * For example, core vs. system elective
 */
function Dropdown(props) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open)
	}

	const { selectedCoursesObj } = useContext(SelectedCoursesContext)
	const [ selectedCourses, addCourse, removeCourse ] = selectedCoursesObj

	// show how many selected courses satsify the current requirement
	let numFulfilled = 0
	for (let selectedCourse of Object.keys(selectedCourses)) {
		for (let classArray of props.classes) {
			if (classArray.includes(selectedCourse)) {
				numFulfilled += 1
				break
			}
		}
	}

	// immediately add all singular core classes (for both gened and major)
	useEffect(() => {
		if (props.electiveName) {
			return
		}
		
		if (localStorage.getItem("isCoreInit") !== null && localStorage.getItem("isCoreInit") === 'true') {
			return
		}
		
		for (const courseInfo of props.classes) {
			if (courseInfo.length === 1) {
				if (courseInfo[0] in selectedCourses) {
						break
				}
				addCourse(courseInfo[0], "Core")
			}
		}
		localStorage.setItem("isCoreInit", true)
	}, [])

	// this ensures that the single core classes show up first
	// then, the ones with multiple options show up later
	if (!props.electiveName) {
		props.classes.sort((a, b) => a.length - b.length);
	}

	return (
		<>
		<div className="w-5/6 mx-auto">
		
			<div className="p-2 rounded-md cursor-pointer hover:bg-gray-100" onClick={handleOpen}>
				<div>
					{/* placeholder for an icon LOL */}
					{open ? (
							<>{'v '}</>
					) : <>{'> '}</>}
					{/* title of the dropdown and num classes for the requirement */}
					{props.electiveName ? (
							<>{props.electiveName} ({numFulfilled} / {props.numRequired})</>
					) : <>Core Requirements ({numFulfilled} / {props.classes.length})</>}
				</div>
			</div>
			
			{/* rendering for core classes */}
			{props.electiveName ? "" : 
				<div className={open ? "p-4 border-2 rounded-md" : "hidden"}>
					{props.classes.map((classInfo) => {
						// rendering a whole department of classes
						if (classInfo.includes("*")) {
							courseData.filter(classCode => classCode.includes(classInfo.substring(1))).map((course) => {
								<ClassInfo classCode={course} category={"Core"} onOpenPopup={props.openPopup} />
							})
						}
						
						if (classInfo.length === 1) {
							// add these to the selected courses since they're mandatory
							return (
									<ClassInfo classCode={classInfo[0]} category={"Core"} onOpenPopup={props.openPopup} />
							)
						} else {
							return (
								<>
								<hr></hr>
								<div>Choose one:</div>
								{classInfo.map((coreClassInfo) => (
									<>
									<div className="inline-block w-4"></div>
									<ClassInfo classCode={coreClassInfo} category={"Core"} onOpenPopup={props.openPopup}/>
									</>
								))}
								<hr></hr>
								</>
							)
						}
					})}
				</div>
			}

			{/* rendering for elective classes */}
			{!props.electiveName ? "" :
				<div className={open ? "p-4 border-2 rounded-md max-h-[20em] overflow-scroll" : "hidden"}>
					{props.classes.map((classInfo) => {
						// rendering a whole department of classes
						if (classInfo[0].includes("*")) {
							console.log(courseData.filter(obj => obj.course_code.includes(classInfo[0].substring(1))))
							return courseData.filter(obj => obj.course_code.includes(classInfo[0].substring(1))).map((course) => {
								// filter out graduate courses
								let courseNumber = course.course_code.substring(course.course_code.indexOf(" ") + 1)
								// remove letters after the course number
								while (isNaN(courseNumber)) {
									courseNumber = courseNumber.slice(0, -1)
								}
								if (+courseNumber < 200) {	
									return (<ClassInfo classCode={course.course_code} category={"Core"} onOpenPopup={props.openPopup} />)
								}
							})
						}
						
						else if (classInfo.length === 1) {
							// add these to the selected courses since they're mandatory
							return (
								<ClassInfo classCode={classInfo[0]} category={props.electiveName} onOpenPopup={props.openPopup} />
							)
						} else {
							return (
								<>
								<hr></hr>
								<div>Choose one:</div>
								{classInfo.map((coreClassInfo) => (
									<>
									<div className="inline-block w-4"></div>
									<ClassInfo classCode={coreClassInfo} category={props.electiveName} onOpenPopup={props.openPopup}/>
									</>
								))}
								<hr></hr>
								</>
							)
						}
					})}
				</div>
			}
		</div>
		</>
	)
}

export default Dropdown