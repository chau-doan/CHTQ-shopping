import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {createOrder} from '../../actions/orderAction';
import CheckoutSteps from '../../components/Order/CheckoutSteps'
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import { ORDER_CREATE_RESET } from '../../constants/orderConstant';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";
import OrderItem from "../../components/Order/OrderItem";
import {URL} from "../../constants/AJAXConstant";

export default function PlaceOrderScreen(props) {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    if(!paymentMethod){
        navigate('/payment')
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);
    const [placed, setPlaced] = useState(false);

    const toPrice       = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice     = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice  = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice       = toPrice(0.1 * cart.itemsPrice);
    cart.totalPrice     = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    const successPaymentHandler = (paymentResult) => {
        // TODO: dispatch pay order
        dispatch(createOrder({
            ...cart,
            orderItems: cartItems,
            paymentResult: paymentResult
        }));
    };

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get(URL +'/api/config/paypal');
            console.log(data);
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!window.paypal) {
            addPayPalScript();
        } else {
            setSdkReady(true);
        }

        if(success){
            navigate(`/order/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET,
            });
        }
    }, [dispatch, order, navigate, success]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='row top'>
                <div className='col-2'>
                    <ul className='none'>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Name:</strong> {paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <OrderItem order={cartItems} />
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
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                        <strong>Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!placed ? (<button
                                    type="button"
                                    onClick={() => setPlaced(true)}
                                    className='primary block'
                                    disabled={cartItems.length === 0}
                                >
                                    Place Order
                                </button>) : !sdkReady ? (
                                    <LoadingBox />
                                ) : (
                                    <>
                                        <PayPalButton
                                            amount={cart.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    </>
                                )}

                            </li>
                            {loading ? (<LoadingBox />) : (<></>)}
                            {error ? (<MessageBox variant="danger">{error}</MessageBox>) : (<></>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
