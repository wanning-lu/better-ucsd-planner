import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout"
import Discover from "./pages/Discover";
import Welcome from "./pages/Welcome";
import { createContext, useState } from 'react';

export const SelectedCoursesContext = createContext();
export const SelectedInfoContext = createContext();

const SelectedCoursesProvider = ({ children }) => {
	const [selectedCourses, setCourses] = useState(JSON.parse(localStorage.getItem("wishlistedCourses")) || {[""]: "none"});

	const addCourse = (newCourse, category) => {
		// we don't want duplicates
		if (newCourse in selectedCourses) {
			return
		}

		// let newCourseArray = [...selectedCourses, newCourse].sort(sortSelectedCourses)
		setCourses({...selectedCourses, [newCourse]: category})
		localStorage.setItem("wishlistedCourses", JSON.stringify({...selectedCourses, [newCourse]: category}))
	}

	const removeCourse = (removedCourse) => {
		if (!(removedCourse in selectedCourses)) {
			return
		}
		let copySelectedCourses = {...selectedCourses}
		delete copySelectedCourses[removedCourse]
		setCourses(copySelectedCourses)
		localStorage.setItem("wishlistedCourses", JSON.stringify(copySelectedCourses))
	}

  return (
    <SelectedCoursesContext.Provider value={{ selectedCourses, addCourse, removeCourse }}>
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
