import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from "app/home/Home.container";

export default () => {
    return (
        <Route path="/">
            <IndexRoute component={Home}/>
        </Route>
    );
};
