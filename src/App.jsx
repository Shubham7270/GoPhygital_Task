import { useState } from "react";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // ── Route logic ──────────────────────────────────────────
  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  if (currentUser.userType === "admin") {
    return (
      <AdminDashboard
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
      />
    );
  }

  return (
    <StudentDashboard
      user={currentUser}
      onLogout={() => setCurrentUser(null)}
    />
  );
}
