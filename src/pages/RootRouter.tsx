import HomePage from '@/pages/HomePage/HomePage';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DefaultPage from './DefaultPage/DefaultPage';
import TestPage from './TestPage/TestPage';

const RootRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/" component={DefaultPage}/>
                <Route path="/test" component={TestPage}/>
            </Switch>
        </Router>
    )
};

export default RootRouter;
