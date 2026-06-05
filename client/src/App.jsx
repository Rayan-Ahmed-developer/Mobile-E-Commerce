import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Kontext from "../Kontext";


function App() {
  return (
    <Kontext>
      <AppRoutes />
    </Kontext>
  );
}


export default App;
