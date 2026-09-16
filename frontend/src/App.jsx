import { useState, useEffect, useContext } from "react";
import { Canvas } from "@react-three/fiber";

import CampusScene from "./scenes/CampusScene";
import StudentPanel from "./components/StudentPanel";
import CoursePanel from "./components/CoursePanel";
import ResultPanel from "./components/ResultPanel";

import api from "./services/api";

import {
    Navigate,
    useLocation,
    useNavigate
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { AuthContext } from "./context/AuthContext.jsx";

import "./App.css";


function App() {

    // =========================
    // AUTH
    // =========================

    const {
        user,
        logout,
        loading: authLoading
    } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();


    // =========================
    // ROLE
    // =========================

    const isTeacher = user?.role === "teacher";
    const isStudent = user?.role === "student";


    // =========================
    // CAMPUS STATE
    // =========================

    const [activeHub, setActiveHub] = useState(null);

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showAddForm, setShowAddForm] = useState(false);

    const [page, setPage] = useState(1);
    const limit = 5;

    const [totalStudents, setTotalStudents] = useState(0);

    const [searchName, setSearchName] = useState("");

    const [editingStudent, setEditingStudent] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);


    // =========================
    // COURSE STATE
    // =========================

    const [courses, setCourses] = useState([]);
    const [courseLoading, setCourseLoading] = useState(false);

    const [showCourseForm, setShowCourseForm] = useState(false);

    const [deleteCourseId, setDeleteCourseId] = useState(null);

    const [courseFormData, setCourseFormData] = useState({
        course_name: "",
        duration: ""
    });


    // =========================
    // ENROLLMENT STATE
    // =========================

    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    const [showAssignForm, setShowAssignForm] = useState(false);

    const [enrollments, setEnrollments] = useState([]);


    // =========================
    // RESULT STATE
    // =========================

    const [selectedResultStudent, setSelectedResultStudent] =
        useState("");

    const [studentResult, setStudentResult] = useState(null);

    const [resultLoading, setResultLoading] = useState(false);


    // =========================
    // MARKS STATE
    // =========================

    const [showMarksForm, setShowMarksForm] = useState(false);

    const [marksData, setMarksData] = useState({
        enrollment_id: "",
        subject: "",
        marks: "",
        max_marks: 100
    });


    // =========================
    // STUDENT FORM
    // =========================

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        course: ""
    });


    // =========================
    // TOAST
    // =========================

    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {

        setToast({
            message,
            type
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };


    // =========================
    // LOAD STUDENTS
    // =========================

    useEffect(() => {

        if (
            isTeacher &&
            activeHub === "Student Hub"
        ) {
            loadStudents();
        }

    }, [activeHub, page, isTeacher]);


    // =========================
    // LOAD COURSE / RESULT DATA
    // =========================

    useEffect(() => {

        if (
            isTeacher &&
            activeHub === "Course Hub"
        ) {

            loadCourses();
            loadStudents();
            loadEnrollments();

        }

        if (
            isTeacher &&
            activeHub === "Result Hub"
        ) {

            loadStudents();
            loadEnrollments();

        }

    }, [activeHub, isTeacher]);


    // =========================
    // LOAD STUDENTS
    // =========================

    const loadStudents = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                `/students?page=${page}&limit=${limit}`
            );

            setStudents(response.data.data);
            setTotalStudents(response.data.count);

        } catch (error) {

            console.error(
                "Failed to fetch students:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to fetch students",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // LOAD COURSES
    // =========================

    const loadCourses = async () => {

        try {

            setCourseLoading(true);

            const response = await api.get(
                "/courses"
            );

            setCourses(response.data.data);

        } catch (error) {

            console.error(
                "Failed to fetch courses:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to fetch courses",
                "error"
            );

        } finally {

            setCourseLoading(false);

        }
    };


    // =========================
    // LOAD ENROLLMENTS
    // =========================

    const loadEnrollments = async () => {

        try {

            const response = await api.get(
                "/enrollments"
            );

            setEnrollments(
                response.data.data
            );

        } catch (error) {

            console.error(
                "Failed to fetch enrollments:",
                error
            );

        }
    };


    // =========================
    // ADD STUDENT
    // =========================

    const addStudent = async () => {

        try {

            await api.post(
                "/students",
                formData
            );

            showToast(
                "Student added successfully!"
            );

            setFormData({
                name: "",
                email: "",
                phone: "",
                age: "",
                course: ""
            });

            setShowAddForm(false);

            await loadStudents();

        } catch (error) {

            console.error(
                "Failed to add student:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to add student",
                "error"
            );
        }
    };


    // =========================
    // UPDATE STUDENT
    // =========================

    const updateStudent = async () => {

        try {

            await api.put(
                `/students/${editingStudent.id}`,
                formData
            );

            showToast(
                "Student updated successfully!"
            );

            setShowEditForm(false);
            setEditingStudent(null);

            setFormData({
                name: "",
                email: "",
                phone: "",
                age: "",
                course: ""
            });

            await loadStudents();

        } catch (error) {

            console.error(
                "Failed to update student:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to update student",
                "error"
            );
        }
    };


    // =========================
    // DELETE STUDENT
    // =========================

    const deleteStudent = async (id) => {

        try {

            await api.delete(
                `/students/${id}`
            );

            showToast(
                "Student deleted successfully!"
            );

            await loadStudents();

        } catch (error) {

            console.error(
                "Failed to delete student:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to delete student",
                "error"
            );
        }
    };


    // =========================
    // SEARCH STUDENTS
    // =========================

    const searchStudents = async () => {

        try {

            if (!searchName.trim()) {

                await loadStudents();

                return;
            }

            setPage(1);
            setLoading(true);

            const response = await api.get(
                `/students/search/${searchName}`
            );

            setStudents(
                response.data.data
            );

        } catch (error) {

            console.error(
                "Search failed:",
                error
            );

            setStudents([]);

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // ADD COURSE
    // =========================

    const addCourse = async () => {

        try {

            if (
                !courseFormData.course_name ||
                !courseFormData.duration
            ) {

                showToast(
                    "Please fill all fields",
                    "error"
                );

                return;
            }

            await api.post(
                "/courses",
                courseFormData
            );

            showToast(
                "Course added successfully!"
            );

            setCourseFormData({
                course_name: "",
                duration: ""
            });

            setShowCourseForm(false);

            await loadCourses();

        } catch (error) {

            console.error(
                "Failed to add course:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to add course",
                "error"
            );
        }
    };


    // =========================
    // DELETE COURSE
    // =========================

    const deleteCourse = async (id) => {

        try {

            await api.delete(
                `/courses/${id}`
            );

            showToast(
                "Course deleted successfully!"
            );

            await loadCourses();
            await loadEnrollments();

        } catch (error) {

            console.error(
                "Failed to delete course:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to delete course",
                "error"
            );
        }
    };


    // =========================
    // ASSIGN COURSE
    // =========================

    const assignCourse = async () => {

        try {

            if (
                !selectedStudent ||
                !selectedCourse
            ) {

                showToast(
                    "Please select a course and a student",
                    "error"
                );

                return;
            }

            await api.post(
                "/enrollments",
                {
                    student_id: selectedStudent,
                    course_id: selectedCourse
                }
            );

            await loadEnrollments();

            showToast(
                "Course assigned successfully!"
            );

            setSelectedStudent("");
            setSelectedCourse("");
            setShowAssignForm(false);

        } catch (error) {

            console.error(
                "Failed to assign course:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to assign course",
                "error"
            );
        }
    };


    // =========================
    // ADD MARKS
    // =========================

    const addMarks = async () => {

        try {

            await api.post(
                "/marks",
                marksData
            );

            showToast(
                "Marks added successfully!"
            );

            setMarksData({
                enrollment_id: "",
                subject: "",
                marks: "",
                max_marks: 100
            });

            setShowMarksForm(false);

        } catch (error) {

            console.error(
                "Failed to add marks:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to add marks",
                "error"
            );
        }
    };


    // =========================
    // LOAD RESULT
    // =========================

    const loadStudentResult = async () => {

    try {

        setResultLoading(true);


        // =========================
        // STUDENT
        // =========================

        if (isStudent) {

            const response = await api.get(
                "/enrollments/my-result"
            );

            setStudentResult(
                response.data
            );

            return;
        }


        // =========================
        // TEACHER
        // =========================

        if (isTeacher) {

            if (!selectedResultStudent) {

                showToast(
                    "Please select a student",
                    "error"
                );

                return;
            }

            const response = await api.get(
                `/enrollments/student/${selectedResultStudent}/result`
            );

            setStudentResult(
                response.data
            );
        }

    } catch (error) {

        console.error(
            "Failed to fetch result:",
            error
        );

        setStudentResult(null);

        showToast(
            error.response?.data?.message ||
            "Failed to load result",
            "error"
        );

    } finally {

        setResultLoading(false);

    }
};

    // =========================
    // AUTH CHECK
    // =========================

    if (authLoading) {

        return (
            <div className="auth-loading">
                Loading...
            </div>
        );
    }


    // =========================
    // LOGIN
    // =========================

    if (location.pathname === "/login") {

        if (user) {

            return (
                <Navigate
                    to="/campus"
                    replace
                />
            );
        }

        return <Login />;
    }


    // =========================
    // REGISTER
    // =========================

    if (location.pathname === "/register") {

        if (user) {

            return (
                <Navigate
                    to="/campus"
                    replace
                />
            );
        }

        return <Register />;
    }


    // =========================
    // PROTECTED CAMPUS
    // =========================

    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // =========================
    // LOGOUT
    // =========================

 const handleLogout = () => {
    logout();
    setActiveHub(null);
    window.location.replace("/login");
};

    // =========================
    // HUB ACCESS
    // =========================

    const handleHubClick = (hub) => {

        // Students are only allowed to access Result Hub
        if (isStudent && hub !== "Result Hub") {

            showToast(
                "This section is available only to teachers.",
                "error"
            );

            return;
        }

        setActiveHub(hub);
    };


    // =========================
    // CAMPUS UI
    // =========================

    return (

        <div className="app">

            {/* TOAST */}

            {toast && (

                <div
                    className={`toast toast-${toast.type}`}
                >

                    <span className="toast-dot"></span>

                    <div>

                        <strong>
                            {toast.type === "success"
                                ? "Success"
                                : "Error"}
                        </strong>

                        <p>
                            {toast.message}
                        </p>

                    </div>

                </div>

            )}


            {/* HUD */}

            <div className="system-hud">

                <div className="system-status">

                    <span className="status-dot"></span>

                    SYSTEM ONLINE

                </div>


                <div className="system-title">

                    STUDENT MANAGEMENT SYSTEM

                </div>


                <div className="system-location">

                    CAMPUS //{" "}

                    {activeHub
                        ? activeHub.toUpperCase()
                        : "MAIN"}

                </div>


                <div className="user-info">

                    <span>
                        {user?.name}
                    </span>

                    <span className="user-role">

                        {user?.role?.toUpperCase()}

                    </span>


                    <button
                        type="button"
                        className="logout-btn"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </div>

            </div>


            {/* 3D CAMPUS */}

            <Canvas
                shadows
                camera={{
                    position: [12, 10, 15],
                    fov: 45
                }}
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "block"
                }}
            >

                <CampusScene
                    activeHub={activeHub}
                    setActiveHub={handleHubClick}
                />

            </Canvas>


            {/* HUB PANEL */}

            {activeHub && (

                <div className="hub-panel">

                    <button
                        className="close-btn"
                        onClick={() =>
                            setActiveHub(null)
                        }
                    >
                        ×
                    </button>


                    <h1>
                        {activeHub}
                    </h1>


                    <p>
                        Manage your{" "}
                        {activeHub.toLowerCase()}
                    </p>


                    {/* =========================
                        TEACHER — STUDENT HUB
                    ========================= */}

                    {activeHub === "Student Hub" &&
                        isTeacher && (

                            <StudentPanel
                                searchName={searchName}
                                setSearchName={setSearchName}
                                searchStudents={searchStudents}
                                setPage={setPage}
                                loadStudents={loadStudents}
                                page={page}
                                totalStudents={totalStudents}
                                limit={limit}

                                showEditForm={
                                    showEditForm
                                }

                                setShowEditForm={
                                    setShowEditForm
                                }

                                setEditingStudent={
                                    setEditingStudent
                                }

                                formData={formData}
                                setFormData={
                                    setFormData
                                }

                                updateStudent={
                                    updateStudent
                                }

                                showAddForm={
                                    showAddForm
                                }

                                setShowAddForm={
                                    setShowAddForm
                                }

                                addStudent={
                                    addStudent
                                }

                                loading={loading}

                                students={
                                    students
                                }

                                deleteStudent={
                                    deleteStudent
                                }
                            />

                        )}


                    {/* =========================
                        TEACHER — COURSE HUB
                    ========================= */}

                    {activeHub === "Course Hub" &&
                        isTeacher && (

                            <CoursePanel
                                courses={courses}
                                courseLoading={
                                    courseLoading
                                }

                                students={students}

                                enrollments={
                                    enrollments
                                }

                                selectedStudent={
                                    selectedStudent
                                }

                                setSelectedStudent={
                                    setSelectedStudent
                                }

                                selectedCourse={
                                    selectedCourse
                                }

                                setSelectedCourse={
                                    setSelectedCourse
                                }

                                showAssignForm={
                                    showAssignForm
                                }

                                setShowAssignForm={
                                    setShowAssignForm
                                }

                                assignCourse={
                                    assignCourse
                                }

                                showCourseForm={
                                    showCourseForm
                                }

                                setShowCourseForm={
                                    setShowCourseForm
                                }

                                courseFormData={
                                    courseFormData
                                }

                                setCourseFormData={
                                    setCourseFormData
                                }

                                addCourse={
                                    addCourse
                                }

                                deleteCourse={
                                    deleteCourse
                                }

                                deleteCourseId={
                                    deleteCourseId
                                }

                                setDeleteCourseId={
                                    setDeleteCourseId
                                }
                            />

                        )}


                    {/* =========================
                        RESULT HUB
                    ========================= */}

                    {activeHub === "Result Hub" && (

                        <ResultPanel
                            showMarksForm={
                                isTeacher
                                    ? showMarksForm
                                    : false
                            }

                            setShowMarksForm={
                                setShowMarksForm
                            }

                            marksData={
                                marksData
                            }

                            setMarksData={
                                setMarksData
                            }

                            addMarks={
                                addMarks
                            }

                            enrollments={
                                enrollments
                            }

                            students={
                                students
                            }

                            selectedResultStudent={
                                selectedResultStudent
                            }

                            setSelectedResultStudent={
                                setSelectedResultStudent
                            }

                            loadStudentResult={
                                loadStudentResult
                            }

                            resultLoading={
                                resultLoading
                            }

                            studentResult={
                                studentResult
                            }

                            setStudentResult={
                                setStudentResult
                            }

                            isTeacher={isTeacher}
                            isStudent={isStudent}
                            user={user}
                        />

                    )}

                </div>

            )}

        </div>
    );
}


export default App;