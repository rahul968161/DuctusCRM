import React, { useEffect, useState } from "react";
import { Menu, Slider, Switch } from "antd";
import {
  HomeOutlined,
  ExceptionOutlined,
  CheckCircleFilled,
  PlusCircleFilled,
  UserOutlined,
  FileOutlined,
  UserDeleteOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import Avatar from "../Images/Avatar.png";
import Engineer from "../Images/Engineer.jpg";
import Admin from "../Images/Admn.jpg";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { SubMenu } = Menu;

const List = [
  {
    id: 1,
    name: "Home",
    Link: "/Products",
    icon: <HomeOutlined />,
    admin: true,
  },
  {
    id: 2,
    name: "Pending Request",
    Link: "/ComponentRequest/0",
    admin: true,
    icon: <ExceptionOutlined />,
  },
  {
    id: 3,
    name: "Approved",
    Link: "/ComponentRequest/1",
    admin: true,
    icon: <CheckCircleFilled />,
  },
  {
    id: 4,
    name: "Add Part",
    Link: "/AddProduct/New",
    admin: true,
    icon: <PlusCircleFilled />,
  },
  {
    id: 5,
    name: "Add User",
    Link: "/AddUser/New",
    admin: true,
    icon: <UserOutlined />,
  },
  {
    id: 6,
    name: "Add PO Request",
    Link: "/AddPORequest/New",
    admin: false,
    icon: <FileOutlined />,
  },
  {
    id: 7,
    name: "Request To Vendor",
    Link: "/GeneratePO",
    admin: true,
    icon: <UserDeleteOutlined />,
  },
  {
    id: 8,
    name: "Components",
    Link: "/Products",
    admin: false,
    icon: <UserDeleteOutlined />,
  },
  {
    id: 9,
    name: "Requested Component",
    Link: "/ComponentRequest",
    admin: false,
    icon: <UserDeleteOutlined />,
  },
  {
    id: 10,
    name: "Purchase Requests",
    Link: "/PORequest",
    admin: true,
    icon: <UserDeleteOutlined />,
  },
  {
    id: 11,
    name: "Users",
    Link: "/Users",
    admin: true,
    icon: <UserOutlined />,
  },
];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
    window,
  };
}

function SideBar({ collapsed, setCollapsed }) {
  const [current, setCurrent] = useState(1);
  const [currentUser, setCurrentUser] = useState(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 900px)" });

  const handleClick = (e) => {
    setCurrent(e.id);
  };
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const navigate = useNavigate();
  return (
    <div style={{ height: "100%" }}>
      <Menu
        theme={"dark"}
        style={{
          width: collapsed ? 50 : 260,
          height: collapsed
            ? `${getWindowDimensions().window.screen.availHeight}px`
            : "100%",
          position: "absolute",
          zIndex: "10",
          padding: "50px 0px",
          background: "#1E3FE4",
        }}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={collapsed}
        className="Sidebar"
        onClick={() => {
          if (!isMobileScreen) {
            setCollapsed(!collapsed);
          }
        }}
      >
        <Menu.Item className="AvatarSection">
          <img
            src={currentUser.UserType === "Engineer" ? Engineer : Admin}
            className={collapsed ? "collapsedImages" : "Image"}
          />
          {!collapsed && <p className="Text">{currentUser.UserType}</p>}
        </Menu.Item>
        {List.map((a) => {
          return currentUser.UserType === "Engineer" ? (
            !a.admin ? (
              <Menu.Item
                key={a.id}
                icon={a.icon}
                style={
                  current == a.id
                    ? {
                        background: "#191970",
                        borderRight: "8px solid #FF7C02",
                        boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.25)",
                      }
                    : false
                }
                onClick={() => {
                  handleClick(a);
                  navigate(a.Link);
                }}
                className="menuItem"
              >
                {a.name}
              </Menu.Item>
            ) : null
          ) : (
            a.admin && (
              <Menu.Item
                key={a.id}
                icon={a.icon}
                style={
                  current == a.id
                    ? {
                        background: "#191970",
                        borderRight: "8px solid #FF7C02",
                        boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.25)",
                      }
                    : false
                }
                onClick={() => {
                  handleClick(a);
                  navigate(a.Link);
                }}
                className="menuItem"
              >
                {a.name}
              </Menu.Item>
            )
          );
        })}
        {currentUser.UserType !== "Engineer" && (
          <SubMenu
            key="sub4"
            icon={<DatabaseOutlined />}
            title="Report"
            className="SubMenu menuItem"
          >
            <Menu.Item key="1" onClick={()=>navigate("/Report")}>Components</Menu.Item>
            <Menu.Item key="2" onClick={()=>navigate("/Report")}>Approved Requests</Menu.Item>
            <Menu.Item key="3" onClick={()=>navigate("/Report")}>Purchase Requests</Menu.Item>
          </SubMenu>
        )}
        <Menu.Item
          onClick={() => {
            localStorage.removeItem("Token");
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="menuItem"
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideBar;
