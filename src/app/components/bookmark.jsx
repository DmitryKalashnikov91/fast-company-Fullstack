import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-award" + (status ? "-fill" : "")}></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};
export default BookMark;
