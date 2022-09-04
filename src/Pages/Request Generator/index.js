
import { Row, Col, Button, Input } from "antd";
import "./index.scss";
import Table from "../../Component/Table";
import { ColumnsWithoutTags, Data } from "../../Component/TableData";
import EditableTable from "./Editable";
import { useEffect, useState } from "react";
import printElm from "./print";
import axios from "axios";




function RequestGenerator() {


  const [PONumberData, setPONumberData] = useState();
  function GetPONumber() {
    const bodyFormData = new FormData();
    bodyFormData.append("RequestType", "PONumber");
    axios
      .post("https://theductus.com/", bodyFormData)
      .then((res) => {

        let PO;
        PO = res.data.ResponseData[0].Id;
        setPONumberData(PO);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    GetPONumber();
  }, []);


  const current = new Date();
  const DateNow = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const POGenerateNo = `PO/DTPL/${current.getYear()-100}-${current.getYear()-100}/${PONumberData}`;

  const [Details, setDetails] = useState({
    Company_Name: "",
    Address: "",
    Dist: "",
    State: "",
    GST: "",
    PO_NO: "PO/DTPL/22-23/--",
    PO_DATE: DateNow,
    Delivery_Date: "",
    Supplier_Email: "",
  });

  const [state, setState] = useState({
    dataSource: [
      {
        key: 1,
        Description: "abc",
        Package: "abc",
        HSN_SAC: "abc",
        QTY: "1",
        RATE: "0",
        Amount: "0",
      },
    ],
    count: 2,
  });




 // const POGenerasteNo = "PO/DTPL/"+`${current.getYear()-current.getYear()/PONumberData};

  const [HtmlData, setHtmlData] = useState();
  function printPORequest() {

    printElm({ Details, state, isView: 1  })

    const bodyFormData = new FormData();
    bodyFormData.append("RequestType", "PrintPORequest");
    bodyFormData.append("RequestData", JSON.stringify({ html: printElm({ Details, state, isView: 0  }), PORequestId: {PONumberData} }));
    axios
      .post("https://theductus.com/", bodyFormData)
      .then((res) => {
        console.log('aamir');
        // let PO;
        // PO = res.data.ResponseData[0].Id;
        // setHtmlData(PO);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    //printPORequest();
  }, []);

  return (
    <div className="POGenerate" style={{ overflowX: "hidden", width: "99%" }}>
      <Row>
        <Col span={3} className="Box">
          <h2>Supplier Details</h2>
        </Col>
        <Col span={12} className="Box" style={{ padding: "0px" }}>
          <Row>
            <Col span={24}>
              <Input
                className="InputFields"
                value={Details.Company_Name}
                onChange={(e) =>
                  setDetails({ ...Details, Company_Name: e.target.value })
                }
                placeholder="Company Name"
              />
            </Col>
            <Col span={24}>
              <Input
                className="InputFields"
                value={Details.Address}
                onChange={(e) =>
                  setDetails({ ...Details, Address: e.target.value })
                }
                placeholder="Address"
              />
            </Col>
            <Col span={24}>
              <Input
                className="InputFields"
                value={Details.Dist}
                onChange={(e) =>
                  setDetails({ ...Details, Dist: e.target.value })
                }
                placeholder="Dist"
              />
            </Col>
            <Col span={12}>
              <Input
                className="InputFields"
                value={Details.State}
                onChange={(e) =>
                  setDetails({ ...Details, State: e.target.value })
                }
                placeholder="State"
              />
            </Col>
            <Col span={12}>
              <Input
                className="InputFields"
                value={Details.GST}
                onChange={(e) =>
                  setDetails({ ...Details, GST: e.target.value })
                }
                placeholder="GST"
              />
            </Col>
          </Row>
        </Col>
        <Col span={3} className="Box" style={{ padding: "0px" }}>
          <Row style={{ height: "100%" }}>
            <Col className="InputFields" span={24}>
              <h4>PO NO</h4>
            </Col>
            <Col className="InputFields" span={24}>
              <h4>PO Date</h4>
            </Col>
            <Col className="InputFields" span={24}>
              <h4>Delivery Date</h4>
            </Col>
            <Col className="InputFields" span={24}>
              <h4>Supplier Email</h4>
            </Col>
          </Row>
        </Col>
        <Col span={6} className="Box" style={{ padding: "0px" }}>
          <Row>
            <Col span={24}>
              <Input
                className="InputFields"
                value={Details.PO_NO}
                onChange={(e) =>
                  setDetails({ ...Details, PO_NO: e.target.value })
                }
                placeholder="Auto Generated"
              />
            </Col>
            <Col span={24}>
              <Input
                className="InputFields"
                value={Details.PO_DATE}
                /* value={DateNow} */
                onChange={(e) =>
                  setDetails({ ...Details, PO_DATE: e.target.value })
                }
                placeholder="Today Date"
              />
            </Col>
            <Col span={24}>
              <Input
                className="InputFields"
                value={Details.Delivery_Date}
                onChange={(e) =>
                  setDetails({ ...Details, Delivery_Date: e.target.value })
                }
                placeholder="Manual Enter Date"
              />
            </Col>
            <Col span={24}>
              <Input
                className="InputFields"
                value={Details.Supplier_Email}
                onChange={(e) =>
                  setDetails({ ...Details, Supplier_Email: e.target.value })
                }
                placeholder="Manual Enter Email"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={3} className="InputFields"></Col>
        <Col span={6} className="InputFields"></Col>
        <Col span={6} className="InputFields"></Col>
        <Col span={3} className="InputFields"></Col>
        <Col span={6} className="InputFields"></Col>
        {/* <Col span={4} className="InputFields"></Col>
        <Col span={4} className="InputFields"></Col> */}
      </Row>
      <EditableTable state={state} setState={setState} />

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
          onClick={() => printPORequest() }
          danger
          style={{
            padding: "0px 50px",
            fontSize: "15px",
            borderRadius: "10px",
            height: "40px",
            background: "#F57702",
          }}
        >
          Generate PO
        </Button>
      </div>
    </div>
  );
}

export default RequestGenerator;
