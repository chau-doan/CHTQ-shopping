import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {cancelOrder, confirmCancelOrder, deliverOrder, detailsOrder } from '../../actions/orderAction';
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import {
    ORDER_CANCEL_RESET,
    ORDER_DELIVER_RESET,
    ORDER_REQUEST_CANCEL_RESET
} from '../../constants/orderConstant';
import OrderItem from "../../components/Order/OrderItem";

export default function OrderScreen(props) {
    const params = useParams();
    const {id: orderId} = params;

    /* Redux Store Section */
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;

    const orderRequestCancel = useSelector(state => state.orderRequestCancel);
    const { loading: loadingRequest, error: errorRequest, success: successRequest} = orderRequestCancel;

    const orderConfirmCancel = useSelector(state => state.orderConfirmCancel);
    const { loading: loadingCancel, error: errorCancel, success: successCancel} = orderConfirmCancel;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!order || successDeliver || successRequest||  successCancel ||(order && order._id !== orderId)) {
            dispatch({ 
                type: ORDER_DELIVER_RESET 
            });
            dispatch({
                type: ORDER_REQUEST_CANCEL_RESET
            })
            dispatch({
                type: ORDER_CANCEL_RESET,
            })
            dispatch(detailsOrder(orderId));
        }
      }, [dispatch, order, orderId, successDeliver, successRequest, successCancel]);




    /* Handler Function Section */
    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };

    const cancelRequestHandler = () => {
        dispatch(cancelOrder(order._id));
    }

    const confirmCancelHandler = () => {
        dispatch(confirmCancelOrder(order._id));
    }

    /* Conditional Rendering Section */

    const renderCancelButton = (order) => {
        if(order.requestCancel) return;
        if(userInfo._id === order.user){
            return (
                <>
                    {loadingCancel && <LoadingBox />}
                    {errorCancel && <MessageBox variant="danger">{errorCancel}</MessageBox>}
                    <button
                        type='button'
                        className='primary block'
                        onClick={cancelRequestHandler}
                    >
                        Cancel order
                    </button>
                </>
            );
        }
    }

    const renderDeliverButton = (order) => {
        if(!userInfo.isAdmin) return;
        if(order.isDelivered) return;
        if(!order.isCanceled){
            return (
                <li>
                    {loadingDeliver && (<LoadingBox />)}
                    {errorDeliver && (<MessageBox variant="danger">{errorDeliver}</MessageBox>)}
                    <button
                        type='button'
                        className='primary block'
                        onClick={deliverHandler}
                    >
                        Deliver Order
                    </button>
                </li>
            );
        }
    }


    const renderConfirmButton = (order) => {
        if(!userInfo.isAdmin) return;
        if(order.isCanceled) return;
        if(order.requestCancel){
            return (
                <>
                    {loadingRequest && <LoadingBox />}
                    {errorRequest && <MessageBox variant="danger">{errorRequest}</MessageBox>}
                    <button
                        type='button'
                        className='primary block'
                        onClick={confirmCancelHandler}
                    >
                        Confirm Cancel
                    </button>
                </>
            );
        }
    }

    const renderDeliverStatus = (order) => {
        if(order.isDelivered && order.isCanceled){
            return (
                <MessageBox variant="danger">
                    Order Returned
                </MessageBox>
            );
        }
        if(order.isCanceled){
            return (
                <MessageBox variant="danger">
                    Order Canceled
                </MessageBox>
            );
        }
        if(order.requestCancel){
            return (
                <MessageBox variant="danger">
                    Pending Cancel
                </MessageBox>
            )
        }
        if(order.isDelivered){
            return (
                <MessageBox variant="success">
                    Delivered at {order.deliveredAt.substring(0, 10)}
                </MessageBox>
            );
        }
        return <MessageBox variant="danger">Not Delivered</MessageBox>;;
    }


    const renderPayStatus = (order) => {
        if(order.isCanceled){
            return <MessageBox variant="danger">Refunded</MessageBox>;
        }
        if(order.requestCancel){
            return <MessageBox variant="danger">Refund pending</MessageBox>;
        }
        return(
            <MessageBox variant="success">
                Paid at {order.createdAt.substring(0, 10)}
            </MessageBox>
        );
    }


    return loading ? (<LoadingBox />):
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :(
        <div>
            <h1>Order {order._id}</h1>
            <div className='row top'>
                <div className='col-2'>
                    <ul className='none'>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}                                    
                                </p>
                                {renderDeliverStatus(order)}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Name:</strong> {order.paymentMethod}
                                </p>
                                {renderPayStatus(order)}
                            </div>
                        </li>
                        <li>
                            <OrderItem order={order.orderItems} />
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul className='none'>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                        <strong>Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${order.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <label />
                            { renderCancelButton(order) }
                            { renderConfirmButton(order) }
                            { renderDeliverButton(order) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
