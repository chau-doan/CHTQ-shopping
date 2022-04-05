import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../../actions/orderAction';
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Status from "../../components/Support/Status";

export default function OrderHistoryScreen(props) {
    const navigate = useNavigate();
    const {pageNumber=1} = useParams();

    const orderListMine = useSelector(state => state.orderListMine);
    const { loading, error, orders, page, pages } = orderListMine;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine({pageNumber}));
    }, [dispatch, pageNumber])

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
            <h1>Order History</h1>
            {
                loading ? (<LoadingBox />):
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :(
                    <>
                        <table className='content-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>DELIVERED</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>$ {order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                            <td>{status(order)}</td>
                                            <td>
                                                <button
                                                    type='button'
                                                    className='small'
                                                    onClick={() => {navigate(`/order/${order._id}`)}}
                                                >
                                                    <i className="fas fa-info-circle" /> Details
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
                                <Link className={x+1 === page ? 'active' : ''} key={x+1} to={`/orderhistory/pageNumber/${x+1}`}>{x+1}</Link>
                                ))
                            }
                        </div>
                    </>
                )
            }

        </div>
    )
}
