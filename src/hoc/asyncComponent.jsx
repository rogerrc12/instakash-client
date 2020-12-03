import React, { Suspense } from "react";

const asyncComponent = (Component) => {
  return (props) => (
    <Suspense fallback={<p>Cargando...</p>}>
      <Component {...props} />
    </Suspense>
  );
};

export default asyncComponent;
