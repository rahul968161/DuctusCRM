
import Logo from "../Images/Logo.png"
import Vector from "../Images/Vector.png"
import { SearchOutlined, } from '@ant-design/icons';
import { Button, Input, } from 'antd';
import "./Header.scss"
import { useMediaQuery } from "react-responsive";

function Header({ setCollapsed, collapsed }) {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return (
        <div className='Header'>
            {isMobileScreen && <img src={Vector} className={isMobileScreen && "Vector"} onClick={() => setCollapsed(!collapsed)} />}
            <img src={Logo} className={isMobileScreen ? "smallLogo" : "Logo"} />
            {/* {JSON.parse(localStorage.getItem("user")).UserType == "Admin" && */}
                <Input
                    style={{ width: "350px", borderRadius: "10px", backgroundColor: "#EDEFF1" }}
                    placeholder="Search"
                    className='SearchField'
                    prefix={<SearchOutlined />}
                    suffix={
                        <Button type="primary" danger style={{ background: "#F57702", borderRadius: "10px" }}>Search</Button>
                    }
                />
            {/* } */}
        </div>
    )
}

export default Header