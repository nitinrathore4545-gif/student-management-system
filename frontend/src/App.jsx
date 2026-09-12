import { useState,useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import CampusScene from "./scenes/Campusscene";
import StudentPanel from "./components/StudentPanel";
import api from "./services/api";
import CoursePanel from "./components/CoursePanel";
import ResultPanel from "./components/ResultPanel";
import "./App.css"

function App() {
    const [activeHub, setActiveHub] = useState(null);
    const [students,setStudents] = useState([])
    const [loading,setLoading] = useState(false)

    const [showAddForm,setShowAddForm] = useState(false)
    const [page, setPage] = useState(1);
const limit = 5
const [totalStudents, setTotalStudents] = useState(0);
const [searchName, setSearchName] = useState("");
const [editingStudent, setEditingStudent] = useState(null);
const [showEditForm, setShowEditForm] = useState(false);
const [courses, setCourses] = useState([]);
const [courseLoading, setCourseLoading] = useState(false);
const [showCourseForm, setShowCourseForm] = useState(false);

const [courseFormData, setCourseFormData] = useState({
    course_name: "",
    duration: ""
});
const [selectedStudent, setSelectedStudent] = useState("");
const [selectedCourse, setSelectedCourse] = useState("");
const [showAssignForm, setShowAssignForm] = useState(false);

const [selectedResultStudent, setSelectedResultStudent] = useState("");
const [studentResult, setStudentResult] = useState(null);
const [resultLoading, setResultLoading] = useState(false);

const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    course: ""
});
const [showMarksForm, setShowMarksForm] = useState(false);
const [marksData, setMarksData] = useState({
    enrollment_id: "",
    subject: "",
    marks: "",
    max_marks: 100
});
const [enrollments, setEnrollments] = useState([]);


useEffect(() => {
    if (activeHub === "Student Hub") {
        loadStudents();
    }

    if (activeHub === "Course Hub") {
        loadCourses();
        loadStudents();
        loadEnrollments();
    }

    if (activeHub === "Result Hub") {
        loadStudents();
        loadEnrollments();
    }
}, [activeHub, page]);

