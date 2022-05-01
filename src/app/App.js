import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/users";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import UserPage from "./components/userPage";

function App() {
    return <>
        <NavBar />
        <Switch>
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/users" component={Users} />
        </Switch>
        {/* <Users /> */}
    </>;
};
export default App;
