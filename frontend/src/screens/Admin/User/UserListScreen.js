import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { deleteUser, listUsers } from '../../../actions/userAction'
import LoadingBox from '../../../components/Loading/LoadingBox'
import MessageBox from '../../../components/Support/MessageBox'
import { useNavigate } from 'react-router-dom';
import {USER_DETAILS_RESET} from "../../../constants/userConstant";
import {ORDER_LIST_USER_RESET} from "../../../constants/orderConstant";
import {REVIEW_USER_LIST_RESET} from "../../../constants/reviewConstant";

export default function UserListScreen(props) {    
    const navigate = useNavigate();
    const {pageNumber=1} = useParams();
    const userList = useSelector(state => state.userList);
    const { loading, error, users, page, pages } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listUsers({pageNumber}));
        dispatch({
            type: USER_DETAILS_RESET,
        });
        dispatch({
            type: ORDER_LIST_USER_RESET,
        })
        dispatch({
            type: REVIEW_USER_LIST_RESET,
        })
    }, [dispatch, successDelete, navigate, pageNumber])

    const deleteHandler = (user) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(user._id))
        }
    }
    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && (<LoadingBox />)}
            {errorDelete && (<MessageBox variant="danger">{errorDelete}</MessageBox>)}
            {successDelete && (<MessageBox variant="success">User Deleted Successfuly</MessageBox>)}
            {
                loading ? (<LoadingBox />) 
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (
                    <>
                    <table className='content-table center'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ID ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className={`${user.isAdmin ? 'active-row' : ''}`}>
                                    <td>{user._id}</td>                                    
                                    <td>{user.name}</td>                                    
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='small'
                                            onClick={() => navigate(`/user/${user._id}/edit`)}
                                        >
                                            <i className="fa fa-edit" /> Edit
                                        </button>
                                        <button
                                            type='button'
                                            className='small'
                                            onClick={() => navigate(`/userdashboard/${user._id}`)}
                                        >
                                            <i className="fas fa-info-circle" /> Details
                                        </button>
                                        <button
                                            type='button'
                                            className='small'
                                            onClick={() => deleteHandler(user)}  
                                        >
                                            <i className="fa fa-trash" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div className='row center pagination'>
                    {
                        [...Array(pages).keys()].map(x => (
                            <Link className={x+1 === page ? 'active' : ''} key={x+1} to={`/userlist/pageNumber/${x+1}`}>{x+1}</Link>
                        ))
                    }
                </div>
                    </>
                )
            }
        </div>
    )
}