import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/users";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./layouts/login";
import UserPage from "./components/userPage";

function App() {
    return <>
        <NavBar />
        <Switch>
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/:userId?" exact render={(props) => <UserPage {...props} />} />
        </Switch>
        {/* <Users /> */}
    </>;
};
export default App;
