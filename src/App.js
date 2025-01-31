import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout"
import Discover from "./pages/Discover";
import { createContext, useState } from 'react';

export const SelectedCoursesContext = createContext();

const SelectedCoursesProvider = ({ children }) => {
	const [selectedCourses, setCourses] = useState([""]);

	const addCourse = (newCourse) => {
		setCourses([...selectedCourses, newCourse])
	}

	const removeCourse = (removedCourse) => {
		setCourses(selectedCourses.filter((course) => {
			return course !== removedCourse
		}))
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
