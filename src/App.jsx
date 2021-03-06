import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import history from "./shared/history";
import * as actions from "./store/actions";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

import Auth from "./containers/Auth";
import ChangePassword from "./containers/Auth/ChangePassword";
import MainApp from "./containers/App";
import ScheduleModal from "./components/UI/Modal/Schedule";

import "antd/dist/antd.css";
import "@loadingio/loading.css/dist/loading.min.css";
import "ldbutton/dist/ldbtn.min.css";

function App(props) {
  const [visible, setVisible] = useState(false);

  const { loadUser, getQuestions, getDocuments, getCurrencies, getBanks } = props;

  useEffect(() => {
    getQuestions();
    getDocuments();
    getBanks();
    getCurrencies();
  }, [getQuestions, getDocuments, getBanks, getCurrencies]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    ReactGA.initialize("UA-158782686-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const closeModal = () => {
    setVisible(false);
    sessionStorage.setItem("modalRead", true);
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/login' component={Auth} />
        <Route exact path='/change-password' component={ChangePassword} />
        <PrivateRoute path='/' setModal={setVisible} component={MainApp} />
      </Switch>

      <ScheduleModal visible={visible} close={closeModal} />
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(actions.loadUserInit()),
    getQuestions: () => dispatch(actions.getQuestionsInit()),
    getDocuments: () => dispatch(actions.getDocumentsInit()),
    getBanks: () => dispatch(actions.getBanksInit()),
    getCurrencies: () => dispatch(actions.getCurrenciesInit()),
  };
};

export default connect(null, mapDispatchToProps)(App);
