import courseData from '../data/CSE.json'
import majorDataArray from '../data/CS26.json'
import Dropdown from './Dropdown';
import { Link } from "react-router-dom";


let majorData = majorDataArray[0]
// core classes should be its own dropdown, with one dropdown avail for each elective
let coreClasses = []
let electiveClasses = []

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

function Discover() {
    
    return (
        <div>
            <Dropdown classes={coreClasses} />
            {electiveClasses.map((elective) => (
              <Dropdown classes={elective.slice(2)} numRequired={elective[1]} electiveName={elective[0]}/>
            ))}
        </div>
    )
}

export default Discover