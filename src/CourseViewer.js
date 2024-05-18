import CourseColumn from "./CourseColumn"

let dummymajor = {
    major: 'major1',
    major_code: 'MA1',
    courses: [
        'course1',
        'course2',
        'course3'
    ]
}

let course1 = {
    course_code: "CO1",
    name: 'course1',
    prereqs: [
        'course2'
    ]
}

let course2 = {
    course_code: "CO2",
    name: 'course2',
    prereqs: [
        'course3'
    ]
}

let course3 = {
    course_code: "CO3",
    name: 'course3',
    prereqs: [
    ]
}

function CourseViewer(props) {
    return (
        <div class="h-[80vh] flex flex-row gap-10">
        {dummymajor.courses.map((course) => (
            <CourseColumn course_name={course}/>
        ))}
        </div>
    )
}

export default CourseViewer;