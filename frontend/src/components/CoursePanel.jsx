import "./CoursePanel.css"


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
    assignCourse,

    showCourseForm,
    setShowCourseForm,
    courseFormData,
    setCourseFormData,
    addCourse
}) {
    return (
        <>
       <div className="course-actions">

    <button
        className="add-course-btn"
        onClick={() => {
            setCourseFormData({
                course_name: "",
                duration: ""
            });

            setShowCourseForm(true);
        }}
    >
        + Add Course
    </button>

    <button
        className="assign-course-btn"
        onClick={() => setShowAssignForm(true)}
    >
        Assign Course
    </button>

</div>

{showCourseForm && (
    <div className="add-form course-form">

        <h3>Add New Course</h3>

        <input
            type="text"
            placeholder="Course Name"
            value={courseFormData.course_name}
            onChange={(e) =>
                setCourseFormData({
                    ...courseFormData,
                    course_name: e.target.value
                })
            }
        />

        <input
            type="text"
            placeholder="Duration e.g. 3 Months"
            value={courseFormData.duration}
            onChange={(e) =>
                setCourseFormData({
                    ...courseFormData,
                    duration: e.target.value
                })
            }
        />

        <button onClick={addCourse}>
            Add Course
        </button>

        <button
            onClick={() => {
                setShowCourseForm(false);

                setCourseFormData({
                    course_name: "",
                    duration: ""
                });
            }}
        >
            Cancel
        </button>

    </div>
)}

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
            <div className="course-section-header">
    <div>
        <span className="section-label course-label">
            COURSE CATALOG
        </span>
        <h3>Available Courses</h3>
    </div>

    <span className="course-count">
        {courses.length} COURSES
    </span>
</div>

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
    <div className="course-section-header">
        <div>
            <span className="section-label course-label">
                ENROLLMENT RECORD
            </span>

            <h3>Assigned Courses</h3>
        </div>

        <span className="course-count">
            {enrollments.length} ASSIGNED
        </span>
    </div>

    {enrollments.length === 0 ? (
        <p className="panel-status">
            No courses assigned yet.
        </p>
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
                    Enrollment ID: {enrollment.enrollment_id}
                </small>
            </div>
        ))
    )}
</div>
        </>
    );
}

export default CoursePanel;