import "./index.scss";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CSVTOJSON from "../Products/CSVTOJSON";

function App() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Product, setProduct] = useState({
    ProductDescription: "",
    LotNumber: "",
    PartNumber: "",
    Package: "",
    Date: "",
    Program: "",
    Quantity: 0,
    Location:""
  });

  useEffect(() => {
    if (id !== "New") {
      const bodyFormData = new FormData();
      bodyFormData.append("RequestType", "GetProductDetail");
      bodyFormData.append("RequestData", JSON.stringify({ ProductId: id }));
      axios
        .post("https://theductus.com/", bodyFormData)
        .then((res) => {
          setProduct(res?.data?.ResponseData);
        })
        .catch((err) => toast(err));
    }
  }, [id]);

  function Submit() {
    if (Product.ProductDescription) {
      const bodyFormData = new FormData();
      bodyFormData.append(
        "RequestType",
        id !== "New" ? "UpdateProduct" : "AddProduct"
      );
      bodyFormData.append(
        "RequestData",
        id !== "New"
          ? JSON.stringify({
              ...Product,
              UpdatedBy: localStorage.getItem("Token"),
              ProductId: id,
            })
          : JSON.stringify(
               {
              ...Product,
              AddedBy: localStorage.getItem("Token"),
          })
      );
      axios
        .post("https://theductus.com/", bodyFormData)
        .then((res) => {
          toast(res?.data?.ResponseMessage);
          if (res.data && res.data.ResponseCode) {
            navigate("/Products");
          }
        })
        .catch((err) => toast(err));
    } else {
      toast("Please Fill All The Fields");
    }
  }

  return (
    <div className="AddProduct">
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
          <h2>Add Part</h2>
        </div>
        <div>
          <Row gutter={[12, 12]}>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Lot No</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setProduct({ ...Product, LotNumber: e.target.value })
                }
                value={Product.LotNumber}
              />
            </Col>
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
                  setProduct({ ...Product, Date: e.target.value })
                }
                value={Product.Date}
              />
            </Col>
            
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Program</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                type="text"
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setProduct({ ...Product, Program: e.target.value })
                }
                value={Product.Program}
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
                  setProduct({ ...Product, PartNumber: e.target.value })
                }
                value={Product.PartNumber}
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
                  setProduct({ ...Product, Package: e.target.value })
                }
                value={Product.Package}
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
                  setProduct({ ...Product, Quantity: e.target.value })
                }
                value={Product.Quantity}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <h3>Location</h3>
              <Input
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#EDEFF1",
                }}
                className="SearchField"
                size="large"
                onChange={(e) =>
                  setProduct({ ...Product, Location: e.target.value })
                }
                value={Product.Location}
              />
            </Col>

            
          </Row>

          <Row>
            <Col span={24}>
              <h3>Description</h3>
              <TextArea
                style={{ borderRadius: "10px", backgroundColor: "#EDEFF1" }}
                autoSize={{ minRows: 3, maxRows: 5 }}
                onChange={(e) =>
                  setProduct({ ...Product, ProductDescription: e.target.value })
                }
                value={Product.ProductDescription}
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
          <CSVTOJSON />
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