const loadStudents = async () => {
    try {
        setLoading(true);
    const response = await api.get(
    `/students?page=${page}&limit=${limit}`
);


setStudents(response.data.data);
setTotalStudents(response.data.count);
      


    } catch (error) {
        console.error("Failed to fetch students:", error);
    } finally {
        setLoading(false);
    }
};
const addMarks = async () => {
    try {
      await api.post(
    "/marks",
    marksData
);

        alert("Marks added successfully!");

        setMarksData({
            enrollment_id: "",
            subject: "",
            marks: "",
            max_marks: 100
        });

        setShowMarksForm(false);

    } catch (error) {
        console.error("Failed to add marks:", error);

        alert(
            error.response?.data?.message ||
            "Failed to add marks"
        );
    }
};
const loadCourses = async () => {
    try {
        setCourseLoading(true);

      const response = await api.get(
    "/courses"
);


        setCourses(response.data.data);

    } catch (error) {
        console.error("Failed to fetch courses:", error);
    } finally {
        setCourseLoading(false);
    }
};
const addCourse = async () => {
    try {
        if (!courseFormData.course_name || !courseFormData.duration) {
            alert("Please fill all fields");
            return;
        }

        await api.post("/courses", courseFormData);

        alert("Course added successfully!");

        setCourseFormData({
            course_name: "",
            duration: ""
        });

        setShowCourseForm(false);

        loadCourses();

    } catch (error) {
        console.error("Failed to add course:", error);

        alert(
            error.response?.data?.message ||
            "Failed to add course"
        );
    }
};
const loadEnrollments = async () => {
    try {
      const response = await api.get(
    "/enrollments"
);
        setEnrollments(response.data.data);

    } catch (error) {
        console.error("Failed to fetch enrollments:", error);
    }
};
const assignCourse = async () => {
    try {
        if (!selectedStudent || !selectedCourse) {
            alert("Please select student and course");
            return;
        }
const response = await api.post(
    "/enrollments",
    {
        student_id: selectedStudent,
        course_id: selectedCourse
    }
);


        alert("Course assigned successfully!");

        setSelectedStudent("");
        setSelectedCourse("");
        setShowAssignForm(false);

    } catch (error) {
        console.error("Failed to assign course:", error);

        alert(
            error.response?.data?.message ||
            "Failed to assign course"
        );
    }
};
const loadStudentResult = async () => {
    try {
        if (!selectedResultStudent) {
            alert("Please select a student");
            return;
        }

        setResultLoading(true);

      const response = await api.get(
    `/enrollments/student/${selectedResultStudent}/result`
);

        setStudentResult(response.data);

    } catch (error) {
        console.error("Failed to fetch result:", error);
        setStudentResult(null);
    } finally {
        setResultLoading(false);
    }
};
const addStudent = async () => {
    try {
      const response = await api.post(
    "/students",
    formData
);


        setFormData({
            name: "",
            email: "",
            phone: "",
            age: "",
            course: ""
        });

        setShowAddForm(false);

        loadStudents();

    } catch (error) {
        console.error("Failed to add student:", error);
    }
};
const searchStudents = async () => {
    try {
        setPage(1);

        setLoading(true);

      const response = await api.get(
    `/students/search/${searchName}`
);
     

        setStudents(response.data.data);

    } catch (error) {
        console.error("Search failed:", error);
        setStudents([]);
    } finally {
        setLoading(false);
    }
};
const deleteStudent = async (id) => {
    try {
      await api.delete(
    `/students/${id}`
);


        loadStudents();

    } catch (error) {
        console.error("Failed to delete student:", error);
    }
};
const updateStudent = async () => {
    try {
      await api.put(
    `/students/${editingStudent.id}`,
    formData
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

        loadStudents();

    } catch (error) {
        console.error("Failed to update student:", error);
    }
};

    return (
        <div className="app">
            <div className="system-hud">
    <div className="system-status">
        <span className="status-dot"></span>
        SYSTEM ONLINE
    </div>

    <div className="system-title">
        STUDENT MANAGEMENT SYSTEM
    </div>

    <div className="system-location">
        CAMPUS // {activeHub ? activeHub.toUpperCase() : "MAIN"}
    </div>
</div>

         <Canvas
    shadows
    camera={{
        position: [12, 10, 15],
        fov: 45
    }}
    style={{
        width: "100vw",
        height: "100vh"
    }}
>
            <CampusScene 
    activeHub={activeHub}
    setActiveHub={setActiveHub}
/>
            </Canvas>

            {activeHub && (
                <div className="hub-panel">

                    <button
                        className="close-btn"
                        onClick={() => setActiveHub(null)}
                    >
                        ×
                    </button>

                    <h1>{activeHub}</h1>

                    <p>
                        Manage your {activeHub.toLowerCase()}
                    </p>
{/* Student Hub */}
{activeHub === "Student Hub" && (
    <StudentPanel
        
        searchName={searchName}
        setSearchName={setSearchName}
        searchStudents={searchStudents}
        setPage={setPage}
        loadStudents={loadStudents}

        page={page}
        totalStudents={totalStudents}
        limit={limit}

        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        setEditingStudent={setEditingStudent}
        formData={formData}
        setFormData={setFormData}
        updateStudent={updateStudent}

        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        addStudent={addStudent}

        loading={loading}
        students={students}
        deleteStudent={deleteStudent}
    />
)}

{/* Course Hub */}
{activeHub === "Course Hub" && (
    <CoursePanel
        courses={courses}
        courseLoading={courseLoading}
        students={students}
        enrollments={enrollments}

        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}

        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}

        showAssignForm={showAssignForm}
        setShowAssignForm={setShowAssignForm}

        assignCourse={assignCourse}
        showCourseForm={showCourseForm}
setShowCourseForm={setShowCourseForm}

courseFormData={courseFormData}
setCourseFormData={setCourseFormData}

addCourse={addCourse}
    />
)}
 {/* Result Hub */}
{activeHub === "Result Hub" && (
    <ResultPanel
        showMarksForm={showMarksForm}
        setShowMarksForm={setShowMarksForm}

        marksData={marksData}
        setMarksData={setMarksData}
        addMarks={addMarks}

        enrollments={enrollments}

        students={students}
        selectedResultStudent={selectedResultStudent}
        setSelectedResultStudent={setSelectedResultStudent}
        loadStudentResult={loadStudentResult}

        resultLoading={resultLoading}
        studentResult={studentResult}
        setStudentResult={setStudentResult}
    />
)}
                </div>
            )}

        </div>
    );
}

export default App;