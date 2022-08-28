import "./index.scss";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [User, setUser] = useState({
    EmailAddress: "",
    UserName: "",
    Password: "",
    MobileNumber: "",
    AddedBy: localStorage.getItem("Token"),
    EmployeeId:"",
    ProgramName:""
  });

  useEffect(() => {
    if (id !== "New") {
      const bodyFormData = new FormData();
      bodyFormData.append("RequestType", "GetUserDetail");
      bodyFormData.append("RequestData", JSON.stringify({ UserId: id }));
      axios
        .post("https://theductus.com/", bodyFormData)
        .then((res) => {
          setUser(res?.data?.ResponseData);
        })
        .catch((err) => toast(err));
    }
  }, [id]);

  function Submit() {
    if (User.EmailAddress) {
      const bodyFormData = new FormData();
      bodyFormData.append(
        "RequestType",
        id !== "New" ? "UpdateUser" : "AddUser"
      );
      bodyFormData.append(
        "RequestData",
        id !== "New"
          ? JSON.stringify({
              ...User,
              UpdatedBy: localStorage.getItem("Token"),
              UserId: id,
            })
          : JSON.stringify(User)
      );
      axios
        .post("https://theductus.com/", bodyFormData)
        .then((res) => {
          toast(res?.data?.ResponseMessage);
          if (res.data && res.data.ResponseCode) {
            navigate("/Users");
          }
        })
        .catch((err) => toast(err));
    } else {
      toast("Please Fill All The Fields");
    }
  }

  return (
    <div className="AddUser">
      <div style={{ padding: "50px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            marginBottom: "20px",
          }}
        >
          <PlusOutlined
            style={{
              fontSize: "22px",
              color: "#000",
              padding: "10px",
              marginRight: "20px",
              fill: "#000",
            }}
          />
          <h2>Add User</h2>
        </div>
        <div>
          <Row gutter={[12, 12]}>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Employee Id</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                type={"text"}
                onChange={(e) =>
                  setUser({ ...User, EmployeeId: e.target.value })
                }
                value={User.EmployeeId}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Full Name</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                type={"email"}
                onChange={(e) =>
                  setUser({ ...User, EmailAddress: e.target.value })
                }
                value={User.EmailAddress}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Email</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) => setUser({ ...User, UserName: e.target.value })}
                value={User.UserName}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Password</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                type={"password"}
                onChange={(e) => setUser({ ...User, Password: e.target.value })}
                value={User.Password}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Mobile Number</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setUser({ ...User, MobileNumber: e.target.value })
                }
                value={User.MobileNumber}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Program Name</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                type={"text"}
                onChange={(e) =>
                  setUser({ ...User, ProgramName: e.target.value })
                }
                value={User.ProgramName}
              />
            </Col>
          </Row>
        </div>
        <div
          style={{
            padding: "50px",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="primary"
            danger
            onClick={() => Submit()}
            style={{
              padding: "0px 50px",
              fontSize: "15px",
              borderRadius: "10px",
              height: "40px",
              background: "#F57702",
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
