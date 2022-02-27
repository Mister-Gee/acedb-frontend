import { Row, Col, Container } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loading } from './LoginBtns';

const ForgotPasswordForm = ({initialValues, onSubmit, validationSchema, btnState}) => {

    return (
        <section>
            <Formik
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
                                        name="username" 
                                        id="username" 
                                        className="form-control2" 
                                        placeholder="Enter your Registered Email address" 
                                    />
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="username" />
                                    </small>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                {btnState ? 
                                <Loading />
                                :
                                <button type="submit" className="submit-forgotten-password">Retrieve Password</button>
                                }
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Formik>
        </section>
    )
}

export default ForgotPasswordForm
