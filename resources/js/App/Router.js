import React, { Suspense } from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';

import routes_v1 from '../v1/routes';
import Route404 from '../v1/Route404'

const Main = props => (
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            {
                routes_v1.map((route) => {
                    return route;
                })
            }
            <Route key="404" component={Route404} />
        </Switch>
    </Suspense>
);

export default Main;
