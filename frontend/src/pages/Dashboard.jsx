import { useEffect, useState } from "react";
import API_BASE from "../config/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${API_BASE}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: "#fff" }}>Loading dashboard...</div>;
  }

  if (!user) {
    return <div style={{ color: "#fff" }}>Authentication failed</div>;
  }

  return (
    <div style={{ color: "#fff" }}>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
}
