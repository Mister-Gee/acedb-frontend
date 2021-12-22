import DashboardFrame from './subcomponents/Dashboard.Frame';
import { Helmet } from 'react-helmet';
import ReadMore from "./subcomponents/AcademicsSub.js/Truncate";
import ResultTable from './subcomponents/ResultTable';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const Results = () => {
    return (
            <DashboardFrame title="Student Portal" subTitle="Results">
                <Helmet>
                    <title>Results | iEduCare</title>
                </Helmet>
                <div className="content-page">
                    <div className="result-wrapper">
                        <ReadMore header="Student Result" subHeader="2020/2021 Academic Session - First Semester">
                            <div>
                                <div className="result">
                                    <div className="action">
                                        <span>
                                            <span className="iconify" data-icon="foundation:print" data-inline="false"></span>
                                        </span>
                                        <button><span className="iconify" data-icon="cil:zoom" data-inline="false"></span> View</button>
                                    </div>
                                    <ResultTable />
                                </div>
                            </div>
                        </ReadMore>
                        <div className="result-history-section">
                            <div className="title">Result History</div>
                            <div className="history-header">
                            <div id="select-field">
                                <TextField 
                                    select 
                                    name="session" 
                                    id="session" 
                                    label="Session" 
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                >
                                    <MenuItem value="">Select Session</MenuItem>
                                    <MenuItem value="20202021">2020/2021 Academic Session</MenuItem>
                                </TextField>
                            </div>
                            <div id="select-field">
                                <TextField 
                                    select 
                                    name="semester" 
                                    id="semester" 
                                    label="Semester" 
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                >
                                    <MenuItem value="">Select Semester </MenuItem>
                                    <MenuItem value="1">First Semester</MenuItem>
                                </TextField>
                            </div>
                            <button type="button" className="search-btn"><span className="iconify" data-icon="cil:zoom" data-inline="false"></span> Search</button>
                        </div>
                            <div className="session-section">
                                <div className="session-title">2019/2020 Academic Session - First Semester</div>
                                <div className="action">
                                    <span>
                                        <span className="iconify" data-icon="foundation:print" data-inline="false"></span>
                                    </span>
                                    <button><span className="iconify" data-icon="cil:zoom" data-inline="false"></span> View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardFrame>
    )
}

export default Results;