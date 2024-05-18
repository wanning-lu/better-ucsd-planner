import Course from "./Course"

function CourseColumn(props) {
    return (
        <div class="h-full w-[15vw] border-2 flex flex-col justify-center gap-4">
            <Course course_name={props.course_name}/>
        </div>
    )
}

export default CourseColumn