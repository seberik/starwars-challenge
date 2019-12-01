import React from "react";
import loader from "../../loader.svg";
import ListItem from "../ListItem";

const ContentLoader = () => {
  return (
    <ListItem>
      <img src={loader} alt="loading"></img>
    </ListItem>
  );
};

export default ContentLoader;
