import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout"
import Discover from "./pages/Discover";
import { createContext, useState } from 'react';

export const SelectedCoursesContext = createContext();

// TODO: find where we sort the courses; otherwise, can just use Object.keys()


const SelectedCoursesProvider = ({ children }) => {
	const [selectedCourses, setCourses] = useState(JSON.parse(localStorage.getItem("wishlistedCourses")) || {[""]: "none"});

	const addCourse = (newCourse, category) => {
		// we don't want duplicates
		if (newCourse in selectedCourses) {
			return
		}

		// let newCourseArray = [...selectedCourses, newCourse].sort(sortSelectedCourses)
		setCourses({...selectedCourses, [newCourse]: category})
		console.log("huh?")
		localStorage.setItem("wishlistedCourses", JSON.stringify({...selectedCourses, [newCourse]: category}));
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
