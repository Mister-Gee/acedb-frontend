import {PropagateLoader} from 'react-spinners';

const ContentLoader = () => {
    return (
        <div className="loader">
            <PropagateLoader 
                color="#16BC5D"
                size={15}
            />
        </div>
    )
}

export default ContentLoader
