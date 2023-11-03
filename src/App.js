import React, { useMemo } from "react";
import "./App.css";
import styled from "styled-components";
import bg from "./img/bg.png";
import avatar from "./img/avatar.png";
import { menuItems } from "./utils/menuItems";
import { signout } from "./utils/Icons";
import { MainLayout, InnerLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Incomes from "./components/Incomes/Incomes";
import ViewTransaction from "./components/ViewTransaction/ViewTransaction";
import Expenses from "./components/Expenses/Expenses";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  const [active, setActive] = useState(1);
  const orbMemo = useMemo(() => {
    return <Orb />;
  });

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <ViewTransaction />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <>
          <NavStyled>
            <div className="user-con">
              <img src={avatar} alt="" srcset="" />
              <div className="text">
                <h2 className="font-semibold text-2xl ">Ifeanyi Ifemi </h2>
                <p className="text-md">N450,000</p>
              </div>
            </div>

            <ul className="menu-items">
              {menuItems.map((menuItem) => {
                return (
                  <li
                    key={menuItem.id}
                    onClick={() => setActive(menuItem.id)}
                    className={active === menuItem.id ? "active" : ""}
                  >
                    {menuItem.icon} <span>{menuItem.title}</span>
                  </li>
                );
              })}
            </ul>

            <div className="bottom-nav">
              <li>{signout} Sign Out</li>
            </div>
          </NavStyled>
        </>
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default App;
