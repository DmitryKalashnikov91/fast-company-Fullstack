import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};
Qualitie.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string
};
export default Qualitie;
