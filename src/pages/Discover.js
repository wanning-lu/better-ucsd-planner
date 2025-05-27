import majorDataArray from '../data/CS26.json'
import Dropdown from './Dropdown';
import { useContext, useState } from 'react';
import { SelectedCoursesContext } from '../App';
import CourseViewer from './CourseViewer';

let majorData = majorDataArray[0]
// core classes should be its own dropdown, with one dropdown avail for each elective
let coreClasses = []
let electiveClasses = []

// build core classes array and electives array
for (const majorKey in majorData) {
    if (majorKey === 'name' || majorKey === 'code') {
        continue
    }

    if (majorKey === 'core_classes') {
			for (const coreClass of majorData[majorKey]) {
				let options = coreClass.split(' or ')
				coreClasses.push(options)
			}
    } else {
			// elective format: name, number required, and classes
			let elective = [majorKey]
			elective = elective.concat(majorData[majorKey])
			electiveClasses.push(elective)
    }
}

/**
 * Overall discover page
 */
function Discover() {
    // for the course viewer graph
    const [popupContent, setPopupContent] = useState(null);
		const { units } = useContext(SelectedCoursesContext)
		const [ totalUnits, totalUpperUnits ] = units

    const openPopup = (content) => {
        if (popupContent !== null) {
            return
        }

        setPopupContent(content)
    }

    const closePopup = () => {
        setPopupContent(null)
    }
    
    return (
        <div>
            { popupContent &&
                <div className="fixed w-full h-5/6">
									<div onClick={() => closePopup()}>close</div>
									<CourseViewer selectedClass={popupContent['course_code']}/>
                </div>
            }
						<div className="w-5/6 mx-auto">
							<div>So far, you've selected:</div>
							<div>{totalUnits} of 180 required units</div>
							<div>{totalUpperUnits} of 60 required upper division units</div>
						</div>	
            <Dropdown classes={coreClasses} openPopup={openPopup}/>
            {electiveClasses.map((elective) => (
              <Dropdown classes={elective.slice(2)} numRequired={elective[1]} electiveName={elective[0]} openPopup={openPopup}/>
            ))}
        </div>
    )
}

export default Discover