import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyNotes from "../components/MyNotes";
function NotesPage() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="content">
          <MyNotes />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default NotesPage;
