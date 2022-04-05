import React from 'react';
import {Link} from "react-router-dom";

function OrderItem(props) {

    const renderOption = (options) => {
        console.log(options);
        if(!options || JSON.stringify(options) === '{}') return;
        const key = Object.keys(options);
        let attribute = '';
        key.map(k => {attribute += `${k}: ${options[k]}, `});
        return <p>{attribute.slice(0, -2)}</p>
    }

    const renderHeading = () => {
        if(props.noBorder){
            return <></>
        }
        else{
            return <h2 style={{paddingTop: '0'}}>Order Items</h2>
        }
    }

    return (
        <div className={props.noBorder ? '' : 'card card-body'}>
            {renderHeading()}
            <ul>
                {
                    props.order.map((item) => (
                        <li key={item.product} className='none'>
                            <div className="row col order-detail" >
                                <div className='col-1 product-image'>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="small"
                                    />
                                </div>
                                <div className='min-30 col-2 product-name'>
                                    <Link to={`/product/${item.product}`}>
                                        <h2>{item.name}</h2>
                                    </Link>
                                    {renderOption(item.options)}
                                </div>
                                <div className='col-3 order-total'>
                                    {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default OrderItem;