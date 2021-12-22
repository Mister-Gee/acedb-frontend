import { instance } from './httpService';

export const getDepartment = (institutionId, schoolId, facultyId) => {
    if (schoolId && facultyId) {
        return instance.get(`/api/ieducare/institutiondepartment/get/${institutionId}?schoolId=${schoolId}&facultyId=${facultyId}`)
    } else {
        return instance.get(`/api/ieducare/institutiondepartment/get/${institutionId}`)
    }
}

export const createDepartment = (data) => {
    return instance.post("/api/ieducare/institutiondepartment/post", data)
}

export const editDepartment = (departmentId, name, institutionId, schoolId, facultyId, headId) => {
    return instance.put(`/api/ieducare/institutiondepartment/edit/${departmentId}?Id=${departmentId}&Name=${name}&InstitutionId=${institutionId}&SchoolId=${schoolId}&FacultyId=${facultyId}&HeadId=${headId}`)
}

export const deleteDepartment = (departmentId) => {
    return instance.delete(`/api/ieducare/institutiondepartment/remove/${departmentId}`)
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

export const getSchool = (institutionId) => {
    return instance.get(`/api/ieducare/institutionschool/get/${institutionId}`)
}

export const createSchool = (data) => {
    return instance.post("/api/ieducare/institutionschool/post", data)
}

export const editSchool = (schoolId, name, headId, institutionId) => {
    return instance.put(`/api/ieducare/institutionschool/edit/${schoolId}?Id=${schoolId}&Name=${name}&HeadId=${headId}&InstitutionId=${institutionId}`)
}

export const deleteSchool = (schoolId) => {
    return instance.delete(`/api/ieducare/institutionschool/remove/${schoolId}`)
}

export const getSemester = (sessionId) => {
    return instance.get(`/api/ieducare/institutionsemester/get/${sessionId}`)
}

export const createSemester = (data) => {
    return instance.post("/api/ieducare/institutionsemester/post", data)
}

export const editSemester = (semesterId, name, institutionId, sessionId, createdBy, startDate, endDate) => {
    return instance.put(`/api/ieducare/institutionsemester/post/${semesterId}?Id=${semesterId}&Name=${name}&InstitutionId=${institutionId}&SessionId=${sessionId}&CreatedBy=${createdBy}&StartDate=${startDate}&EndDate=${endDate}`)
}

export const deleteSemester = (semesterId) => {
    return instance.delete(`/api/ieducare/institutionsemester/remove/${semesterId}`)
}

export const getSession = (institutionId) => {
    return instance.get(`/api/ieducare/institutionsession/get/${institutionId}`)
}

export const createSession = (data) => {
    return instance.post("/api/ieducare/institutionsession/post", data)
}

export const editSession = (sessionId, name, institutionId, description, createdBy, yearFrom, yearTo) => {
    return instance.put(`/api/ieducare/institutionsession/edit/${sessionId}?Id=${sessionId}&Name=${name}&InstitutionId=${institutionId}&Description=${description}&CreatedBy=${createdBy}&YearFrom=${yearFrom}&YearTo=${yearTo}`)
}

export const deleteSession = (sessionId) => {
    return instance.delete(`/api/ieducare/institutionsession/remove/${sessionId}`)
}

export const getProgram = (institutionId, departmentId) => {
    if (departmentId) {
        return instance.get(`/api/ieducare/institutionprogram/get/${institutionId}?departmentId=${departmentId}`)
    } else {
        return instance.get(`/api/ieducare/institutionprogram/get/${institutionId}`)
    }
}

export const createProgram = (data) => {
    return instance.post("/api/ieducare/institutionprogram/post", data)
}

export const editProgram = (programId, name, institutionId, departmentId, createdBy) => {
    return instance.put(`/api/ieducare/institutionprogram/edit/${programId}?Id=${programId}&Name=${name}&InstitutionId=${institutionId}&DepartmentId=${departmentId}&CreatedBy=${createdBy}`)
}

export const deleteProgram = (id) => {
    return instance.delete(`/api/ieducare/institutionprogram/remove/${id}`)
}

export const getProgramLevel = (institutionId) => {
    return instance.get(`/api/ieducare/programlevel/get/${institutionId}`)
}

export const createProgramLevel = (data) => {
    return instance.post("/api/ieducare/programlevel/post", data)
}

export const editProgramLevel = (programLevelId, levelCode, description, institutionId, createdBy) => {
    return instance.put(`/api/ieducare/programlevel/edit/${programLevelId}?Id=${programLevelId}&LevelCode=${levelCode}&Description=${description}&InstitutionId=${institutionId}&CreatedBy=${createdBy}`)
}

export const deleteProgramLevel = (id) => {
    return instance.delete(`/api/ieducare/programlevel/remove/${id}`)
}

export const getCourseGrade = (institutionId) => {
    return instance.get(`/api/ieducare/coursegrade/get/${institutionId}`)
}

export const createCourseGrade = (data) => {
    return instance.post("/api/ieducare/coursegrade/post", data)
}

export const editCourseGrade = (courseGradeId, code, remark, gradeScore, minScore, maxScore, institutionId, createdBy) => {
    return instance.put(`/api/ieducare/coursegrade/edit/${courseGradeId}?Id=${courseGradeId}&Code=${code}&Remark=${remark}&GradeScore=${gradeScore}&MinimumScore=${minScore}&MaximumScore=${maxScore}&InstitutionId=${institutionId}&CreatedBy=${createdBy}`)
}

export const deleteCourseGrade = (id) => {
    return instance.delete(`/api/ieducare/coursegrade/remove/${id}`)
}