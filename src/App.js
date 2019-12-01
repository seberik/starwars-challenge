import React from "react";
import Search from "./feature/Search";
import APIContextProvider from "./context/api";

function App() {
  return (
    <APIContextProvider>
      <Search />
    </APIContextProvider>
  );
}

export default App;
