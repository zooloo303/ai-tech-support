import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
//Styles
import "../styles/Home.css";

const Shell = () => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Shell;
