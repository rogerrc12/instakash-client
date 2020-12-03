import React from "react";
import { isMobile } from "react-device-detect";
import { BsCreditCard } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { Tabs } from "antd";

import CurrencyExchanges from "./CurrencyExchange";
import MobileCurrencyExchanges from "./CurrencyExchange/Mobile";
import CashAdvances from "./CashAvances";

import classes from "./Activity.module.scss";

const { TabPane } = Tabs;

const Activity = (props) => {
  let currencyExchanges = <CurrencyExchanges isLoading={props.isLoading} open={props.open} data={props.CEdata} />;
  let cashAdvances = <CashAdvances isLoading={props.isLoading} open={props.open} data={props.CAdata} />;

  if (isMobile) {
    currencyExchanges = <MobileCurrencyExchanges open={props.open} data={props.CEdata} />;
  }

  return (
    <>
      <Tabs className='activity-tabs' tabPosition='top' animated={true}>
        <TabPane tab={<ActivityTab icon={<FiDollarSign />}>Cambio de divisas</ActivityTab>} key='1'>
          <div className={classes.Activity}>{currencyExchanges}</div>
        </TabPane>
        <TabPane tab={<ActivityTab icon={<BsCreditCard />}>Avances de efectivo</ActivityTab>} key='2'>
          <div className={classes.Activity}>{cashAdvances}</div>
        </TabPane>
      </Tabs>
    </>
  );
};

const ActivityTab = (props) => (
  <p className={classes.ActivityTab}>
    <span className='mr-3'>{props.icon}</span>
    {props.children}
  </p>
);

export default Activity;
