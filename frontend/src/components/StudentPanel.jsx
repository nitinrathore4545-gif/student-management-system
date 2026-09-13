import "./StudentPanel.css";

function StudentPanel({
    searchName,
    setSearchName,
    searchStudents,
    setPage,
    loadStudents,

    showEditForm,
    setShowEditForm,
    setEditingStudent,
    formData,
    setFormData,
    updateStudent,

    showAddForm,
    setShowAddForm,
    addStudent,

    loading,
    students,
    deleteStudent,
    page,
    totalStudents,
    limit,
}) {
    return (
        <>
            {/* Add Student */}
            <div className="student-actions">
                <button
                    className="add-student-btn"
                    onClick={() => {
                        setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            age: "",
                            course: ""
                        });

                        setShowAddForm(true);
                    }}
                >
                    + Add Student
                </button>
            </div>

            {/* Search */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search student by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchStudents();
                        }
                    }}
                />

                <button onClick={searchStudents}>
                    Search
                </button>

                {searchName && (
                    <button
                        onClick={() => {
                            setSearchName("");
                            setPage(1);
                            loadStudents();
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Edit Student */}
            {showEditForm && (
                <div className="add-form student-form">
                    <h3>Edit Student</h3>

                    <input
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                age: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Course"
                        value={formData.course}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course: e.target.value
                            })
                        }
                    />

                    <button
                        className="form-primary-btn"
                        onClick={updateStudent}
                    >
                        Update Student
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={() => {
                            setShowEditForm(false);
                            setEditingStudent(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Add Student Form */}
            {showAddForm && (
                <div className="add-form student-form">
                    <h3>Add Student</h3>

                    <input
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                age: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Course"
                        value={formData.course}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course: e.target.value
                            })
                        }
                    />

                    <button
                        className="form-primary-btn"
                        onClick={addStudent}
                    >
                        Add Student
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={() => setShowAddForm(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Student Directory */}
            <div className="student-section-header">
                <div>
                    <span className="section-label">
                        STUDENT DIRECTORY
                    </span>

                    <h3>All Students</h3>
                </div>

                <span className="student-count">
                    {totalStudents} TOTAL
                </span>
            </div>

            {/* Student List */}
            <div className="student-list">
                {loading ? (
                    <p className="panel-status">
                        Loading students...
                    </p>
                ) : students.length === 0 ? (
                    <p className="panel-status">
                        No students found.
                    </p>
                ) : (
                    students.map((student) => (
                        <div
                            className="student-card"
                            key={student.id}
                        >
                            <strong>
                                {student.name}
                            </strong>

                            <span>
                                {student.email}
                            </span>

                            <small>
                                {student.course ||
                                    "No course assigned"}
                            </small>

                            <button
                                onClick={() => {
                                    setEditingStudent(student);

                                    setFormData({
                                        name: student.name || "",
                                        email: student.email || "",
                                        phone: student.phone || "",
                                        age: student.age || "",
                                        course: student.course || ""
                                    });

                                    setShowEditForm(true);
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    deleteStudent(student.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {students.length > 0 && (
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ← Previous
                    </button>

                    <span>
                        Page {page} of{" "}
                        {Math.ceil(totalStudents / limit)}
                    </span>

                    <button
                        disabled={
                            page >=
                            Math.ceil(totalStudents / limit)
                        }
                        onClick={() => setPage(page + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}
        </>
    );
}

export default StudentPanel;