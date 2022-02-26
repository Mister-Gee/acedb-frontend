import {Switch, Route} from 'react-router-dom';
import Login from '../Pages/General/Login';
import StudentDashboard from '../Pages/Student/StudentDashboard';
import StudentProfile from '../Pages/Student/StudentProfile';
import Academics from '../Pages/Student/Academics';
import Courses from '../Pages/Student/Courses';
import Results from '../Pages/Student/Results';
import ForgotPassword from '../Pages/General/ForgotPassword';
import ProtectedRoute from '../Routing/ProtectedRoute';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import SessionManagement from '../Pages/Admin/SessionManagement';
import SchoolManagement from '../Pages/Admin/SchoolManagement';
import DeptManagement from '../Pages/Admin/DeptManagement';
import ProgramManagement from '../Pages/Admin/ProgramManagement';
import CourseManagement from '../Pages/Admin/CourseManagement';
import StudentManagement from '../Pages/Admin/StudentManagement';
import StaffManagement from '../Pages/Admin/StaffManagement';
import StaffRoles from '../Pages/Admin/StaffRoles';
import LectureManagement from '../Pages/Admin/LectureManagement';
import ProgramLevels from '../Pages/Admin/ProgramLevels';
import CourseGrade from '../Pages/Admin/CourseGrade';
import Attendance from '../Pages/Student/Attendance';
import Timetable from '../Pages/Student/Timetable';
import StudentExamRecords from '../Pages/Student/StudentExamRecords';
import StudentAnnoucement from '../Pages/Student/StudentAnnoucement';
import StudentCourseManagement from '../Pages/Admin/StudentCourseManagement';
import StudentClassAttendance from '../Pages/Admin/StudentClassAttendance';
import ExamManagement from '../Pages/Admin/ExamManagement';
import ExamAttendance from '../Pages/Admin/ExamAttendance';
import CourseExamAttendance from '../Pages/Admin/CourseExamAttendance';
import FlagManagement from '../Pages/Admin/FlagManagement';
import HealthManagement from '../Pages/Admin/HealthManagement';
import MedicalProfile from '../Pages/Admin/MedicalProfile';
import MedicalHistory from '../Pages/Admin/MedicalHistory';

const Routes = () => {
    return (
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <ProtectedRoute path="/attendance">
            <Attendance />
          </ProtectedRoute>
          <ProtectedRoute path="/timetable">
            <Timetable />
          </ProtectedRoute>
          <ProtectedRoute path="/exam-result">
            <StudentExamRecords />
          </ProtectedRoute>
          <ProtectedRoute path="/student-annoucement">
            <StudentAnnoucement />
          </ProtectedRoute>
          <ProtectedRoute path="/mydashboard">
            <StudentDashboard/>
          </ProtectedRoute>
           <ProtectedRoute path="/student-profile">
            <StudentProfile />
          </ProtectedRoute>
          {/* <ProtectedRoute path="/academics">
            <Academics/>
          </ProtectedRoute> */}
          <ProtectedRoute path="/courses">
            <Courses/>
          </ProtectedRoute>
          <ProtectedRoute path="/results">
            <Results/>
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard">
            <AdminDashboard />
          </ProtectedRoute>
          <ProtectedRoute path="/session-management">
            <SessionManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/school-management">
            <SchoolManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/dept-management">
            <DeptManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/program-management">
            <ProgramManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/course-management">
            <CourseManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/student-management">
            <StudentManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/all-staff">
            <StaffManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/roles">
            <StaffRoles />
          </ProtectedRoute>
          <ProtectedRoute path="/lecture-management">
            <LectureManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/student-course-management/:courseId">
            <StudentCourseManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/student-class-attendance/:courseId/:deptId">
            <StudentClassAttendance />
          </ProtectedRoute>
          <ProtectedRoute path="/exam-management">
            <ExamManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/exam-attendance">
            <ExamAttendance />
          </ProtectedRoute>
          <ProtectedRoute path="/course-exam-attendance/:courseId">
            <CourseExamAttendance />
          </ProtectedRoute>
          <ProtectedRoute path="/flag-management">
            <FlagManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/health-management">
            <HealthManagement />
          </ProtectedRoute>
          <ProtectedRoute path="/medical-profile/:Id">
            <MedicalProfile />
          </ProtectedRoute>
          <ProtectedRoute path="/medical-history/:userId">
            <MedicalHistory />
          </ProtectedRoute>
          <ProtectedRoute path="/program-levels">
            <ProgramLevels />
          </ProtectedRoute>
          <ProtectedRoute path="/course-grades">
            <CourseGrade />
          </ProtectedRoute>
        </Switch>
    )
}

export default Routes
