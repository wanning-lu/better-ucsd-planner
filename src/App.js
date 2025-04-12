import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout"
import Discover from "./pages/Discover";
import { createContext, useState } from 'react';

export const SelectedCoursesContext = createContext();

function sortSelectedCourses(a, b) {
	const [nameA, numA] = a.split(' ');
	const [nameB, numB] = b.split(' ');
	
	// compare course letters
	if (nameA < nameB) return -1;
	if (nameA > nameB) return 1;
	
	// check first that the number isn't something like "20A"
	if (isNaN(numA) || isNaN(numB)) {
		if (numA < numB) return -1;
		if (numA > numB) return 1;
	}

	// sort numerically
	return parseInt(numA) - parseInt(numB);
}

const SelectedCoursesProvider = ({ children }) => {
	const [selectedCourses, setCourses] = useState(JSON.parse(localStorage.getItem("wishlistedCourses")) || [""]);

	const addCourse = (newCourse) => {
		// we don't want duplicates
		if (selectedCourses.includes(newCourse)) {
			return
		}
		let newCourseArray = [...selectedCourses, newCourse].sort(sortSelectedCourses)
		setCourses(newCourseArray)
		localStorage.setItem("wishlistedCourses", JSON.stringify(newCourseArray));
	}

	const removeCourse = (removedCourse) => {
		setCourses(selectedCourses.filter((course) => {
			return course !== removedCourse
		}))
		localStorage.setItem("wishlistedCourses", JSON.stringify(selectedCourses.filter((course) => {
			return course !== removedCourse
		})));
	}

  return (
    <SelectedCoursesContext.Provider value={{ selectedCourses, addCourse, removeCourse }}>
      {children}
    </SelectedCoursesContext.Provider>
  );
};


function App() {
  return (
		<SelectedCoursesProvider>
			<BrowserRouter>
				<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="discover" element={<Discover />} />
						</Route>
				</Routes>
			</BrowserRouter>
		</SelectedCoursesProvider>
  );
}

export default App;
