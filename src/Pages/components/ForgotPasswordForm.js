import { Row, Col, Container } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ForgotPasswordForm = () => {

    const initialValues = {
        email: ''
    }

    const onSubmit = value => {
        console.log(value)

    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Address").required("Email is required")
    })

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
                                    <Field type="email" name="email" id="email" className="form-control2" placeholder="Enter your Registered Email address" />
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="email" />
                                    </small>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <button type="submit" className="submit-forgotten-password">Retrieve Password</button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Formik>
        </section>
    )
}

export default ForgotPasswordForm
