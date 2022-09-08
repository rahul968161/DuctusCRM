import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Component/Header";
import SideBar from "./Component/Sidebar";
import Products from "./Pages/Products";
import AddProduct from "./Pages/Add Product";
import Users from "./Pages/Users";
import AddUser from "./Pages/Add User";
import Request from "./Pages/Request";
import Login from "./Pages/Login";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./Pages/SignUp";
import { useMediaQuery } from "react-responsive";
import PORequest from "./Pages/PO Request";
import AddPORequest from "./Pages/AddPORequest";
import AddComponentRequest from "./Pages/AddComponentRequest";
import ComponentRequest from "./Pages/Component Request";
import GeneratePO from "./Pages/Request Generator";

function Authenticated({ Component }) {
  const [collapsed, setCollapsed] = useState(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
      }}
    >
      <Row style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Col
          span={collapsed ? 2 : 4}
          xl={collapsed ? 2 : 4}
          lg={collapsed ? 4 : 6}
          md={collapsed ? 2 : 4}
          sm={!collapsed ? 16 : 0}
          xs={!collapsed ? 16 : 0}
        >
          <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Col>
        <Col
          span={collapsed ? 23 : 20}
          xl={collapsed ? 23 : 20}
          lg={collapsed ? 21 : 18}
          md={collapsed ? 23 : 20}
          sm={24}
          xs={24}
        >
          <div
            style={{
              background:
                isMobileScreen && !collapsed ? "rgb(54, 56, 54,0.2)" : "#fff",
              width: "100%",
              height: "100vh",
              zIndex: "9",
              display: isMobileScreen && !collapsed ? "block" : "none",
              position: "absolute",
            }}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div
            style={{
              width: collapsed ? "100%" : "98%",
              paddingLeft: collapsed ? "5%" : "0%",
              overflow: "hidden",
              height: "100vh",
            }}
          >
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
            <div style={{ height: "80%", overflow: "scroll" }}>
              <Component />
            </div>
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                background: "rgb(208 212 215)",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                height: "60px",
                fontSize: "18px",
                fontWeight: "600",
                color: "#8A8A8A",
              }}
            >
              Copyright©2021-{new Date().getFullYear()} Ductus.com
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function App() {
  const [Token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("Token"));
  }, []);
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route
          path="/Products"
          element={<Authenticated Component={Products} />}
        />
        <Route
          path="/AddProduct/:id"
          element={<Authenticated Component={AddProduct} />}
        />
        <Route path="/Users" element={<Authenticated Component={Users} />} />
        <Route
          path="/AddUser/:id"
          element={<Authenticated Component={AddUser} />}
        />
        <Route
          path="/RequestVendor"
          element={<Authenticated Component={Request} />}
        />
        <Route
          path="/PORequest/:Status"
          element={<Authenticated Component={PORequest} />}
        />
        <Route
          path="/AddPORequest/:id"
          element={<Authenticated Component={AddPORequest} />}
        />
        <Route
          path="/AddComponentRequest/:id"
          element={<Authenticated Component={AddComponentRequest} />}
        />
        <Route
          path="/ComponentRequest/:Status"
          element={<Authenticated Component={ComponentRequest} />}
        />
        <Route
          path="/ComponentRequest"
          element={<Authenticated Component={ComponentRequest} />}
        />
        <Route
          path="/GeneratePO"
          element={<Authenticated Component={GeneratePO} />}
        />
        <Route
          path="/Report"
          element={<Authenticated Component={() => <Products Report={true}/>} />}
        />
      </Routes>
    </>
  );
}

export default App;
