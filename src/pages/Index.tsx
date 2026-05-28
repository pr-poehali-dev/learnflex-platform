import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import TeamPage from "@/pages/TeamPage";
import ContactPage from "@/pages/ContactPage";
import DashboardPage from "@/pages/DashboardPage";

type Page = "home" | "courses" | "team" | "contact" | "dashboard";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [darkMode, setDarkMode] = useState(true);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDashboard = currentPage === "dashboard";

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-black text-white">
        {!isDashboard && (
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(!darkMode)}
          />
        )}
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "courses" && <CoursesPage onNavigate={handleNavigate} />}
        {currentPage === "team" && <TeamPage onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "dashboard" && <DashboardPage onNavigate={handleNavigate} />}
      </div>
    </div>
  );
};

export default Index;