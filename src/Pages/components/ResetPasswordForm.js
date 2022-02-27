import { Row, Col, Container } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loading } from './LoginBtns';

const ResetPasswordForm = ({initialValues, onSubmit, validationSchema, btnState}) => {

    return (
        <section>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="form-group">
                                    <Field 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="form-control2" 
                                        placeholder="Enter your Registered Email address" 
                                    />
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="email" />
                                    </small>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="form-group">
                                    <Field 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        className="form-control2" 
                                        placeholder="Enter Password" 
                                    />
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="password" />
                                    </small>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="form-group">
                                    <Field 
                                        type="password" 
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        className="form-control2" 
                                        placeholder="Confirm Password" 
                                    />
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="confirmPassword" />
                                    </small>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                            {btnState ? 
                                <Loading />
                                :
                                <button type="submit" className="submit-forgotten-password">Reset Password</button>
                                }
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Formik>
        </section>
    )
}

export default ResetPasswordForm
