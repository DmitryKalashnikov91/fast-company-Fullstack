import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import query from "query-string";

const UserPage = ({ match, location }) => {
    const search = query.parse(location.search);
    console.log(search);
    const userId = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log(user);
    return <>
        <h2>{user ? user.name : "Loading..."}</h2>
    </>;
};
UserPage.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    search: PropTypes.object
};

export default UserPage;
