import { instance } from './httpService';

export const getDepartment = () => {
    return instance.get("/ControlledData/Department/All")
}

export const getDepartmentBySchool = (schoolID) => {
    return instance.get(`/ControlledData/Department/${schoolID}`)
}

export const createDepartment = (data) => {
    return instance.post("/ControlledData/Department/Create", data)
}

export const editDepartment = (Id, data) => {
    return instance.put(`/ControlledData/Department/Edit/${Id}`, data)
}

export const deleteDepartment = (Id) => {
    return instance.delete(`/ControlledData/Department/Delete/${Id}`)
}

export const getFaculty = (institutionId, schoolId) => {
    if (schoolId) {
        return instance.get(`/api/ieducare/institutionfaculty/get/${institutionId}?schoolId=${schoolId}`)
    } else {
        return instance.get(`/api/ieducare/institutionfaculty/get/${institutionId}`)
    }
}

export const createFaculty = (data) => {
    return instance.post("/api/ieducare/institutionfaculty/post", data)
}

export const editFaculty = (facultyId, name, schoolId, headId, institutionId, createdBy) => {
    return instance.put(`/api/ieducare/institutionfaculty/edit/${facultyId}?Name=${name}&SchoolId=${schoolId}&HeadId=${headId}&InstitutionId=${institutionId}&CreatedBy=${createdBy}`)
}

export const deleteFaculty = (facultyId) => {
    return instance.delete(`/api/ieducare/institutionfaculty/remove/${facultyId}`)
}

export const getSchool = () => {
    return instance.get("/ControlledData/School/All")
}

export const createSchool = (data) => {
    return instance.post("/ControlledData/School/Create", data)
}

export const editSchool = (Id, data) => {
    return instance.put(`/ControlledData/School/Edit/${Id}`, data)
}

export const deleteSchool = (Id) => {
    return instance.delete(`/ControlledData/School/Delete/${Id}`)
}

export const getSemester = () => {
    return instance.get(`/ControlledData/Semester/All`)
}

export const createSemester = (data) => {
    return instance.post("/ControlledData/Semester/Create", data)
}

export const editSemester = (Id, data) => {
    return instance.put(`/ControlledData/Semester/Edit/${Id}`, data)
}

export const deleteSemester = (Id) => {
    return instance.delete(`/ControlledData/Semester/Delete/${Id}`)
}

export const getSession = () => {
    return instance.get("/ControlledData/AcademicYear/All")
}

export const createSession = (data) => {
    return instance.post("/ControlledData/AcademicYear/Create", data)
}

export const editSession = (Id, data) => {
    return instance.put(`/ControlledData/AcademicYear/Edit/${Id}`, data)
}

export const deleteSession = (Id) => {
    return instance.delete(`/ControlledData/AcademicYear/Delete/${Id}`)
}

export const getProgram = () => {
    return instance.get("/ControlledData/Programme/All")
}

export const createProgram = (data) => {
    return instance.post("/ControlledData/Programme/Create", data)
}

export const editProgram = (Id, data) => {
    return instance.put(`/ControlledData/Programme/Edit/${Id}`, data)
}

export const deleteProgram = (Id) => {
    return instance.delete(`/ControlledData/Programme/Delete/${Id}`)
}

export const getProgramLevel = () => {
    return instance.get("/ControlledData/Level/All")
}

export const createProgramLevel = (data) => {
    return instance.post("/ControlledData/Level/Create", data)
}

export const editProgramLevel = (Id, data) => {
    return instance.put(`/ControlledData/Level/Edit/${Id}`, data)
}

export const deleteProgramLevel = (Id) => {
    return instance.delete(`/ControlledData/Level/Delete/${Id}`)
}

export const getCourseGrade = () => {
    return instance.get("/GradingUnit/All")
}

export const createCourseGrade = (data) => {
    return instance.post("/GradingUnit/Create", data)
}

export const editCourseGrade = (Id, data) => {
    return instance.put(`/GradingUnit/Edit/${Id}`, data)
}

export const deleteCourseGrade = (Id) => {
    return instance.delete(`/GradingUnit/Delete/{Id}`)
}