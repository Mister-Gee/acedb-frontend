import DashboardFrame from './subcomponents/Dashboard.Frame';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import { dateConverter } from '../../utils/Functions';
import React, {useEffect} from 'react';
import { useState } from '@hookstate/core';
import store from '../../store/store';
import {getStudentRegCourses, getStudentRegCoursesBySemesterAndYear} from '../../services/courseServices';
import { getAcademicYears, getSemesters } from '../../services/commonServices';
import ContentLoader from '../components/ContentLoader';
import StyledTextField from '../components/StyledTextField';
import Modal from 'react-modal';
import AcademicsModal from './subcomponents/AcademicsSub.js/AcademicsModal';




const Courses = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [courses, setCourses] = React.useState([])
    const [academicYear, setAcademicYear] = React.useState([])
    const [selectedAcademicYear, setSelectedAcademicYear] = React.useState(" ")
    const [semester, setSemester] = React.useState([])
    const [selectedSemester, setSelectedSemester] = React.useState(" ")
    const [pastCourses, setPastCourses] = React.useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const {userId} = useState(store)


    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getStudentRegCourses(userId.get())
                setCourses(res.data)
                setPastCourses(res.data)
                setIsLoading(false)
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
                if(selectedAcademicYear === " " || selectedSemester === " "){
                    setPastCourses(courses)
                }
                else{
                    const res = await getStudentRegCoursesBySemesterAndYear(userId.get(), selectedAcademicYear, selectedSemester)
                    setPastCourses(res.data)
                }
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[selectedAcademicYear, selectedSemester])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getSemesters()
                setSemester(res.data)
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
                const res = await getAcademicYears()
                setAcademicYear(res.data )
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])

    
    return (
        <>
            <DashboardFrame title="Student Portal" subTitle="Courses">
                <Helmet>
                    <title>Courses | iEduCare</title>
                </Helmet>
                {isLoading ?
                <ContentLoader />
                :
                <div className="content-page">
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={
                            {
                                overlay: {
                                    background: "rgba(255, 255, 255, 0.5)",
                                    backdropFilter: "blur(5px)",
                                    border: "none",
                                },
                                content: {
                                    backgroundColor: "#FFFFFF",
                                    top: '10%',
                                    left: '20%',
                                    width: "75%",
                                    padding: "0",
                                    right: 'auto',
                                    bottom: 'auto',
                                    marginRight: '-50%',
                                }
                            }
                        }
                    >
                        <AcademicsModal closeModal={closeModal }/>
                    </Modal>
                    <div className="finance-section">
                        <div className="finance-title">
                            Student Courses <span> (Current Session And Semester) </span>
                        </div>
                        <div className='mt-3'>
                            <button className='regcBtn btn' onClick={openModal}>Course Registeration</button>
                        </div>
                        <div className="table-header">
                            <div className="entries">
                                <label htmlFor="entries" className="entries-label">Show</label>
                                <div className="entries-input">
                                    <select className="entries-box" id="entries">
                                        {[5, 10, 15, 20, 25, 30].map((value) => (
                                            <option value={value} key={value}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="entries-label"> entries </div>
                            </div>
                            <div className="search">
                                <label htmlFor="search" className="search-label">Search: </label>
                                <input type="search" className="search-box" id="search" />
                            </div>
                        </div>
                        <div className="institution-table table-wrapper-scroll-y my-custom-scrollbar overflow">
                        <Table responsive bordered hover size="lg">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Course</th>
                                    <th>Course Unit</th>
                                    <th>Academic Year</th>
                                    <th>Semester</th>
                                    <th>Registeration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className="payment-name">{data.course}</td>
                                        <td>{data.courseUnit}</td>
                                        <td>{data.academicYear}</td>
                                        <td>{data.semester}</td>
                                        <td>{dateConverter(data.courseRegisterationDate)}</td>
                                    </tr>
                                ))}
                                
                                {/* <tr>
                                    <td>2</td>
                                    <td className="payment-name">School Fees-First Semester</td>
                                    <td>20-01-2021</td>
                                    <td>26-03-2021</td>
                                    <td> <Unpaid /> <Paid /> </td>
                                    <td>45,000.00</td>
                                    <td>5,000.00</td>
                                    <td>40,000.00</td>
                                    <td> 
                                        <button type="button" className="pay-now-btn"> <span className="iconify" data-icon="ant-design:check-circle-filled" data-inline="false"></span> Pay Now</button>
                                    </td>
                                </tr> */}
                            </tbody>
                            </Table>
                        </div> 
                    </div>
                    <div className="finance-section">
                        <div className="finance-title">
                            Course Registeration History 
                        </div>
                        <div className="history-header">
                            <div style={{ marginRight: "100px" }} id="select-field" >
                                <StyledTextField 
                                    select 
                                    name="academicYear" 
                                    id="academicYear" 
                                    label="Academic Year" 
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={selectedAcademicYear}
                                    onChange={(e) => setSelectedAcademicYear(e.target.value)}
                                >
                                    <MenuItem value=" " disabled>Select Session</MenuItem>
                                    {academicYear.map(data => (
                                        <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </StyledTextField>
                            </div>
                            <div id="select-field">
                                <StyledTextField 
                                    select 
                                    name="semester" 
                                    id="semester" 
                                    label="Semester" 
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={selectedSemester}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                >
                                    <MenuItem value=" " disabled>Select Semester </MenuItem>
                                    {semester.map(data => (
                                        <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </StyledTextField>
                            </div>
                        </div>
                        <div className="institution-table table-wrapper-scroll-y my-custom-scrollbar overflow">
                        <Table responsive bordered hover size="lg">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Course</th>
                                    <th>Course Unit</th>
                                    <th>Academic Year</th>
                                    <th>Semester</th>
                                    <th>Registeration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastCourses.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className="payment-name">{data.course}</td>
                                        <td>{data.courseUnit}</td>
                                        <td>{data.academicYear}</td>
                                        <td>{data.semester}</td>
                                        <td>{dateConverter(data.courseRegisterationDate)}</td>
                                    </tr>
                                ))}  
                            </tbody>
                            </Table>
                        </div>
                        
                    </div>
                </div>
                }
            </DashboardFrame>
        </>
    )
}

export default Courses