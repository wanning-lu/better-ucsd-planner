import { useState, useContext } from 'react';
import ClassInfo from './ClassInfo';
import { SelectedCoursesContext } from '../App.js'

function Dropdown(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    const { selectedCourses, addCourse } = useContext(SelectedCoursesContext)

    // show how many selected courses satsify the current requirement
    let numFulfilled = 0
    for (let selectedCourse of selectedCourses) {
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

    // this ensures that the single core classes show up first
    // then, the ones with multiple options show up later
    if (!props.electiveName) {
        props.classes.sort((a, b) => a.length - b.length);
    }

    return (
        <>
        <div className="w-5/6 mx-auto">
        <div className="p-2 rounded-md cursor-pointer hover:bg-slate-100" onClick={handleOpen}>
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
                    addCourse(classInfo[0])
                    return (
                        <ClassInfo classCode={classInfo[0]} onOpenPopup={props.openPopup} />
                    )
                } else {
                    return (
                        <>
                        <hr></hr>
                        <div>Choose one:</div>
                        {classInfo.map((coreClassInfo) => (
                            <>
                            <div className="w-4 inline-block"></div>
                            <ClassInfo classCode={coreClassInfo} onOpenPopup={props.openPopup}/>
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
                <ClassInfo classCode={classInfo} onOpenPopup={props.openPopup}/>
            ))}
            </div>
        }
        </div>
        </>
    )
}

export default Dropdown