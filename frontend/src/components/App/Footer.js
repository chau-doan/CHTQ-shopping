import React from 'react';
import {useSelector} from "react-redux";
import ChatBox from "../Support/ChatBox";
import "./App.css"

function Footer(props) {

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    return (
        <>
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
            <p>Copyright <i className={"fa fa-copyright"}/> 2021-2022 CHTQ, Inc - All Right Reserved</p>
        </>
    );
}

export default Footer;