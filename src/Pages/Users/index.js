import TableComponent from '../../Component/Table';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';

function Users() {
  const navigate = useNavigate();

  const [UserData, setUserData] = useState()
  function GetAllUser() {
    const bodyFormData = new FormData();
    bodyFormData.append('RequestType', "Users");
    axios.post("https://theductus.com/", bodyFormData).then((res) => {
      const Users = []
      for (let index = 0; index < res.data.ResponseData.length; index++) {
        const Use = res?.data?.ResponseData[index];
        Use.key = Use?.UserId
        Users.push(Use)
        if (index == res.data.ResponseData.length - 1) {
          setUserData(Users)
        }
      }
 
    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    GetAllUser()
  }, [])

  const Columns = [
    {
      title: 'User Id',
      dataIndex: 'UserId',
      key: 'UserId',
    },
    {
      title: 'Email Address',
      dataIndex: 'EmailAddress',
      key: 'EmailAddress',
    },
    {
      title: 'Full Name',
      dataIndex: 'FullName',
      key: 'FullName',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'MobileNumber',
      key: 'MobileNumber',
    }, {
      title: 'Emp ID',
      dataIndex: 'UserCode',
      key: 'UserCode',
    }, {
      title: 'User Type',
      dataIndex: 'UserType',
      key: 'UserType',
    },
    {
      title: 'Added On',
      dataIndex: 'AddedOn',
      key: 'AddedOn',
      render: (e) => (
        <>
          <Tag color={"#000"} key={e} className="Tag">
            {e?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: '',
      render: (text, record) => {
        return (
          <div>
            <EditOutlined style={{ margin: "0px 5px" }} onClick={() => navigate(`/AddUser/${text?.UserId}`)} />
            <DeleteOutlined onClick={() => {
              const bodyFormData = new FormData();
              bodyFormData.append('RequestType', "DeleteUser");
              bodyFormData.append('RequestData', JSON.stringify({ "UserId": text?.UserId, "DeletedBy": localStorage.getItem("Token") }));
              axios.post("https://theductus.com/", bodyFormData).then((res) => {
                GetAllUser()
                toast(res?.data?.ResponseMessage)
              }).catch((err) => toast(err))
            }} />
          </div>
        )
      },
    },
  ];

  return (
    <div className='Users' style={{ width: "100%" }}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center", marginBottom: "20px" }}>
          <ShareAltOutlined style={{ fontSize: '22px', color: "#000", padding: "10px", border: "2px solid", borderRadius: "100%", marginRight: "20px", fill: "#000" }} />
          <h2>User Table</h2>
        </div>
        <TableComponent columns={Columns} data={UserData} />
        <div style={{ padding: "50px", display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
          <Button type="primary" danger onClick={() => navigate("/AddUser/New")} style={{ padding: "0px 50px", fontSize: "15px", borderRadius: "10px", height: "40px", background: "#F57702" }}>Add</Button>
        </div>
      </div>
    </div>
  );
}

export default Users;
