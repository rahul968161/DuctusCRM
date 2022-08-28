import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import Item from "antd/lib/list/Item";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (Edit) => {
    try {
      const values = await form.validateFields();
      if (Edit) {
        toggleEdit();
      }
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={() => save(true)}
          onChange={() => save()}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "S#",
        dataIndex: "key",
        key: "key",
        colSpan: 1,
        width: "12.5%",
      },
      {
        title: "Product Description",
        dataIndex: "Description",
        key: "Description",
        editable: true,
        colSpan: 1,
        width: "25%",
      },
      {
        title: "Package",
        dataIndex: "Package",
        key: "Package",
        editable: true,
        colSpan: 1,
        width: "8.5%",
      },
      {
        title: "HSN/SAC",
        dataIndex: "HSN_SAC",
        key: "HSN_SAC",
        editable: true,
        colSpan: 1,
        width: "8.5%",
      },
      {
        title: "QTY",
        dataIndex: "QTY",
        key: "QTY",
        editable: true,
        colSpan: 1,
        width: "8%",
      },
      {
        title: "RATE",
        dataIndex: "RATE",
        key: "RATE",
        editable: true,
        colSpan: 1,
        width: "12.5%",
      },
      {
        title: "Amount (INR)",
        dataIndex: "Amount",
        key: "Amount",
        editable: true,
        colSpan: 1,
      },
    ];
  }

  handleDelete = (key) => {
    const dataSource = [...this.props.state.dataSource];
    this.props.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.props.state;
    const newData = {
      key: count,
      Description: "null",
      Package: "null",
      HSN_SAC: "null",
      QTY: "1",
      RATE: "0",
      Amount: "0",
    };
    this.props.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    row['Amount'] = row.RATE * row.QTY;    
    const newData = [...this.props.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    item.Amount = item.RATE * item.QTY;
    newData.splice(index, 1, { ...item, ...row });
    this.props.setState({
      dataSource: newData,
      count: newData.length+1,
    });
  };

  render() {
    const { dataSource } = this.props.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
      </div>
    );
  }
}

export default EditableTable;
