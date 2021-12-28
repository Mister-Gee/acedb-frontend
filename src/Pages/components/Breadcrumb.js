const Breadcrumb = ({title, subTitle}) => {

    // let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    // const currentDate = new Date()
    // const date = currentDate.getDate().toString().padStart(2, "0")
    // const month = currentDate.getMonth()
    // const year = currentDate.getFullYear()

    return (
        <div className="breadcrumbs">
            <div className="title-section">
                <div className="section"> <span className="title"><a href="/">{title}</a></span> <span className="iconify" data-icon="eva:arrow-ios-forward-outline" data-inline="false"></span> {subTitle} </div>
            </div>
            <div className="last-login-section">
                <div className="last-login-detail">
                    {/* <div className="last-login">
                        <span className="iconify" data-icon="typcn:time" data-inline="false"></span>
                          Last Login: 01-March-2021
                    </div>
                    <div className="vl"></div>
                    <div className="today-date">
                        <span className="iconify" data-icon="bx:bx-calendar" data-inline="false"></span>
                           Today's Date: {`${date}-${monthArray[month]}-${year}`}
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default Breadcrumb;