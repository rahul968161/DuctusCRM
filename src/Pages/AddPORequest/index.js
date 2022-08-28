import "./index.scss";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddPORequest() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [PORequest, setPORequest] = useState({
    PartDescription: "",
    PartNumber: "",
    Pakage: "",
    Program: "",
    Quantity: 0,
    AddedBy: localStorage.getItem("Token"),
  });

  useEffect(() => {
    if (id !== "New") {
      const bodyFormData = new FormData();
      bodyFormData.append("RequestType", "GetPORequestDetail");
      bodyFormData.append("RequestData", JSON.stringify({ PORequestId: id }));
      axios
        .post("https://theductus.com/", bodyFormData)
        .then((res) => {
          setPORequest(res?.data?.ResponseData);
        })
        .catch((err) => toast(err));
    }
  }, [id]);

  function Submit() {
    if (PORequest.PartDescription) {
      const bodyFormData = new FormData();
      bodyFormData.append(
        "RequestType",
        id !== "New" ? "UpdatePORequest" : "AddPORequest"
      );
      bodyFormData.append(
        "RequestData",
        id !== "New"
          ? JSON.stringify({
              ...PORequest,
              UpdatedBy: localStorage.getItem("Token"),
              PORequestId: id,
            })
          : JSON.stringify(PORequest)
      );
      axios
        .post("https://theductus.com/", bodyFormData)
        .then((res) => {
          toast(res?.data?.ResponseMessage);
          if (JSON.parse(localStorage.getItem("user")).UserType == "Admin") {
            if (res.data && res.data.ResponseCode) {
              navigate("/PORequest");
            }
          } else {
            setPORequest({
              PartDescription: "",
              PartNumber: "",
              Pakage: "",
              Program: "",
              Quantity: 0,
              AddedBy: localStorage.getItem("Token"),
            });
          }
        })
        .catch((err) => toast(err));
    } else {
      toast("Please Fill All The Fields");
    }
  }

  return (
    <div className="AddPORequest">
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
          <h2>Add PO Request</h2>
        </div>
        <div>
          <Row gutter={[12, 12]}>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Date</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                type="date"
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setPORequest({ ...PORequest, date: e.target.value })
                }
                value={PORequest.date}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Part Number</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setPORequest({ ...PORequest, PartNumber: e.target.value })
                }
                value={PORequest.PartNumber}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Package</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setPORequest({ ...PORequest, Pakage: e.target.value })
                }
                value={PORequest.Pakage}
              />
            </Col>

            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
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
                  setPORequest({ ...PORequest, Quantity: e.target.value })
                }
                value={PORequest.Quantity}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>New Program</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setPORequest({ ...PORequest, Program: e.target.value })
                }
                value={PORequest.Program}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <h3>Part Description</h3>
              <TextArea
                style={{ borderRadius: "10px", backgroundColor: "#EDEFF1" }}
                autoSize={{ minRows: 3, maxRows: 5 }}
                onChange={(e) =>
                  setPORequest({
                    ...PORequest,
                    PartDescription: e.target.value,
                  })
                }
                value={PORequest.PartDescription}
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

export default AddPORequest;
