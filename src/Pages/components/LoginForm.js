import { Row, Col, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Loading, SubmitBtn } from './LoginBtns';
import StyledTextField from './StyledTextField';


const LoginForm = ({ initialValues, onSubmit, validationSchema, btnState }) => {


    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema
    })

    return (
        <section>
            <form onSubmit={formik.handleSubmit} id="">
                <Container>
                    <div>
                        <Row>
                            <Col lg={12}>
                                <StyledTextField
                                    label="UserID"
                                    type="email"
                                    name="userId"
                                    id="userId"
                                    margin="normal"
                                    fullWidth 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    placeholder="Email"
                                    value={formik.values.userId}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userId && Boolean(formik.errors.userId)}
                                    helperText={formik.touched.userId && formik.errors.userId}
                                    // className="login-input"
                                />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col lg={12} >
                                <StyledTextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    fullWidth 
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
                    </div>
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

export default LoginForm
