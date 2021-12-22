import { useState } from 'react'
import { SessionData, SemesterData, EntryData } from "./Data"
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ModalTable from './ModalTable';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        }
    },
}));


function AcademicsModal({closeModal}) {
    const classes = useStyles();
    const[showAlert, setShowAlert] = useState(true)
    const [session, setSession] = useState("Mr");
    const [semester, setSemester] = useState("Female");

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
                {showAlert ? <div className="AcademicsModalFlex AcademicsModalAlert ">
                    <div><span class="iconify CircleAlertIcon" data-icon="eva:alert-circle-outline" data-inline="false"></span>Maximum credit unit allowed exceeded!</div>
                    <div onClick={() => setShowAlert(false)}><span class="iconify CloseAlertIcon" data-icon="eva:close-outline" data-inline="false"></span></div>
                </div> : "" }
                
                <div className="AcademicsModalInput">
                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-select-session"
                        select
                        label="Session"

                        value={session}
                        onChange={(e) => (setSession(e.target.value))}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {SessionData.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                        <TextField
                            id="outlined-select-semester"
                            select
                            label="Semester"

                            value={semester}
                            onChange={(e) => (setSemester(e.target.value))}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                        >
                            {SemesterData.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                    </form>
                </div>
                <div className="AcademicsModalsubTitle">
                    List of Courses to start Registration
                </div>
                <div className="AcademicsModalFlex2">
                    <div className="AcademicsModalEntries">
                        <form className={classes.rootEntry} noValidate autoComplete="off">
                            Show
                             <select
                            name="cars" id="cars" form="carform">
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
                </div>
                <div>
                    <div className="table-wrapper-scroll-y my-custom-scrollbar">
                        <ModalTable/>
                    </div>
                    <div className="AcademicsModalPagination">Showing 1 to 10 of 15 entries</div>
                </div>
                <div className="AcademicsModaRegisterButtonCon"><span className="AcademicsModaRegisterButton">Register</span></div>
            </div>
        </div>
    )
}

export default AcademicsModal
