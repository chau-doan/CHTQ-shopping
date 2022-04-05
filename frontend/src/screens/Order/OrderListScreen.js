import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { deleteOrder, listOrder } from '../../actions/orderAction';
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import { ORDER_DELETE_RESET } from '../../constants/orderConstant';
import { useNavigate } from 'react-router-dom';
import Status from "../../components/Support/Status";

export default function OrderListScreen(props) {    
    const navigate = useNavigate();
    const {pageNumber=1} = useParams();
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderDelete;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: ORDER_DELETE_RESET,
        })
        dispatch(listOrder({pageNumber}));        
    }, [dispatch, successDelete, pageNumber])

    const deleteHandler = (order) => {
        // todo delete
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteOrder(order._id));
        }
    }

    const status = (order) => {
        if(order.isCanceled){
            return <Status variant='danger'>Cancelled</Status>
        }
        if(order.requestCancel){
            return <Status variant='warning'>Pending Cancel</Status>
        }
        if(order.isDelivered){
            return <Status variant='success'>Delivered</Status>
        }
        else{
            return <Status variant='warning'>Processing</Status>
        }
    }

    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && (<LoadingBox />)}
            {errorDelete && (<MessageBox variant="danger">{errorDelete}</MessageBox>)}
            {
                loading ? (<LoadingBox />):
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :(
                    <>
                    <table className='content-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>                                        
                                        <td>{order.user ? order.user.name : "Deleted User"}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>$ {order.totalPrice.toFixed(2)}</td>
                                        <td>{status(order)}</td>
                                        <td>
                                            <button 
                                                type='button' 
                                                className='small' 
                                                onClick={() => {navigate(`/order/${order._id}`)}}
                                            >
                                                <i className="fas fa-info-circle" /> Details
                                            </button>
                                            <button
                                                type='button'
                                                className='small'
                                                onClick={() => deleteHandler(order)}
                                            >
                                                <i className="fa fa-trash" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>   
                    <div className='row center pagination'>
                    {
                        [...Array(pages).keys()].map(x => (
                            <Link className={x+1 === page ? 'active' : ''} key={x+1} to={`/orderlist/pageNumber/${x+1}`}>{x+1}</Link>
                        ))
                    }
                    </div> 
                    </>
                )
            }
        </div>
    )
}
