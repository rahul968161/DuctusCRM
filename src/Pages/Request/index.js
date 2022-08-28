import { Row, Col, Button } from 'antd';
import "./index.scss"
import Table from "../../Component/Table"
import {  ColumnsWithoutTags, Data  } from '../../Component/TableData';
function Request() {
    return (
        <div className='Request' style={{overflowX:"hidden",width:"99%"}}>
            <Row>
                <Col span={6} className="Box">
                    <h2>Supplier Deatails</h2>
                </Col>
                <Col span={6} className="Box"><p>Lorem ipsum</p></Col>
                <Col span={6} className="Box">
                    <h2>PO Details</h2>
                </Col>
                <Col span={6} className="Box"><p>Lorem ipsum</p></Col>
            </Row>
            <Row>
                <Col span={6} className="Box borderBottomZero">
                    <h2>Bill To / Ship to Address</h2>
                </Col>
                <Col span={6} className="Box borderBottomZero"><p>Lorem ipsum</p></Col>
                <Col span={6} className="Box borderBottomZero">
                    <h2>User Details</h2>
                </Col>
                <Col span={6} className="Box borderBottomZero"><p>Lorem ipsum</p></Col>
            </Row>
            <Table columns={ColumnsWithoutTags} data={Data} pagination={false} />
            <Row>
                <Col span={16} >
                </Col>
                <Col span={8} >
                    {[0, 1, 2, 3, 4].map((a) => {
                        return <Row>
                            <Col span={12} className="Box">
                                <h3>Supplier Deatails</h3>
                            </Col>
                            <Col span={12} className="Box"><h4>20</h4></Col>
                        </Row>

                    })}
                    <Row>
                        <Col span={12} className="Box borderBottomZero">
                            <h3>Total Amount</h3>
                        </Col>
                        <Col span={12} className="Box borderBottomZero"><h4>20</h4></Col>

                    </Row>
                </Col>
            </Row>
            <Row className='Terms'>
                <Col span={24}>
                    <h1 className='Heading'>Company term Condition</h1>
                </Col>
                <Col span={24}>
                    <p className='Text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim, elit vel viverra ornare, lacus ipsum aliquet massa, nec lacinia nunc diam vel velit. Mauris nec rutrum mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim, elit vel viverra ornare, lacus ipsum aliquet massa, nec lacinia nunc diam vel velit. Mauris nec rutrum mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim, elit vel viverra ornare, lacus ipsum aliquet massa, nec lacinia nunc diam vel velit. Mauris nec rutrum mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim, elit vel viverra ornare, lacus ipsum aliquet massa, nec lacinia nunc diam vel velit. Mauris nec rutrum mi.   </p>
                </Col>
            </Row>

            <div style={{ padding: "50px", display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                <Button type="primary" danger style={{ padding: "0px 50px", fontSize: "15px", borderRadius: "10px", height: "40px", background: "#F57702" }}>Add</Button>
            </div>
        </div>
    )
}

export default Request