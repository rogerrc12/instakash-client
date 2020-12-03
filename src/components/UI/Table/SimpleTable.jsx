import React from "react";
import PropTypes from "prop-types";
import { Table, Spin, Empty } from "antd";

const SimpleTable = (props) => {
  return (
    <Table
      locale={{ emptyText: <Empty description={props.isLoading ? "Cargando datos" : "No hay datos para mostrar"} /> }}
      loading={{ spinning: props.isLoading, indicator: <Spin size='large' /> }}
      columns={props.columns}
      dataSource={props.data}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => props.click(record.key, props.type),
        };
      }}
      pagination={{
        pageSize: 5,
        defaultCurrent: 1,
      }}
    />
  );
};

SimpleTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default SimpleTable;
