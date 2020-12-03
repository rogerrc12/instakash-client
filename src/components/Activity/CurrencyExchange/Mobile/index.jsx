import React from "react";
import MobileCard from "./MobileCard";
import { List } from "antd";

const perPage = 6;

const CurrencyExhcangeMobile = (props) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ["7", "25"],
        pageSize: perPage,
      }}
      renderItem={(item) => <MobileCard key={item.id} open={props.open} {...item} type="exchange" />}
    ></List>
  );
};

export default CurrencyExhcangeMobile;
