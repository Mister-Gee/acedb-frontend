export const Up = ({positionClass}) => {
    return (
        <span className={`dropdown-icon ${positionClass}`}>
            <span className="iconify" data-icon="eva:arrow-ios-forward-fill" data-inline="false"></span>
        </span>
    )
}

export const Down = ({positionClass}) => {
    return (
        <span className={`dropdown-icon ${positionClass}`}>
            <span className="iconify" data-icon="eva:arrow-ios-downward-fill" data-inline="false"></span>
        </span>
    )
}