import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chat from "../components/chat";
import Profile from "../components/Profile";
import MyNotes from "../components/MyNotes";
import Clicks from "../components/Clicks";
//Styles
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <ThemeProvider>
        <Header className="header" />
        <div className="main-content">
          {/* <Chat className="main" /> */}
          {/* <Profile className="main" /> */}
          {/* <MyNotes className="main" /> */}
          <Clicks className="main" />
        </div>
        <Footer className="footer" />
      </ThemeProvider>
    </div>
  );
}

export default Home;
