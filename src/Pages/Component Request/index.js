import TableComponent from "../../Component/Table";
import { Button } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Tag } from "antd";
import { CSVLink } from "react-csv";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function ComponentRequest() {
  const navigate = useNavigate();
  const { Status } = useParams();
  const [RequestData, setRequestData] = useState();
  function GetAllRequest() {
    const bodyFormData = new FormData();
    bodyFormData.append("RequestType", "RequestComponents");
    bodyFormData.append(
      "RequestData",
      JSON.stringify({ UserId: localStorage.getItem("Token"), Status: Status })
    );
    axios
      .post("https://theductus.com/", bodyFormData)
      .then((res) => {
        const ComponentRequest = [];
        for (let index = 0; index < res.data.ResponseData.length; index++) {
          const Pro = res?.data?.ResponseData[index];
          Pro.key = Pro?.Id;
          if (Status) {
            if (Pro.Status == Status) {
              ComponentRequest.push(Pro);
            }
          } else {
            ComponentRequest.push(Pro);
          }
          if (index == res.data.ResponseData.length - 1) {
            setRequestData(ComponentRequest);
          }
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    GetAllRequest();
  }, [Status]);




  const ComponentColumns = [];
  for (let index = 0; index < RequestData?.length; index++) {
    const Pro = []; 
    Pro['Id'] = RequestData[index].Id;
    Pro['PartNumber'] = RequestData[index].PartNumber;
    Pro['Pakage'] = RequestData[index].Pakage; 
    Pro['PartDescription'] = RequestData[index].PartDescription; 
    Pro['Date'] = RequestData[index].Date;
    Pro['Program'] = RequestData[index].Program;
    Pro['Quantity'] = RequestData[index].Quantity; 
    Pro['Name'] = RequestData[index].FullName;
    Pro['AddedOn'] = RequestData[index].AddedOn;
    Pro['Status'] = RequestData[index].Status; 

    const obj = Object.assign({}, Pro);
    ComponentColumns.push(obj);
     
  }


  console.log(ComponentColumns);

  const Columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Part Number",
      dataIndex: "PartNumber",
      key: "PartNumber",
    },
    {
      title: "Pakage",
      dataIndex: "Pakage",
      key: "Pakage",
    },
    {
      title: "Date",
      dataIndex: "Program",
      key: "Program",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Part Description",
      dataIndex: "PartDescription",
      key: "PartDescription",
    },
    {
      title: "Name",
      dataIndex: "FullName",
      key: "Name",
    },
    {
      title: "Added On",
      dataIndex: "AddedOn",
      key: "AddedOn",
      render: (e) => (
        <>
          <Tag color={"#000"} key={e} className="Tag">
            {e.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "",
      render: (text, record) => {
        console.log(JSON.parse(localStorage.getItem("user")));
        if (JSON.parse(localStorage.getItem("user")).UserType == "Admin") {
          return (
            <div>
              {Status !== "1" && (
                <Button
                  onClick={() => {
                    const bodyFormData = new FormData();
                    bodyFormData.append(
                      "RequestType",
                      "ApproveRequestComponent"
                    );
                    bodyFormData.append(
                      "RequestData",
                      JSON.stringify({
                        RequestComponentId: text?.Id,
                        UserId: localStorage.getItem("Token"),
                      })
                    );
                    axios
                      .post("https://theductus.com/", bodyFormData)
                      .then((res) => {
                        GetAllRequest();
                        toast(res?.data?.ResponseMessage);
                      })
                      .catch((err) => toast(err));
                  }}
                  className="Tag"
                  style={{
                    background: "#286609",
                    margin: "0px 5px",
                  }}
                >
                  Approve
                </Button>)
              }

              {Status !== "1" && (
              <Button
                onClick={() => {
                  const bodyFormData = new FormData();
                  bodyFormData.append("RequestType", "RejectRequestComponent");
                  bodyFormData.append(
                    "RequestData",
                    JSON.stringify({
                      RequestComponentId: text?.Id,
                      UserId: localStorage.getItem("Token"),
                    })
                  );
                  axios
                    .post("https://theductus.com/", bodyFormData)
                    .then((res) => {
                      GetAllRequest();
                      toast(res?.data?.ResponseMessage);
                    })
                    .catch((err) => toast(err));
                }}
                className="Tag"
                style={{
                  background: "rgb(157 21 21)",
                  margin: "0px 5px",
                }}
              >
                Reject
              </Button>)
            }


              {Status == "1" && (
              <Button
                className="Tag" disabled="disabled"
                style={{
                  background: "#286609",
                  margin: "0px 5px",
                  color:'#fff',
                }}
              >
                Approved
              </Button>)
            }
            </div>
          );
        } else {
          return (
            <div
              style={{
                color:
                  record.Status === "1"
                    ? "green"
                    : record.Status === "2"
                    ? "red"
                    : "black",
              }}
            >
              {record.Status === "0"
                ? "Only Allowed To Admin"
                : record.Status === "1"
                ? "Approved"
                : "Rejected"}
            </div>
          );
        }



      },




    },
  ];


  

  return (
    <div className="ComponentRequest" style={{ width: "100%" }}>
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
          <h2>
            {JSON.parse(localStorage.getItem("user")).UserType == "Admin"
              ? "Component Request"
              : "Component Request Table"}
          </h2>
        </div>
        <TableComponent columns={Columns} data={RequestData} />
        {JSON.parse(localStorage.getItem("user")).UserType !== "Admin" && (
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
              onClick={() => navigate("/AddComponentRequest/New")}
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
        )}


          {Status == "1" && 
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
              filename={"component-requests.csv"}
              data={ComponentColumns}
              className="btn btn-primary">
              <Button type="primary">Download CSV</Button>
              
            </CSVLink>
            </div>
          )}
      </div>
    </div>
  );
}

export default ComponentRequest;
