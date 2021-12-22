import {PropagateLoader} from 'react-spinners';

const ContentLoader = () => {
    return (
        <div className="loader">
            <PropagateLoader 
                color="#FDC600"
                size={15}
            />
        </div>
    )
}

export default ContentLoader
