import React from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import SearchBox from "./SearchBox";
import {signout} from "../../actions/userAction";
import "./App.css"

export default function Header(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout())
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    className="open-sidebar"
                    onClick={() => props.openSideBar(true)}
                >
                    <i className="fa fa-bars" />
                </button>
                <Link className="brand" to="/">
                    CHTQ Shopping
                </Link>
            </div>
            <div>
                <SearchBox />
            </div>
            <div>
                <Link className="red" to="/cart">
                    <i className="fas fa-shopping-cart" /> Cart
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                </Link>
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">
                                {userInfo.name} <i className="fa fa-caret-down" />{' '}
                            </Link>
                            <ul className="dropdown-content none">
                                <li>
                                    <Link to='/userdashboard'>
                                        <i className='fas fa-user'/>  Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/profile'>
                                        <i className="fas fa-user-cog" /> User Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/orderhistory'>
                                        <i className='fas fa-history'/>  Order History
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#signout" onClick={signoutHandler}>
                                        <i className='fas fa-sign-out'/>  Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/signin"><i className='fas fa-sign-out'/> Sign In</Link>
                    )
                }
                {
                    userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Admin <i className="fa fa-caret-down" />
                            </Link>
                            <ul className="dropdown-content none">
                                <li>
                                    <Link to="/dashboard">
                                        <i className='fas fa-chart-bar'/> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/productlist/pageNumber/1">
                                        <i className="fas fa-database" /> Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/orderlist/pageNumber/1">
                                        <i className="far fa-list-alt" /> Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/userlist/pageNumber/1">
                                        <i className="fas fa-users-cog" /> Users
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/support">
                                        <i className="fas fa-comments" /> Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </>
    )
}

/*
<>
            <div>
                <button
                    type="button"
                    className="open-sidebar"
                    onClick={() => props.openSideBar(true)}
                >
                    <i className="fa fa-bars" />
                </button>
                <Link className="brand" to="/">
                    CHTQ Shopping
                </Link>
            </div>
            <div>
                <SearchBox />
            </div>
            <div>
                <Link to="/cart">
                    Cart
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                </Link>
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">
                                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to='/profile'>
                                        User Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/orderhistory'>
                                        Order History
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#signout" onClick={signoutHandler}>
                                        Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    ) : (
                        <Link to="/signin">Sign In</Link>
                    )
                }
                {
                    userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Admin <i className="fa fa-caret-down" />
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/productlist/pageNumber/1">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/orderlist/pageNumber/1">
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/userlist/pageNumber/1">
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/support">
                                        Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </>
 */