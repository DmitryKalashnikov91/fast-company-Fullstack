import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualitySevice from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getQualitiesList() {
            try {
                const { content } = await qualitySevice.get();
                console.log(content);
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        }
        getQualitiesList();
    }, []);
    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
