import { useState, useEffect } from "react";
import { getProfile as fetchProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setProfile(null);
    navigate("/auth");
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // 🔹 перевірка токена
    if (!token) return; // якщо токена нема — не робимо запит

    const loadProfile = async () => {
      try {
        const res = await fetchProfile(); // повертає { user: {...} }
        setProfile(res.user); // беремо саме user
      } catch (err) {
        console.error("Failed to load profile", err);
        logout(); // якщо токен невалідний
      }
    };

    loadProfile();
  }, []);

  return { profile, setProfile, logout };
};