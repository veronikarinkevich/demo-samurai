import React from "react";
import {Navigate} from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForNavigate = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthNavigate = (Component) => {
    class NavigateComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to= "/login" />

            return <Component {...this.props} />
        }
    }
    
    
   let ConnectedAuthNavigateComponent = connect(mapStateToPropsForNavigate)(NavigateComponent);
    

    return ConnectedAuthNavigateComponent;
}
