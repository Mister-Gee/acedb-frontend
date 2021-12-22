import {Alert} from 'react-bootstrap';

const AuthAlert = ({showSuccess, setShowSuccess, showFail, setShowFail, showError, setShowError}) => {

if (showSuccess) {
    return (
      <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible size="sm">
        <p>
          Login Successful
        </p>
      </Alert>
    );
  }

  if (showFail) {
    return (
      <Alert variant="danger" onClose={() => setShowFail(false)} dismissible>
        <p>
          Username/Password incorrect
        </p>
      </Alert>
    );
  }

  if (showError) {
    return (
      <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
        <p>
          Login Failed
        </p>
      </Alert>
    );
  }

  return null

}

export default AuthAlert;