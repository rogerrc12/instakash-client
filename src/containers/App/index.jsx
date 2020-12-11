import React, { useState, lazy, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Route } from "react-router-dom";
import { RiQuestionLine } from "react-icons/ri";
import AsyncComponent from "../../hoc/asyncComponent";
import * as signalR from "@microsoft/signalr";

import Header from "../../components/layout/Header";
import Navigation from "../../components/Navigation";
import FooterNav from "../../components/Navigation/FooterNav";
import QuestionsButton from "../../components/UI/SquareButton";
import QuestionsModal from "../../components/UI/Modal/Questions";
import Welcome from "../Welcome";

import classes from "./App.module.scss";

const Dashboard = lazy(() => import("../Dashboard"));
const Accounts = lazy(() => import("../Accounts"));
const Profile = lazy(() => import("../Profile"));
const CurrencyExchange = lazy(() => import("../CurrencyExchange"));
const CashAdvance = lazy(() => import("../CashAdvance"));

const MainApp = (props) => {
  const { getAccounts } = props;

  const [openedNav, setOpenedNav] = useState(false);
  const [connection, setConnection] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const openNav = () => setOpenedNav(true);
  const closeNav = () => setOpenedNav(false);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  useEffect(() => {
    let hubConnection = new signalR.HubConnectionBuilder().withUrl(process.env.REACT_APP_WS).build();

    setConnection(hubConnection);
  }, []);

  useEffect(() => {
    const wsConnect = async () => {
      if (connection) {
        try {
          await connection.start();
          console.log("Conexión exitosa!");
        } catch (error) {
          console.log("Conexión fallida al ws: " + error);
        }
      }
    };
    wsConnect();
  }, [connection]);

  return (
    <div className={classes.App}>
      <Header location={props.location.pathname} user={user} openHandler={openNav} />
      <Navigation opened={openedNav} closeHandler={closeNav} />
      <Route exact path='/' component={Welcome} />
      <Route path={props.match.url + "actividad"} component={AsyncComponent(Dashboard, connection)} />
      <Route path={props.match.url + "cambio-de-divisas"} component={AsyncComponent(CurrencyExchange, connection)} />
      <Route path={props.match.url + "avance-de-efectivo"} component={AsyncComponent(CashAdvance)} />
      <Route path={props.match.url + "mis-cuentas"} component={AsyncComponent(Accounts)} />
      <Route path={props.match.url + "mi-perfil"} component={AsyncComponent(Profile)} />
      <FooterNav />

      <QuestionsButton icon={RiQuestionLine} className={classes.Question} click={props.openModal} />

      <QuestionsModal />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(actions.openQuestionsModal()),
  getAccounts: () => dispatch(actions.getAccountsInit()),
});

export default connect(null, mapDispatchToProps)(MainApp);
