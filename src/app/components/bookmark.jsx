import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

const BookMark = ({status, ...rest}) => {
    
    return (
        <button {...rest}>
            <i className={"bi bi-award" + (status ? "-award-fill" : "")}>
        </i></button>
    );

};
export default BookMark;