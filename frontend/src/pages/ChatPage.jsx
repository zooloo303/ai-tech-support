import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chat from "../components/chat";

const ChatPage = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="content">
          <Chat />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ChatPage;
