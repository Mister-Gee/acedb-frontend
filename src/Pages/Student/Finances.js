import DashboardFrame from './subcomponents/Dashboard.Frame';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';
import {Paid, Unpaid, PartPayment} from './subcomponents/PaymentStatus';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const Finances = () => {

    return (
        <>
            <DashboardFrame title="Student Portal" subTitle="Finances">
                <Helmet>
                    <title>Finance | iEduCare</title>
                </Helmet>
                <div className="content-page">
                    <div className="finance-section">
                        <div className="finance-title">
                            Student Fees <span> (Payment History) </span>
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
                                    <th>Description</th>
                                    <th>Issued Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Amount(₦)</th>
                                    <th>Paid(₦)</th>
                                    <th>Balance(₦)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td className="payment-name">Acceptance Fees</td>
                                    <td>02-02-2021</td>
                                    <td>30-03-2021</td>
                                    <td><Paid /></td>
                                    <td>23,000.00</td>
                                    <td>23,000.00</td>
                                    <td>0.00</td>
                                    <td> 
                                        <span>
                                            <span className="iconify action-icon" data-icon="cil:zoom" data-inline="false"></span>
                                        </span>
                                        <span>
                                            <span className="iconify action-icon" data-icon="foundation:print" data-inline="false"></span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td className="payment-name">School Fees-First Semester</td>
                                    <td>20-01-2021</td>
                                    <td>26-03-2021</td>
                                    <td> <Unpaid /> </td>
                                    <td>45,000.00</td>
                                    <td>5,000.00</td>
                                    <td>40,000.00</td>
                                    <td> 
                                        <button type="button" className="pay-now-btn"> <span className="iconify" data-icon="ant-design:check-circle-filled" data-inline="false"></span> Pay Now</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td className="payment-name">Clearance Fee</td>
                                    <td>13-01-2021</td>
                                    <td>27-03-2021</td>
                                    <td> <PartPayment /> </td>
                                    <td>9,000.00</td>
                                    <td>2,000.00</td>
                                    <td>70,000.00</td>
                                    <td> 
                                    <button type="button" className="pay-now-btn"> <span className="iconify" data-icon="ant-design:check-circle-filled" data-inline="false"></span> Pay Now</button>
                                    </td>
                                </tr>
                            </tbody>
                            </Table>
                        </div> 
                    </div>
                    <div className="finance-section">
                        <div className="finance-title">
                            Payment History 
                        </div>
                        <div className="history-header">
                            <div style={{ marginRight: "100px" }} id="select-field" >
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
                        </div>
                        <div className="institution-table table-wrapper-scroll-y my-custom-scrollbar overflow">
                        <Table responsive bordered hover size="lg">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Description</th>
                                    <th>Payment Date</th>
                                    <th>Amount(₦)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td className="payment-name">Acceptance Fees</td>
                                    <td>30-03-2021</td>
                                    <td>23,000.00</td>
                                    <td> 
                                       <span>
                                            <span className="iconify action-icon" data-icon="foundation:print" data-inline="false"></span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td className="payment-name">School Fees-First Semester</td>
                                    <td>26-03-2021</td>
                                    <td>45,000.00</td>
                                    <td> 
                                        <span>
                                            <span className="iconify action-icon" data-icon="foundation:print" data-inline="false"></span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td className="payment-name">Clearance Fee</td>
                                    <td>27-03-2021</td>
                                    <td>9,000.00</td>
                                    <td> 
                                        <span>
                                            <span className="iconify action-icon" data-icon="foundation:print" data-inline="false"></span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                            </Table>
                        </div>
                        
                    </div>
                </div>
            </DashboardFrame>
        </>
    )
}

export default Finances