import React from "react";
import { Tabs } from "antd";
import AccountList from "./AccountFormList";

const { TabPane } = Tabs;

const AccountTabs = (props) => {
  const { personalAccounts, thirdAccounts } = props.accounts;

  return (
    <Tabs defaultActiveKey='1' centered className='activity-tabs'>
      <TabPane tab='Cuentas propias' key='1'>
        <AccountList accounts={personalAccounts} third={false} currencyToReceive={props.currencyToReceive} setModal={props.setModal} />
      </TabPane>

      <TabPane tab='A terceros' key='2'>
        <AccountList accounts={thirdAccounts} third={true} currencyToReceive={props.currencyToReceive} setModal={props.setModal} />
      </TabPane>
    </Tabs>
  );
};

export default React.memo(AccountTabs);
