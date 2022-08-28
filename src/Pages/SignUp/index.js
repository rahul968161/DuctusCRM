import { Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Images/Logo.png";
import "./index.scss";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserName, setUserName] = useState("");
  function SubmitSignUp() {
    const bodyFormData = new FormData();
    bodyFormData.append("RequestType", "SignUp");
    bodyFormData.append(
      "RequestData",
      JSON.stringify({ Email, Password, UserName })
    );
    axios({
      method: "post",
      url: "https://theductus.com/",
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`,
      },
    })
      .then((res) => {
        toast(res?.data?.ResponseMessage);
        if (res.data && res.data.ResponseCode) {
          localStorage.setItem("Token", res?.data?.ResponseData?.UserId);
          navigate("/Products");
        }
      })
      .catch((err) => toast(err));
  }
  return (
    <div className="SignUp">
      <div>
        <img src={Logo} style={{ margin: "20px 80px" }} />
      </div>
      <div className="Main">
        <div className="Card">
          <h1 className="Heading">SignUp</h1>
          <Input
            style={{
              width: "390px",
              height: "60px",
              marginBottom: "42px",
              borderRadius: "5px",
              backgroundColor: "#EDEFF1",
            }}
            placeholder="User Email"
            size="large"
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          />
          <Input
            style={{
              width: "390px",
              height: "60px",
              marginBottom: "42px",
              borderRadius: "5px",
              backgroundColor: "#EDEFF1",
            }}
            placeholder="User Name"
            size="large"
            onChange={(e) => setUserName(e.target.value)}
            value={UserName}
          />
          <Input
            style={{
              width: "390px",
              height: "60px",
              marginBottom: "75px",
              borderRadius: "5px",
              backgroundColor: "#EDEFF1",
            }}
            type="password"
            placeholder="Password"
            size="large"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
          />
          <Button
            type="primary"
            danger
            onClick={() => {
              SubmitSignUp();
            }}
            style={{
              padding: "0px 50px",
              fontSize: "18px",
              textAlign: "center",
              fontWeight: 600,
              borderRadius: "5px",
              height: "60px",
              background: "#F57702",
              width: "90%",
              marginBottom: "20px",
            }}
          >
            Submit
          </Button>
          <h4 className="Text">
            Do you have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
