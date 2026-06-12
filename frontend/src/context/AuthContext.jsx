import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("astrocrm_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  async function login(email, password) {
    setLoading(true);
    try {
      const data = await api("/auth/login", { method: "POST", body: { email, password } });
      localStorage.setItem("astrocrm_token", data.token);
      localStorage.setItem("astrocrm_user", JSON.stringify(data.user));
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("astrocrm_token");
    localStorage.removeItem("astrocrm_user");
    setUser(null);
  }

  useEffect(() => {
    if (!localStorage.getItem("astrocrm_token")) return;
    api("/auth/me").catch(logout);
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
