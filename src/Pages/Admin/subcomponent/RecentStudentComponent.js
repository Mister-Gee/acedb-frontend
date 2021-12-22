const RecentStudentComponent = ({name, dateTime, dp}) => {
    return ( 
        <div className="recent-student-card pt-2">
            <div className="student-dp">
                <span className="iconify" data-icon="clarity:user-solid" data-inline="false"></span> 
            </div>
            <div className="student-detail">
                <div className="name"> {name} </div>
                <div className="reg-date"> Registered on {dateTime} </div>
            </div>
        </div>
    )
}

export default RecentStudentComponent