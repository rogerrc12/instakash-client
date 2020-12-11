import React, { Suspense } from "react";

const asyncComponent = (Component, connection) => {
  return (props) => {
    return (
      <Suspense fallback={<p>Cargando...</p>}>
        <Component {...props} connection={connection} />
      </Suspense>
    );
  };
};

export default asyncComponent;
