import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import query from "query-string";
import QualitiesList from "./qualitiesList";

const UserPage = ({ match, location }) => {
    const search = query.parse(location.search);
    console.log(search);
    const userId = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    return (
        user ? <div><h2>{user.name}</h2><h3>{"Профессия: "}{user.profession.name}</h3><QualitiesList qualities={user.qualities}/><h4>{"Оценка: "}{user.rate}</h4><Link to="/users"><button>Все пользователи</button></Link></div> : "Loading..."
    );
};
UserPage.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    search: PropTypes.object
};

export default UserPage;
