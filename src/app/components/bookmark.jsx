import React from "react";

const BookMark = ({status, ...rest}) => {
    
    return (
        <button {...rest}>
            <i className={"bi bi-award" + (status ? "-award-fill" : "")}>
        </i></button>
    );

};
export default BookMark;