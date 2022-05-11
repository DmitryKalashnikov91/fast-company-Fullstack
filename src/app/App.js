import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./components/page/usersListPage/usersListPage";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage/userPage";
import EditUserPage from "./components/page/userPage/editUserPage";

function App() {
    return <>
        <NavBar />
        <Switch>
            <Route path="/main" component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/:userId?" exact render={(props) => <UserPage {...props} />} />
            <Route path="/users/:userId?/:edit" exact component={EditUserPage} />
        </Switch>
        {/* <Users /> */}
    </>;
};
export default App;
