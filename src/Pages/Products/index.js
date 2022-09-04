import TableComponent from "../../Component/Table";
import { Button, Modal, Input } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import { CSVLink } from "react-csv";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import AddComponentRequest from "../AddComponentRequest";
import CSVTOJSON from "./CSVTOJSON";

function Products(props) {


  


  const navigate = useNavigate();
  const [RequestComponent, setRequestComponent] = useState({
    model: false,
    id: "",
  });
  const [ProductData, setProductData] = useState();
  function GetAllProduct() {
    const bodyFormData = new FormData();
    bodyFormData.append("RequestType", "Products");
    axios
      .post("https://theductus.com/", bodyFormData)
      .then((res) => {
        const Products = [];
        for (let index = 0; index < res.data.ResponseData.length; index++) {
          const Pro = res?.data?.ResponseData[index];
          Pro.key = Pro?.ProductId;
          Products.push(Pro);
          if (index == res.data.ResponseData.length - 1) {
            setProductData(Products);
          }
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    GetAllProduct();
  }, []);

  const Columns = [
    {
      title: "Product Id",
      dataIndex: "ProductId",
      key: "ProductId",
    },
    {
      title: "Lot Number",
      dataIndex: "LotNumber",
      key: "LotNumber",
    },
    {
      title: "Part Number",
      dataIndex: "PartNumber",
      key: "PartNumber",
    },
    {
      title: "Package",
      dataIndex: "Pakage",
      key: "Pakage",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Program",
      dataIndex: "Program",
      key: "Program",
    },
    {
      title: "Requested Qty",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Product Description",
      dataIndex: "ProductDescription",
      key: "ProductDescription",
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
    },
    {
      title: "Action",
      key: "",
      render: (text, record) => {
        return (
          <div>
            {JSON.parse(localStorage.getItem("user")).UserType !== "Admin" ? (
              <Button
                onClick={() =>
                  setRequestComponent({
                    id: text?.ProductId,
                    model: !RequestComponent.RequestComponent,
                  })
                }
              >
                Add Quantity
              </Button>
            ) : (
              <>
                <EditOutlined
                  style={{ margin: "0px 5px" }}
                  onClick={() => navigate(`/AddProduct/${text?.ProductId}`)}
                />
                <DeleteOutlined
                  onClick={() => {
                    const bodyFormData = new FormData();
                    bodyFormData.append("RequestType", "DeleteProduct");
                    bodyFormData.append(
                      "RequestData",
                      JSON.stringify({
                        ProductId: text?.ProductId,
                        DeletedBy: localStorage.getItem("Token"),
                      })
                    );
                    axios
                      .post("https://theductus.com/", bodyFormData)
                      .then((res) => {
                        GetAllProduct();
                        toast(res?.data?.ResponseMessage);
                      })
                      .catch((err) => toast(err));
                  }}
                />
              </>
            )}{" "}
          </div>
        );
      },
    },
  ];


  const ProductColumns = [];
  for (let index = 0; index < ProductData?.length; index++) {
    const Pro = []; 
    Pro['ProductId'] = ProductData[index].ProductId;
    Pro['Location'] = ProductData[index].Location;
    Pro['ProductDescription'] = ProductData[index].ProductDescription;
    Pro['LotNumber'] = ProductData[index].LotNumber;
    Pro['PartNumber'] = ProductData[index].PartNumber;
    Pro['Package'] = ProductData[index].Pakage;
    Pro['Date'] = ProductData[index].Date;
    Pro['Program'] = ProductData[index].Program;
    Pro['Quantity'] = ProductData[index].Quantity;

    const obj = Object.assign({}, Pro);
    ProductColumns.push(obj);
     
  }


  const [filterTable, setFilterTable] = useState(null);

  const onSearch = (value) => {
    console.log(value);
      const filterData = ProductData.filter((o) => Object.keys(o).some((k) => String(o[k])
      .toLowerCase()
      .includes(value.toLowerCase())));
      setFilterTable(filterData);
  };

  
  

  return (
    <div className="Products" style={{ width: "100%" }}>
      <div style={{ padding: "50px" }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            marginBottom: "20px",
          }}
        >
          <ShareAltOutlined
            style={{
              fontSize: "22px",
              color: "#000",
              padding: "10px",
              border: "2px solid",
              borderRadius: "100%",
              marginRight: "20px",
              fill: "#000",
            }}
          />
          <h2 >{!props.Report ? "Component Table" : "Report"}</h2>
        </div>

        <Input.Search
        style={{ width: 'auto', float:'right', margin: '0 0 10px 0' }}
        placeholder="Search by..."
        enterButton
        onSearch={onSearch}
        />

        <TableComponent columns={Columns} data={(filterTable)?filterTable:ProductData}  />
        {!props.Report &&
          JSON.parse(localStorage.getItem("user")).UserType == "Admin" && (
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
                onClick={() => navigate("/AddProduct/New")}
                style={{
                  padding: "0px 50px",
                  fontSize: "15px",
                  borderRadius: "10px",
                  height: "40px",
                  background: "#F57702",
                  margin: "0px 20px",
                }}
              >
                Add
              </Button>
            </div>
          )}
        
        {props.Report &&
          JSON.parse(localStorage.getItem("user")).UserType == "Admin" && (
            <div
              style={{
                padding: "50px",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CSVLink
              filename={"products.csv"}
              data={ProductColumns}
              className="btn btn-primary"
            >
              <Button type="primary">Download CSV</Button>
              
            </CSVLink>
            </div>
          )}
      </div>
      <Modal
        centered
        visible={RequestComponent.model}
        onOk={() =>
          setRequestComponent({
            ...RequestComponent,
            model: !RequestComponent.model,
          })
        }
        onCancel={() =>
          setRequestComponent({
            ...RequestComponent,
            model: !RequestComponent.model,
          })
        }
        footer={null}
      >
        <AddComponentRequest ComponentId={RequestComponent.id} />
      </Modal>
    </div>
  );
}

export default Products;
