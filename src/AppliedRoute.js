import React from "react";
import { Route } from "react-router-dom";

export default function AppliedRoute({ component: C, appProps, ...restProps }) {
    return (
        <Route {...restProps} render={ props => <C {...props} {...appProps} />} />
    );
}