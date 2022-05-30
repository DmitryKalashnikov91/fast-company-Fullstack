import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualitie";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((q) => (
                <Qualities key={q._id} {...q} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
