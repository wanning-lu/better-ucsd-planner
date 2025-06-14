import { useState, useContext, useEffect } from 'react';
import ClassInfo from './ClassInfo';
import { SelectedCoursesContext } from '../App.js'

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
        if (!props.electiveName) {
            for (let coreClassArray of props.classes) {
                if (coreClassArray.includes(selectedCourse)) {
                    numFulfilled += 1
                    break
                }
            }
        } else {
            if (props.classes.includes(selectedCourse)) {
                numFulfilled += 1
                continue
            }
        }
    }

    useEffect(() => {
			console.log('yohoho')
			console.log(localStorage.getItem("isCoreInit"))
			if (localStorage.getItem("isCoreInit") !== null && localStorage.getItem("isCoreInit") === 'true') {
					return
			}
			console.log('successss')
			
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
            <div className={open ? "" : "hidden"}>
            {props.classes.map((classInfo) => {
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
            <div className={open ? "" : "hidden"}>
            {props.classes.map((classInfo) => (
                <ClassInfo classCode={classInfo} category={props.electiveName} onOpenPopup={props.openPopup}/>
            ))}
            </div>
        }
        </div>
        </>
    )
}

export default Dropdown