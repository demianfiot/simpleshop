import React from "react";
import styled, { keyframes } from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  const { profile, logout } = useProfile();
  const { isDark, toggleTheme } = useTheme();

  return (
    <StyledHeader>
      <Logo>Simpleshop</Logo>

      <RightSection>
        <ThemeToggle onClick={toggleTheme} title={isDark ? "Light mode" : "Dark mode"}>
          <IconWrapper key={isDark ? "dark" : "light"}>
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </IconWrapper>
        </ThemeToggle>

        {profile ? (
          <ProfileSection>
            {profile.avatar ? (
              <Avatar src={profile.avatar} alt="Avatar" />
            ) : (
              <CiUser size={24} />
            )}
            <Info>
              <Name>{profile.name}</Name>
              <Email>{profile.email}</Email>
            </Info>
            <LogoutBtn onClick={logout}>Logout</LogoutBtn>
          </ProfileSection>
        ) : (
          <Link to="/auth">
            <LoginBtn>Login</LoginBtn>
          </Link>
        )}
      </RightSection>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: ${({ theme }) => theme.colors.headerBg};
  color: ${({ theme }) => theme.colors.headerText};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 1000;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.headerText};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  animation: ${rotate} 0.4s ease;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const Email = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BaseBtn = styled.button`
  padding: 7px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const LogoutBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.danger};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.dangerHover};
  }
`;

const LoginBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.success};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.successHover};
  }
`;
