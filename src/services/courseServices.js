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