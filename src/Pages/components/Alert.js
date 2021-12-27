import {Alert} from 'react-bootstrap';

export const PopupAlert = ({alertType, setShowAlert, message}) => {
    return (
      <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
        <p>
          <b>{message}</b>
        </p>
      </Alert>
    );
  }