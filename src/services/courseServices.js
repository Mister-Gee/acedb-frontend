import { instance } from './httpService';

const http = instance;

export const getStudentRegCourses = (id) => {
    return http.get(`/CourseRegisteration/Student/CurrentAcademicYear/CurrentSemester/${id}`)
}

export const getStudentRegCoursesBySemesterAndYear = (StudentID, AcademicYearID, SemesterID) => {
    if(!AcademicYearID && !SemesterID){
        return http.get(`/CourseRegisteration/Student/List/${StudentID}`)
    }
    else if(AcademicYearID && !SemesterID){
        return http.get(`/CourseRegisteration/Student/List/${StudentID}?AcademicYearID=${AcademicYearID}/${SemesterID}`)
    }
    else if(!AcademicYearID && SemesterID){
        return http.get(`/CourseRegisteration/Student/List/${StudentID}?SemesterID=${SemesterID}`)
    }
    else{
        return http.get(`/CourseRegisteration/Student/List/${StudentID}?AcademicYearID=${AcademicYearID}&SemesterID=${SemesterID}`)
    }
    
}

export const getStudentEligibleCourse = (DepartmentID) => {
    return http.get(`/Course/Get/Student/EligibleCourses/${DepartmentID}`)
}

export const registerCourse = (data) => {
    return http.post("/CourseRegisteration/Register", data)
}

export const getCourse = () => {
    return instance.get("/Course/All")
}

export const getCourseBySchool = (SchoolID) => {
    return instance.get(`/Course/Get/School/${SchoolID}`)
}

export const getCourseByDept = (DepartmentID) => {
    return instance.get(`/Course/Get/Department/${DepartmentID}`)
}

export const getCourseByLecturer = (LecturerID) => {
    return instance.get(`/Course/Get/ByLecturer/${LecturerID}`)
}

export const getCourseByLoggedInLecturer = () => {
    return instance.get("/Course/LoggedInLecturer/Get")
}

export const getRegStudentCourseByDept = (CourseID) => {
    return instance.get(`/CourseRegisteration/Student/Department/Registered/All/${CourseID}`)
}

export const getAllRegStudentCourseByDept = (CourseID) => {
    return instance.get(`/CourseRegisteration/Student/Registered/All/${CourseID}`)
}

export const getCourseByID = (ID) => {
    return instance.get(`/Course/Get/${ID}`)
}

export const createCourse = (data) => {
    return instance.post("/Course/Create", data)
}

export const editCourse = (Id, data) => {
    return instance.put(`/Course/Edit/${Id}`, data)
}

export const deleteCourse = (Id) => {
    return instance.delete(`/Course/Delete/${Id}`)
}