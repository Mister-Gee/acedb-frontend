import {Row, Col, Container} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import {Loading, SubmitBtn} from './LoginBtns';


const AdminLoginForm = ({initialValues, onSubmit, validationSchema, btnState}) => {

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema
    })

    return (
        <section>
            <form onSubmit={formik.handleSubmit}>
                <Container>
                <Row>
                    <Col lg={12}>
                        <TextField
                            label="Username"
                            type="text" 
                            name="email" 
                            id="email"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            placeholder="Username"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <TextField 
                            label="Password"
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password" 
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />  
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Link to="/forgot-password" className="forgot-pwd">Forgot Password</Link>
                    </Col>
                    <Col lg={6}>
                    {btnState ? <Loading /> : <SubmitBtn />}
                    </Col>
                </Row>
                </Container>
            </form>
    </section>
    )
}

export default AdminLoginForm
