import { Spinner } from 'react-bootstrap';

export const Loading = () => {
    return (
        <button type="submit" className="login-btn" disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
        </button>
    )
}

export const SubmitBtn = () => {
    return (
        <button type="submit" className="login-btn">
            Sign In
            <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span>
        </button>
    )
}


