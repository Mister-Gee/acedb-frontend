import {Switch, Route} from 'react-router-dom';
import Dashboard from '../Pages/SuperAdmin/Dashboard';
import Login from '../Pages/SuperAdmin/Login';
import Institutions from '../Pages/SuperAdmin/Institutions';
import UserManager from '../Pages/SuperAdmin/UserManager';
import Modules from '../Pages/SuperAdmin/Modules';
import LicenseManager from '../Pages/SuperAdmin/LicenseManager';
import AdminLogin from '../Pages/Admin/AdminLogin';
import StudentLogin from '../Pages/Student/StudentLogin';
import StudentDashboard from '../Pages/Student/StudentDashboard';
import StudentProfile from '../Pages/Student/StudentProfile';
import Academics from '../Pages/Student/Academics';
import Courses from '../Pages/Student/Courses';
import Results from '../Pages/Student/Results';
import ForgotPassword from '../Pages/SuperAdmin/ForgotPassword';
import ProtectedRoute from '../Routing/ProtectedRoute';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import SessionManagement from '../Pages/Admin/SessionManagement';
import SchoolManagement from '../Pages/Admin/SchoolManagement';
import FacultyManagement from '../Pages/Admin/FacultyManagement';
import DeptManagement from '../Pages/Admin/DeptManagement';
import ProgramManagement from '../Pages/Admin/ProgramManagement';
import CourseManagement from '../Pages/Admin/CourseManagement';
import StudentManagement from '../Pages/Admin/StudentManagement';
import StaffManagement from '../Pages/Admin/StaffManagement';
import StaffRoles from '../Pages/Admin/StaffRoles';
import StaffDesignation from '../Pages/Admin/StaffDesignation';
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

const Routes = () => {
    return (
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/admin-login">
            <AdminLogin />
          </Route>
          <Route path="/student-login">
            <StudentLogin />
          </Route>
          <ProtectedRoute path="/turon-dashboard">
            <Dashboard/>
          </ProtectedRoute>
          <ProtectedRoute path="/institutions">
            <Institutions/>
          </ProtectedRoute>
          <ProtectedRoute path="/attendance">
            <Attendance />
          </ProtectedRoute>
          <ProtectedRoute path="/timetable">
            <Timetable />
          </ProtectedRoute>
          <ProtectedRoute path="/exam-result">
            <StudentExamRecords />
          </ProtectedRoute>
          <ProtectedRoute path="/user-manager">
            <UserManager />
          </ProtectedRoute>
          <ProtectedRoute path="/modules">
            <Modules/>
          </ProtectedRoute>
          <ProtectedRoute path="/license-manager">
            <LicenseManager />
          </ProtectedRoute>
          <ProtectedRoute path="/student-annoucement">
            <StudentAnnoucement />
          </ProtectedRoute>
          <Route path="/mydashboard">
            <StudentDashboard/>
          </Route>
           <Route path="/student-profile">
            <StudentProfile />
          </Route>
          <Route path="/academics">
            <Academics/>
          </Route>
          <Route path="/courses">
            <Courses/>
          </Route>
          <Route path="/results">
            <Results/>
          </Route>
          <Route path="/dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/session-management">
            <SessionManagement />
          </Route>
          <Route path="/school-management">
            <SchoolManagement />
          </Route>
          <Route path="/faculty-management">
            <FacultyManagement />
          </Route>
          <Route path="/dept-management">
            <DeptManagement />
          </Route>
          <Route path="/program-management">
            <ProgramManagement />
          </Route>
          <Route path="/course-management">
            <CourseManagement />
          </Route>
          <Route path="/student-management">
            <StudentManagement />
          </Route>
          <Route path="/all-staff">
            <StaffManagement />
          </Route>
          <Route path="/roles">
            <StaffRoles />
          </Route>
          <Route path="/designation">
            <StaffDesignation />
          </Route>
          <Route path="/lecture-management">
            <LectureManagement />
          </Route>
          <Route path="/student-course-management/:courseId">
            <StudentCourseManagement />
          </Route>
          <Route path="/student-class-attendance/:courseId/:deptId">
            <StudentClassAttendance />
          </Route>
          <Route path="/exam-management">
            <ExamManagement />
          </Route>
          <Route path="/exam-attendance">
            <ExamAttendance />
          </Route>
          <Route path="/program-levels">
            <ProgramLevels />
          </Route>
          <Route path="/course-grades">
            <CourseGrade />
          </Route>
        </Switch>
    )
}

export default Routes
