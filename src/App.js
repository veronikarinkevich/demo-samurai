import React, {Component, Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useParams} from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from '../src/redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const withRouter = WrappedComponent => props => {
  const params  = useParams();
  return <WrappedComponent {...props}  params = {params}/>
}

class App extends Component {
  componentDidMount() {
      this.props.initializeApp();
  }

  render() {
      if (!this.props.initialized) {
          return <Preloader/>
      }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
        <Suspense fallback={<div><Preloader /></div>}>
          <Routes>
            <Route path="/profile/*"
              element={<ProfileContainer />}>
              <Route path=":userId" element={<ProfileContainer />} />
            </Route>
            <Route path="/dialogs"
              element={<DialogsContainer />} />
            <Route path="/users"
              element={<UsersContainer />} />
            <Route path="/login"
              element={<Login />} />
          </Routes>
          </Suspense>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

  let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
   return <BrowserRouter basename={`/${process.env.PUBLIC_URL}`} >
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;
