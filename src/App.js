import React from "react";
import Search from "./feature/Search";
import APIContextProvider from "./context/api";

function App() {
  return (
    <div>
      <APIContextProvider>
        <Search />
      </APIContextProvider>
    </div>
  );
}

export default App;
