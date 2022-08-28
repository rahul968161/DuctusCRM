import { Table, Tag, Space } from 'antd';
import "./style.scss"
import { MoreOutlined } from '@ant-design/icons'


function TableComponent({  columns, data, pagination }) {

  return (
    <div style={{width:"99%",height:"50vh",overflow:"auto"}}>
      <Table columns={columns} dataSource={data} className="Table" pagination={pagination ? true : false}  />
    </div>
  )
}

export default TableComponent