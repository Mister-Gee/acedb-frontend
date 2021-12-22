import { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import { GetCommonData } from "../../../../services/commonServices"
import { TitleData, GenderData, MaritalStatusData, BloodGroupData, GenotypeData, NationalityData, StateOfOriginData, LocalGovernmentData } from "./Data"
import { useFormik } from 'formik';


function Biodata({ initialValues, onSubmit, validationSchema }) {
    const [save, setSave] = useState(true)

    const [titleList, setTitleList] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [countryList, setCountryList] = useState([])
    const [marital, setMarital] = useState("Single");
    const [bloodGroup, setBloodGroup] = useState("Female");
    const [gynotype, setGynotype] = useState("Female");
    const [national, setNational] = useState("Nigeria");
    const [stateOfOrigin, setStateOfOrigin] = useState("Female");
    const [localGovernment, setLocalGovernment] = useState("Female");

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await GetCommonData();
                setCountryList(Data.data.countries);
                setTitleList(Data.data.titles)
                const religionList = Data.data.religions;
                const MaritalStatusList = Data.data.maritalStatus;
                setGenderList(Data.data.genders)
                console.log("RES DATA", Data)
            }
            catch (err) {
                console.log("RES ERROR MESSAGE", err.message)
            }
        }
        fetchData()
    }, [])

    return (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <div>
                {save ? <button onClick={() => (setSave(false))} className="editButton"><span class="iconify editIcon" data-icon="ant-design:edit-twotone" data-inline="false" ></span>Edit</button> :
                    <span><span><button type="submit" className="editButton">Save </button></span> <span><button onClick={() => (setSave(true))} className="cancelButton">Cancel </button></span></span>}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: "center" }}>
                <div>
                    <TextField
                        select
                        label="Title"
                        value={formik.values.title}
                        type="text"
                        name="title"
                        id="title"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={formik.handleChange}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {titleList.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.code}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        label="First Name"
                        type="text"
                        name="firstName"
                        id="firstName"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        placeholder=".........."
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>

                    <TextField
                        label="Last Name"
                        type="text"
                        name="lastName"
                        id="lastName"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        placeholder=".........."
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        label="other Name"
                        type="text"
                        name="otherName"
                        id="otherName"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        placeholder=".........."
                        value={formik.values.otherName}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        select
                        label="Gender"
                        value={formik.values.title}
                        type="text"
                        name="gender"
                        id="gender"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={formik.handleChange}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {genderList.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-select-marital-status"
                        select
                        label="Marital Status"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={marital}
                        onChange={(e) => (setMarital(e.target.value))}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {MaritalStatusData.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        label="Madien Name"
                        type="text"
                        name="madienName"
                        id="madienName"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        placeholder=".........."
                        value={formik.values.madienName}
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <TextField
                        label="Religion"
                        type="text"
                        name="religionName"
                        id="religionName"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        placeholder=".........."
                        value={formik.values.religionName}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Date of Birth"
                        type="date"
                        name="DateOfBirth"
                        id="DateOfBirth"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=".........."
                        variant="outlined"
                        value={formik.values.DateOfBirth}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        id="email"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="..........@.com"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>
                <div>
                    <TextField
                        label="Telephone No"
                        type="phone"
                        name="telephone"
                        id="telephone"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=".........."
                        variant="outlined"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <TextField
                        label="GSM"
                        type="phone"
                        name="gsm"
                        id="gsm"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=".........."
                        variant="outlined"
                        value={formik.values.gsm}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-select-BloodGroup"
                        select
                        label="Blood Group"

                        value={bloodGroup}
                        onChange={(e) => (setBloodGroup(e.target.value))}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {BloodGroupData.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-select-gynotype"
                        select
                        label="Genotype"

                        value={gynotype}
                        onChange={(e) => (setGynotype(e.target.value))}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {GenotypeData.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        label="Weight (kg)"
                        type="text"
                        name="weigth"
                        id="weigth"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=".........."
                        variant="outlined"
                        value={formik.values.weigth}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Height"
                        type="text"
                        name="heigth"
                        id="heigth"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=".........."
                        variant="outlined"
                        value={formik.values.heigth}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-select-national"
                        select
                        label="National"

                        value={national}
                        onChange={(e) => (setNational(e.target.value))}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {countryList.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>

                    <TextField
                        id="outlined-select-State-of-origin"
                        select
                        label="State of Origin"

                        value={stateOfOrigin}
                        onChange={(e) => (setStateOfOrigin(e.target.value))}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {StateOfOriginData.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-select-local-government"
                        select
                        label="Local Government"

                        value={localGovernment}
                        onChange={(e) => (setLocalGovernment(e.target.value))}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {LocalGovernmentData.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        label="Residential Address"
                        type="text"
                        name="residentialAddress"
                        id="residentialAddress"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=".........."
                        variant="outlined"
                        value={formik.values.residentialAddress}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
        </form>
    )
}

export default Biodata