import React from "react";
import styled from "styled-components";
import { useProfile } from "./hooks/useProfile";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  const { profile, logout } = useProfile();

  return (
    <StyledHeader>
      <h1>Demian ba3ar</h1>

      {profile ? (
        <div className="profile">
          {profile.avatar ? (
            <img
              className="avatar"
              src={profile.avatar}
              alt="Avatar"
            />
          ) : (
            <CiUser className="avatar-icon" />
          )}

          <div className="info">
            <span className="name">{profile.name}</span>
            <span className="email">{profile.email}</span>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
      <Link to="/auth">
          <button className="login-btn">Login</button>
      </Link>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #111;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between; /* h1 зліва, профіль справа */
  padding: 0 30px;
  font-size: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  z-index: 1000;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #fff;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-icon {
      width: 40px;
      height: 40px;
      color: #eee;
    }

    .info {
      display: flex;
      flex-direction: column;
      text-align: left;

      .name {
        font-weight: bold;
        color: #eee;
      }

      .email {
        font-size: 0.85rem;
        color: #ccc;
      }
    }

    .logout-btn {
      margin-left: 12px;
      padding: 6px 12px;
      border: none;
      border-radius: 8px;
      background-color: #ef4444;
      color: white;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        background-color: #dc2626;
      }
    }
  }
    .login-btn {
      margin-left: 12px;
      padding: 6px 12px;
      border: none;
      border-radius: 8px;
      background-color: #10b981;
      color: white;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        background-color: #059669;
      }
    }
`;
