import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities }) => {
    return <>
        {qualities.map((q) => (
            <Qualitie key={q._id} {...q} />
        ))}
    </>;
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;
