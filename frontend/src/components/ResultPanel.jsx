import "./ResultPanel.css";

function ResultPanel({
    showMarksForm,
    setShowMarksForm,
    marksData,
    setMarksData,
    addMarks,

    enrollments,

    students,
    selectedResultStudent,
    setSelectedResultStudent,
    loadStudentResult,

    resultLoading,
    studentResult,
    setStudentResult,

    isTeacher,
    isStudent,
    user
}) {

    return (
        <div className="result-section">

            {/* =========================
                TEACHER - ADD MARKS
            ========================= */}

            {isTeacher && (
                <>
                    <button
                        className="add-marks-btn"
                        onClick={() => setShowMarksForm(true)}
                    >
                        Add Marks
                    </button>

                    {showMarksForm && (
                        <div className="add-form marks-form">

                            <h3>Add Marks</h3>

                            <select
                                value={marksData.enrollment_id}
                                onChange={(e) =>
                                    setMarksData({
                                        ...marksData,
                                        enrollment_id: e.target.value
                                    })
                                }
                            >

                                <option value="">
                                    Select Student & Course
                                </option>

                                {enrollments.map((enrollment) => (
                                    <option
                                        key={enrollment.enrollment_id}
                                        value={enrollment.enrollment_id}
                                    >
                                        {enrollment.student_name} —{" "}
                                        {enrollment.course_name}
                                    </option>
                                ))}

                            </select>

                            <input
                                type="text"
                                placeholder="Subject"
                                value={marksData.subject}
                                onChange={(e) =>
                                    setMarksData({
                                        ...marksData,
                                        subject: e.target.value
                                    })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Marks"
                                value={marksData.marks}
                                onChange={(e) =>
                                    setMarksData({
                                        ...marksData,
                                        marks: e.target.value
                                    })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Maximum Marks"
                                value={marksData.max_marks}
                                onChange={(e) =>
                                    setMarksData({
                                        ...marksData,
                                        max_marks: e.target.value
                                    })
                                }
                            />

                            <button onClick={addMarks}>
                                Add Marks
                            </button>

                            <button
                                onClick={() =>
                                    setShowMarksForm(false)
                                }
                            >
                                Cancel
                            </button>

                        </div>
                    )}
                </>
            )}


            {/* =========================
                RESULT HEADER
            ========================= */}

            <div className="result-section-header">

                <div>

                    <span className="section-label result-label">
                        RESULT RECORD
                    </span>

                    <h3>
                        {isTeacher
                            ? "View Student Result"
                            : "My Result"}
                    </h3>

                </div>

            </div>


            {/* =========================
                TEACHER - SELECT STUDENT
            ========================= */}

            {isTeacher && (
                <>
                    <select
                        value={selectedResultStudent}
                        onChange={(e) => {

                            setSelectedResultStudent(
                                e.target.value
                            );

                            setStudentResult(null);

                        }}
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

                    <button
                        className="view-result-btn"
                        onClick={loadStudentResult}
                    >
                        View Result
                    </button>
                </>
            )}


            {/* =========================
                STUDENT - OWN RESULT
            ========================= */}

            {isStudent && !selectedResultStudent && (

                <button
                    className="view-result-btn"
                    onClick={loadStudentResult}
                >
                    View My Result
                </button>

            )}


            {/* =========================
                LOADING
            ========================= */}

            {resultLoading && (
                <p className="panel-status">
                    Loading result...
                </p>
            )}


            {/* =========================
                NO RESULT
            ========================= */}

            {!resultLoading &&
                (isTeacher
                    ? selectedResultStudent
                    : true) &&
                !studentResult && (

                    <p className="panel-status">
                        No result available.
                    </p>

                )
            }


            {/* =========================
                RESULT CARD
            ========================= */}

            {studentResult && (

                <div className="result-card">

                    <div className="result-card-header">

                        <span className="section-label result-label">
                            STUDENT RESULT
                        </span>

                        <h3>
                            {studentResult.student?.name}
                        </h3>

                    </div>


                    {/* SUMMARY */}

                    <div className="result-summary">

                        <div>

                            <small>
                                Total Marks
                            </small>

                            <strong>
                                {studentResult.summary?.totalMarks}/
                                {studentResult.summary?.totalMaxMarks}
                            </strong>

                        </div>


                        <div>

                            <small>
                                Percentage
                            </small>

                            <strong>
                                {studentResult.summary?.percentage}%
                            </strong>

                        </div>


                        <div>

                            <small>
                                Grade
                            </small>

                            <strong>
                                {studentResult.summary?.grade}
                            </strong>

                        </div>

                    </div>


                    {/* SUBJECT MARKS */}

                    <h4>
                        Subject-wise Marks
                    </h4>


                    <div className="subject-list">

                        {studentResult.subjects?.map(
                            (subject) => (

                                <div
                                    className="subject-card"
                                    key={subject.id}
                                >

                                    <span>
                                        {subject.subject}
                                    </span>

                                    <strong>
                                        {subject.marks}/
                                        {subject.max_marks}
                                    </strong>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default ResultPanel;