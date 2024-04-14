import { useState, useEffect } from "react";
import "@picocss/pico";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chat from "../components/chat";
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <Header />
      <Chat />
      <Footer />
    </div>
  );
}

export default Home;
