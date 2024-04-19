import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Clicks from "../components/Clicks";
function ClicksPage() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="content">
          <Clicks />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default ClicksPage;
