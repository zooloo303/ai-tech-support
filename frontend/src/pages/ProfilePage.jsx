import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
function ProfilePage() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="content">
          <Profile />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default ProfilePage;
