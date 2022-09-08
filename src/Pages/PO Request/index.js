import TableComponent from '../../Component/Table';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Tag } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';

function PORequest() {
  const navigate = useNavigate();
  const { Status } = useParams();
  const [RequestData, setRequestData] = useState()
  function GetAllRequest() {
    const bodyFormData = new FormData();
    bodyFormData.append('RequestType', "PORequests");
    if (JSON.parse(localStorage.getItem("user")).UserType !== "Admin") {
      bodyFormData.append("RequestData", JSON.stringify({ UserId: localStorage.getItem("Token") }));
    }
    bodyFormData.append("RequestData", JSON.stringify({ Status: Status }));
    axios.post("https://theductus.com/", bodyFormData).then((res) => {
      console.log(res?.data?.ResponseData, "res?.data?.ResponseData")
      const PORequest = []
      for (let index = 0; index < res.data.ResponseData.length; index++) {
        const Pro = res?.data?.ResponseData[index];
        Pro.key = Pro?.Id
        PORequest.push(Pro)
        if (index == res.data.ResponseData.length - 1) {
          setRequestData(PORequest)
        }
      }
    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    GetAllRequest()
  }, [Status])

  const Columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'PartNumber',
      dataIndex: 'PartNumber',
      key: 'PartNumber',
    },
    {
      title: 'Pakage',
      dataIndex: 'Pakage',
      key: 'Pakage',
    }, {
      title: 'Date',
      dataIndex: 'Program',
      key: 'Program',
    }, {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    }, {
      title: 'PartDescription',
      dataIndex: 'PartDescription',
      key: 'PartDescription',
    },
    {
      title: 'AddedOn',
      dataIndex: 'AddedOn',
      key: 'AddedOn',
      render: (e) => (
        <>
          <Tag color={"#000"} key={e} className="Tag">
            {e.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: '',
      render: (text, record) => {
        if (Status == "0" && JSON.parse(localStorage.getItem("user")).UserType == "Admin") {
          return (
            <div>
              <Button onClick={() => {
                const bodyFormData = new FormData();
                bodyFormData.append('RequestType', "ApprovePORequest");
                bodyFormData.append('RequestData', JSON.stringify({ "PORequestId": text?.Id, "UserId": localStorage.getItem("Token") }));
                axios.post("https://theductus.com/", bodyFormData).then((res) => {
                  GetAllRequest()
                  toast(res?.data?.ResponseMessage)
                }).catch((err) => toast(err))
              }}
                className="Tag"
                style={{
                  background: "#286609",
                  margin: "0px 5px"
                }}
              >
                Approve
              </Button>
              <Button onClick={() => {
                const bodyFormData = new FormData();
                bodyFormData.append('RequestType', "RejectPORequest");
                bodyFormData.append('RequestData', JSON.stringify({ "PORequestId": text?.Id, "UserId": localStorage.getItem("Token") }));
                axios.post("http://dev.ductus.test/", bodyFormData).then((res) => {
                  GetAllRequest()
                  toast(res?.data?.ResponseMessage)
                }).catch((err) => toast(err))
              }}
                className="Tag"
                style={{
                  background: "rgb(157 21 21)",
                  margin: "0px 5px"
                }}
              >
                Reject
              </Button>
            </div>
          )
        } 
        if (Status == "1" && JSON.parse(localStorage.getItem("user")).UserType == "Admin") {
          return (
            <div>
              <Button className="Tag" disabled="disabled"
                style={{
                  background: "#286609",
                  margin: "0px 5px",
                  color:'#fff',
                }}
              >
                Approved
              </Button>
              
            </div>
          )
        }
        else {
          return <div>Only Allowed To Admin</div>
        }
      },
    },
  ];

  return (
    <div className='PORequest' style={{ width: "100%" }}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center", marginBottom: "20px" }}>
          <ShareAltOutlined style={{ fontSize: '22px', color: "#000", padding: "10px", border: "2px solid", borderRadius: "100%", marginRight: "20px", fill: "#000" }} />
          <h2>Purchase Request</h2>
        </div>
        <TableComponent columns={Columns} data={RequestData} />
        {JSON.parse(localStorage.getItem("user")).UserType !== "Admin" &&
          <div style={{ padding: "50px", display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
            <Button type="primary" danger onClick={() => navigate("/AddPORequest/New")} style={{ padding: "0px 50px", fontSize: "15px", borderRadius: "10px", height: "40px", background: "#F57702" }}>Add</Button>
          </div>
        }
      </div>
    </div>
  );
}

export default PORequest;
