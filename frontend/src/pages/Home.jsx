import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Timeline from "../components/Timeline";
//Styles
import "../styles/Home.css";

const Home = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="content">
          <Timeline />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Home;
