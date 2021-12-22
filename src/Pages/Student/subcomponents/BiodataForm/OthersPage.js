import React, { useState } from "react"
import TextField from "@material-ui/core/TextField";
import { useFormik } from 'formik';

function OthersPage({ initialValues, onSubmit, validationSchema, btnState }) {

    const [save, setSave] = useState(true)

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema
    })


    return (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <div>
                {save ? <button onClick={() => (setSave(false))} className="editButton"><span class="iconify editIcon" data-icon="ant-design:edit-twotone" data-inline="false" ></span>Edit</button> :
                    <span><span><button type="submit" className="editButton">Save </button></span> <span><button onClick={() => (setSave(true))} className="cancelButton">Cancel </button></span></span>}
            </div>
            <div>
                <TextField
                    label="Next of Kin"
                    type="text"
                    name="nextOfKen"
                    id="nextOfKen"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    placeholder=".........."
                    value={formik.values.nextOfKen}
                    onChange={formik.handleChange}
                />
                <TextField
                    label="Next of Kin Address "
                    type="text"
                    name="NOKAddress"
                    id="NOKAddress"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    placeholder=".........."
                    value={formik.values.NOKAddress}
                    onChange={formik.handleChange}
                />
                <TextField
                    label="Telephone No"
                    type="text"
                    name="NOKTelephoneNo"
                    id="NOKTelephoneNo"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    placeholder=".........."
                    value={formik.values.NOKTelephoneNo}
                    onChange={formik.handleChange}
                />
                <TextField
                    label="Name of Sponsor"
                    type="text"
                    name="sponsorName"
                    id="sponsorName"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    placeholder=".........."
                    value={formik.values.sponsorName}
                    onChange={formik.handleChange}
                />
                <TextField
                    label="Contact address "
                    type="text"
                    name="ContactAddress"
                    id="ContactAddress"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    placeholder=".........."
                    value={formik.values.ContactAddress}
                    onChange={formik.handleChange}
                />
                <TextField
                    label="Telephone No"
                    type="text"
                    name="sponsorTelephone"
                    id="sponsorTelephone"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    placeholder=".........."
                    value={formik.values.sponsorTelephone}
                    onChange={formik.handleChange}
                />
            </div>
        </form>
    )
}

export default OthersPage
