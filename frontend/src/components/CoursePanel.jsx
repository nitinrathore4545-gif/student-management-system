function CoursePanel({
    courses,
    courseLoading,
    students,
    enrollments,
    selectedStudent,
    setSelectedStudent,
    selectedCourse,
    setSelectedCourse,
    showAssignForm,
    setShowAssignForm,
    assignCourse
}) {
    return (
        <>
            <button onClick={() => setShowAssignForm(true)}>
                Assign Course
            </button>

            {showAssignForm && (
                <div className="add-form">
                    <h3>Assign Course</h3>

                    <select
                        value={selectedStudent}
                        onChange={(e) =>
                            setSelectedStudent(e.target.value)
                        }
                    >
                        <option value="">
                            Select Student
                        </option>

                        {students.map((student) => (
                            <option
                                key={student.id}
                                value={student.id}
                            >
                                {student.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedCourse}
                        onChange={(e) =>
                            setSelectedCourse(e.target.value)
                        }
                    >
                        <option value="">
                            Select Course
                        </option>

                        {courses.map((course) => (
                            <option
                                key={course.id}
                                value={course.id}
                            >
                                {course.course_name}
                            </option>
                        ))}
                    </select>

                    <button onClick={assignCourse}>
                        Assign
                    </button>

                    <button
                        onClick={() => setShowAssignForm(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}

            <div className="course-list">
               {courseLoading ? ( 
        <p className="panel-status">
            Loading courses...
        </p>
    ) : courses.length === 0 ? ( 
        <p className="panel-status">
            No courses available.
        </p>
    ) : ( 
                    courses.map((course) => (
                        <div
                            className="course-card"
                            key={course.id}
                        >
                            <strong>
                                {course.course_name}
                            </strong>

                            <span>
                                Duration:{" "}
                                {course.duration ||
                                    "Not specified"}
                            </span>

                            <small>
                                Course ID: {course.id}
                            </small>
                        </div>
                    ))
                )}
            </div>

            <div className="enrollment-list">
                <h3>Assigned Courses</h3>

                {enrollments.length === 0 ? (
                    <p>No courses assigned yet.</p>
                ) : (
                    enrollments.map((enrollment) => (
                        <div
                            className="enrollment-card"
                            key={enrollment.enrollment_id}
                        >
                            <strong>
                                {enrollment.student_name}
                            </strong>

                            <span>
                                {enrollment.course_name}
                            </span>

                            <small>
                                Enrollment ID:{" "}
                                {enrollment.enrollment_id}
                            </small>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default CoursePanel;