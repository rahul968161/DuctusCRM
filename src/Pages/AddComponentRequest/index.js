import "./index.scss";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddComponentRequest({ ComponentId }) {
  const navigate = useNavigate();

  const [ComponentRequest, setComponentRequest] = useState({
    ComponentId: "",
    Program: "",
    Quantity: 0,
    AddedBy: localStorage.getItem("Token"),
  });

  useEffect(() => {
    setComponentRequest({ ...ComponentRequest, ComponentId })
  }, [ComponentId])

  function Submit() {
    if (ComponentRequest.ComponentId) {
      const bodyFormData = new FormData();
      bodyFormData.append(
        "RequestType",
        "AddRequestComponent"
      );
      bodyFormData.append(
        "RequestData",
        JSON.stringify(ComponentRequest)
      );
      axios
        .post("https://theductus.com/", bodyFormData)
        .then((res) => {
          toast(res?.data?.ResponseMessage);
          if (res.data && res.data.ResponseCode) {
            navigate("/ComponentRequest");
          }
        })
        .catch((err) => toast(err));
    } else {
      toast("Please Fill All The Fields");
    }
  }

  return (
    <div className="AddComponentRequest">
      <div>
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
          <h2>Add Component Request</h2>
        </div>
        <div>
          <Row gutter={[12, 12]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <h3>Program</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setComponentRequest({ ...ComponentRequest, Program: e.target.value })
                }
                value={ComponentRequest.Program}
              />
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <h3>Component Id</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setComponentRequest({ ...ComponentRequest, ComponentId: e.target.value })
                }
                value={ComponentRequest.ComponentId}
              />
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <h3>Add Qty</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setComponentRequest({ ...ComponentRequest, Quantity: e.target.value })
                }
                value={ComponentRequest.Quantity}
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

export default AddComponentRequest;
