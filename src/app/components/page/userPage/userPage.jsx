import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
// import query from "query-string";

const UserPage = ({ match }) => {
    const { userId } = match.params;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    return user ? (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-4">
                    <UserCard user={user} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingsCard value={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    ) : (
        "Loading..."
    );
};
UserPage.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    search: PropTypes.object
};

export default UserPage;
