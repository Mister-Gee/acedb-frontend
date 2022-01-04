import React, {useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import ModalTable from './ModalTable';
import StyledTextField from '../../../components/StyledTextField';
import MenuItem from '@material-ui/core/MenuItem';
import {getStudentEligibleCourse, registerCourse} from '../../../../services/courseServices';
import {getCurrentSessionSemester} from '../../../../services/sessionServices';
import store from '../../../../store/store';
import { useState } from '@hookstate/core';
import { Spinner } from 'react-bootstrap';



const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "50ch",
        }
    },
}));

function AcademicsModal({closeModal}) {
    const classes = useStyles();
    const[showAlert, setShowAlert] = React.useState(false)
    const[alertMsg, setAlertMsg] = React.useState("")
    const[alertType, setAlertType] = React.useState("")
    

    const [courses, setCourses] = React.useState([])

    const [selectedCourse, setSelectedCourse] = React.useState("")
    const [selectedCourseIDs, setSelectedCourseIDs] = React.useState([])
    const [selectedViewCourseList, setSelectedViewCourseList] = React.useState([])
    const [selectedDTOCourseList, setSelectedDTOCourseList] = React.useState([])

    const [currentSemesterID, setCurrentSemesterID] = React.useState("")
    const [currentSessionID, setCurrentSessionID] = React.useState("")

    

    const {deptID} = useState(store)
    const {userId} = useState(store)


    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getStudentEligibleCourse(deptID.get());
                setCourses(res.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getCurrentSessionSemester();
                setCurrentSemesterID(res.data.semesterID)
                setCurrentSessionID(res.data.academicYearID)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])

    const handleSelect = () => {
        const courseIdDTO = {
            courseID: selectedCourse
        }
        if(!selectedCourseIDs.includes(selectedCourse)){
            setSelectedCourseIDs(prevArray => [...prevArray, selectedCourse])
            setSelectedDTOCourseList(prevArray => [...prevArray, courseIdDTO])
            let courseDetail = courses.find(x => x.id === selectedCourse)
            setSelectedViewCourseList(prevArray => [...prevArray, courseDetail])
        }
    }

    const handleDelete = (id) => {
        setSelectedCourseIDs(selectedCourseIDs.filter(x => x !== id))
        setSelectedDTOCourseList(selectedDTOCourseList.filter(x => x.courseID !== id))
        setSelectedViewCourseList(selectedViewCourseList.filter(x => x.id !== id))
    }

    const handleSubmit = async () => {
        if(selectedCourseIDs.length < 1){
            setAlertMsg("Course List Empty")
            setAlertType("danger")
            setShowAlert(true)
        }
        else{
            const data = {
                studentId: userId.get(),
                courses: selectedDTOCourseList,
                academicYearID: currentSessionID,
                semesterID: currentSemesterID
            }
            try{
                const res = await registerCourse(data)
                if(res.status === 200){
                    setAlertMsg(res.data.message)
                    setAlertType("success")
                    setShowAlert(true)
                }
                else{
                    setAlertMsg(res.data.message)
                    setAlertType("danger")
                    setShowAlert(true)
                }
            }
            catch(err){
                setAlertMsg(err.message)
                setAlertType("danger")
                setShowAlert(true)
            }
        }
    }

    return (
        <div>
            <div className="AcademicsModalTitle">
                    <div>
                       Courses Registration 
                    </div>
                    <div>
                    <span onClick={closeModal}><span class="iconify CloseIcon" data-icon="eva:close-outline" data-inline="false"></span></span>
                    </div>
            </div>
            <div className="AcademicsModalWrapper">
                {showAlert ? <div className={`AcademicsModalFlex AcademicsModalAlert AcademicsModalAlertBg-${alertType}`}>
                    <div><span class="iconify CircleAlertIcon" data-icon="eva:alert-circle-outline" data-inline="false"></span>{alertMsg}</div>
                    <div onClick={() => setShowAlert(false)}><span class="iconify CloseAlertIcon" data-icon="eva:close-outline" data-inline="false"></span></div>
                </div> : "" }
                
                <div className="AcademicsModalInput">
                    <form className={classes.root} noValidate autoComplete="off">
                        <StyledTextField
                            select
                            label="Courses"
                            name="Courses" 
                            id="Courses" 
                            value={selectedCourse}
                            onChange={(e) => (setSelectedCourse(e.target.value))}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            {courses.map(data => (
                                <option value={data.id} key={data.id}>{data.courseTitle} ({data.courseCode})</option>
                            ))}
                        </StyledTextField>
                        <button type='button' className='regcBtn btn mt-2 ml-3 addBtn' onClick={handleSelect}>Add</button>
                    </form>
                </div>
                <div className="AcademicsModalsubTitle">
                    List of Selected Courses
                </div>
                {/* <div className="AcademicsModalFlex2">
                    <div className="AcademicsModalEntries">
                        <form className={classes.rootEntry} noValidate autoComplete="off">
                            Show
                            <select
                                name="cars" 
                                id="cars" 
                                form="carform"
                            >
                            {EntryData.map((D) => (
                                <option key={D} value="volvo">{D}</option>
                            ))
                                }
                        </select>
                            entries
                        </form>
                    </div>
                    <div>
                        <form>
                            filter: <input/>
                        </form>
                    </div>
                </div> */}
                <div>
                    <div className="table-wrapper-scroll-y my-custom-scrollbar">
                        <ModalTable
                            data={selectedViewCourseList}
                            handleDelete={handleDelete}
                        />
                    </div>
                    {/* <div className="AcademicsModalPagination">Showing 1 to 10 of 15 entries</div> */}
                </div>
                <div className="AcademicsModaRegisterButtonCon">
                    <span className="AcademicsModaRegisterButton" onClick={handleSubmit}>Register</span>
                </div>
            </div>
        </div>
    )
}

export default AcademicsModal
