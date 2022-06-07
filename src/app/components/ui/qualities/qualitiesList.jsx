import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQuality();
    return (
        <>
            {!isLoading
                ? qualities.map((qual) => <Quality key={qual} id={qual} />)
                : "Loading..."}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array,
    isLoading: PropTypes.bool
};

export default QualitiesList;
