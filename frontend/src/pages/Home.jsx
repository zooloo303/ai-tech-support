import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chat from "../components/chat";
//Styles
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <ThemeProvider>
        <Header className="header" />
        <div className="main-content">
          <Chat className="main" />
          {/* Add other main content components here */}
        </div>
        <Footer className="footer" />
      </ThemeProvider>
    </div>
  );
}

export default Home;
