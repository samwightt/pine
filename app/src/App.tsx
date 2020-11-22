import React, { useState, useEffect, Suspense } from "react";
import "./config/tailwind.css";

import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "./config/RelayEnvironment";

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Hello world!</h1>
        </div>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default App;
