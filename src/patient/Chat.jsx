import React from "react";
import NavBar from "./components/NavBar";
import Chatcomponent from "./components/Chatcomponent";

function Chat({is_doc}) {
  return (
    <>
      <NavBar />
      <Chatcomponent/>
    </>
  );
}

export default Chat;
