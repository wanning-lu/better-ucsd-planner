import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout"
import Discover from "./pages/Discover";
import Welcome from "./pages/Welcome";
import { createContext, useState } from 'react';
import courseData from './data/CSE.json'

export const SelectedCoursesContext = createContext();
export const SelectedInfoContext = createContext();

const SelectedCoursesProvider = ({ children }) => {
	const [ selectedCourses, setCourses ] = useState(JSON.parse(localStorage.getItem("wishlistedCourses")) || {[""]: "none"});
	const [ totalUnits, setUnits ] = useState(localStorage.getItem("totalUnits") || 0)
	const [ totalUpperUnits, setUpperUnits ] = useState(localStorage.getItem("totalUpperUnits" || 0))

	const getUnits = (courseCode) => {
		let units
		if (courseData.filter(obj => obj.course_code === courseCode).length !== 0) {
			units = courseData.filter(obj => obj.course_code === courseCode)[0].units
		} else {
			units = 4 // if we haven't gotten this data yet, default to 4
		}
		return units
	}

	const addCourse = (newCourse, category) => {
		
		setCourses(prev => {
			// we need to put everything into this state setter
			// since the state variable is pretty funky with updating
			// the local storage is a hacky way to stop it from resetting at
			// the second loop of inputting the core classes
			if (newCourse in prev || 
				(JSON.parse(localStorage.getItem("wishlistedCourses") !== null && newCourse in JSON.parse(localStorage.getItem("wishlistedCourses"))))) {
				return JSON.parse(localStorage.getItem("wishlistedCourses"))
			}

			// get course units for the next step
			const units = getUnits(newCourse)

			// checking if the course is an upper div by looking at its number
			const [_, courseNumber] = newCourse.split(' ')
			if (courseNumber.length === 3 && !isNaN(courseNumber)) {
				setUpperUnits(prevUnits => {localStorage.setItem("totalUpperUnits", prevUnits + units); return (prevUnits + parseInt(units))})
			}

			setUnits(prevUnits => {localStorage.setItem("totalUnits", prevUnits + units); return (prevUnits + parseInt(units))})
			const newState = {...prev, [newCourse]: category}
			localStorage.setItem("wishlistedCourses", JSON.stringify(newState))
			return ({...prev, [newCourse]: category})
		})
	}

	const removeCourse = (removedCourse) => {
		if (!(removedCourse in selectedCourses)) {
			return
		}

		const units = getUnits(removedCourse)
		const [_, courseNumber] = removedCourse.split(' ')
		if (courseNumber.length === 3 && !isNaN(courseNumber)) {
			setUpperUnits(totalUpperUnits - units)
			localStorage.setItem("totalUpperUnits", totalUpperUnits - units)
		}
		setUnits(totalUnits - units)
		localStorage.setItem("totalUnits", totalUnits - units)

		let copySelectedCourses = {...selectedCourses}
		delete copySelectedCourses[removedCourse]
		setCourses(copySelectedCourses)
		localStorage.setItem("wishlistedCourses", JSON.stringify(copySelectedCourses))
	}

  return (
    <SelectedCoursesContext.Provider value={{ selectedCoursesObj: [selectedCourses, addCourse, removeCourse] }}>
      {children}
    </SelectedCoursesContext.Provider>
  );
};

// "info" includes major and college
const SelectedInfoProvider = ({ children }) => {
	const [selectedInfo, setInfo] = useState(JSON.parse(localStorage.getItem("selectedInfo")) || {major: 'none', college: 'none'})

	const changeInfo = (category, value) => {
		setInfo({...selectedInfo, [category]: value})
		localStorage.setItem("selectedInfo", JSON.stringify({...selectedInfo, [category]: value}))
	}

	return (
		<SelectedInfoContext.Provider value={{ selectedInfo, changeInfo }}>
			{children}
		</SelectedInfoContext.Provider>
	)
}


function App() {
  return (
		<SelectedInfoProvider>
		<SelectedCoursesProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Welcome />} />
						<Route path="planner" element={<Home />} />
						<Route path="discover" element={<Discover />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</SelectedCoursesProvider>
		</SelectedInfoProvider>
  );
}

export default App;
