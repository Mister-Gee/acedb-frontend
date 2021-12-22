import React, { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';

const ReadMore = ({ header, children, subHeader }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [openTable, setOpenTable] = useState(true)

    const text = children;

    const resultString = isTruncated && text;
    const toggleTruncated = () => {
        setIsTruncated(!isTruncated);
        setOpenTable(!openTable)
    };
    return (
        <>
            <div className="EdutableBodyTitle">
                <i onClick={toggleTruncated}>
                    {openTable ? <IoMdArrowDropright className="iconify EdutableIconClose" /> : <IoMdArrowDropdown className="iconify EdutableIconClose" />}
                </i> <span>{header}</span> ({subHeader})
            </div>
            {resultString}
        </>
    );
};

export default ReadMore
