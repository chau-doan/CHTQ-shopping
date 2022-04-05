import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { detailsProduct } from '../../actions/productAction';
import {createReview, listReviewProduct} from "../../actions/reviewAction";
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import Rating from '../../components/Review and Rating/Rating';
import { REVIEW_CREATE_RESET } from '../../constants/reviewConstant.js';
import { useNavigate } from 'react-router-dom';
import Review from "../../components/Review and Rating/Review";
import ReviewEditor from "../../components/Review and Rating/ReviewEditor";
import {addToCart} from "../../actions/cartAction";

export default function ProductScreen(props) {
    const params                    = useParams();
    const navigate                  = useNavigate();
    const dispatch                  = useDispatch();
    const { id: productId }         = params;


    // Creating Hook
    const [qty, setQty]             = useState(1);
    const [attribute, setAttribute] = useState({});
    const [rating, setRating]       = useState(0);
    const [comment, setComment]     = useState("");


    // Access store
    const userSignin                = useSelector(state => state.userSignin);
    const { userInfo }              = userSignin;

    const productDetails            = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    const reviewUpdate              = useSelector(state => state.reviewUpdate);
    const {success: successUpdate} = reviewUpdate;

    const reviewCreate       = useSelector(state => state.reviewCreate);
    const {loading:loadingReviewCreate, error:errorReviewCreate, success: successReviewCreate} = reviewCreate;

    const reviewProductList         = useSelector(state => state.reviewProductList);
    const {loading:loadingReviews, error: errorReviews, reviews} = reviewProductList;

    const reviewDelete              = useSelector(state => state.reviewDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = reviewDelete;


    useEffect(() => {
        if(successReviewCreate){
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
        }
        dispatch({
            type: REVIEW_CREATE_RESET,
        })
        dispatch(detailsProduct(productId));
        dispatch(listReviewProduct(productId));
    }, [dispatch, productId, successReviewCreate, successUpdate, successDelete]);

    useEffect(() => {
        if(product && product.attribute.length !==0){
            let temp = {};
            product.attribute.map((x) => {temp = {...temp, [x.name]: x.options[0]}});
            setAttribute(temp);
        }
        else{
            setAttribute({});
        }
    },[product]);

    const addToCartHandler = () => {
        dispatch(addToCart(productId, qty, attribute))
        setAttribute({});
        navigate(`/cart`);
    }

    const submitHandler = (e) => {
        // to submit comment
        e.preventDefault();
        if(comment && rating){
            dispatch(createReview(productId, {rating, comment}))
        }
        else{
            alert('Please enter comment and rating')
        }
    };

    const renderOption = () => {
        if(product.attribute.length !== 0){
            return (
                product.attribute.map(attr => (
                    <li>
                        <div className='row'>
                            <div>{attr.name}</div>
                            <div>
                                <select
                                    value={attribute[attr.name]}
                                    onChange={e => setAttribute({...attribute, [attr.name]: e.target.value})}
                                >
                                    {
                                        attr.options.map(x => (
                                            <option
                                                key={x}
                                                value={x}
                                            >
                                                {x}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </li>
                ))
            )
        }
    }

    return (
        <div>
            {
                loading? (<LoadingBox />) :
                    error? (<MessageBox variant="danger">{error}</MessageBox>) :
                        (
                            <div>
                                <Link to="/">Back to result</Link>
                                <div className='row top'>
                                    <div className='col-2'>
                                        <img className="large skeleton" src={product.image} alt={product.name} />
                                    </div>
                                    <div className='col-1'>
                                        <ul className='none'>
                                            <li>
                                                <h1>{product.name}</h1>
                                            </li>
                                            <li>
                                                <Rating
                                                    rating={product.rating}
                                                    numReviews={product.numReviews}
                                                />
                                            </li>
                                            <li>
                                                Price: ${product.price}
                                            </li>
                                            <li>
                                                Description:
                                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-1'>
                                        <div className='card card-body'>
                                            <ul className='none'>
                                                <li>
                                                    <div className='row'>
                                                        <div>Price</div>
                                                        <div className='price'>${product.price}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='row'>
                                                        <div>Status</div>
                                                        <div>
                                                            {product.countInStock > 0 ?
                                                                (<span className='success'>In stock</span>) :
                                                                (<span className='danger'>Unavailable</span>)}
                                                        </div>
                                                    </div>
                                                </li>
                                                {
                                                    product.countInStock > 0 && (
                                                        <>
                                                            <li>
                                                                <div className='row'>
                                                                    <div>Qty</div>
                                                                    <div>
                                                                        <select
                                                                            value={qty}
                                                                            onChange={e => setQty(e.target.value)}
                                                                        >
                                                                            {
                                                                                [...Array(product.countInStock).keys()].map(x => (
                                                                                    <option
                                                                                        key={x + 1}
                                                                                        value={x + 1}
                                                                                    >
                                                                                        {x + 1}
                                                                                    </option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {renderOption()}
                                                            <li>
                                                                <button
                                                                    className='primary block'
                                                                    onClick={addToCartHandler}
                                                                >
                                                                    Add to Cart
                                                                </button>
                                                            </li>
                                                        </>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 id="reviews">Reviews</h2>
                                    {loadingDelete && <LoadingBox />}
                                    {errorDelete && <MessageBox variant='danger' >{errorDelete}</MessageBox>}
                                    {loadingReviews ? <LoadingBox /> :
                                        errorReviews ? <MessageBox variant='danger' >{errorReviews}</MessageBox> :
                                            reviews.length === 0 ? <MessageBox>There is no reviews</MessageBox> :
                                                <ul className='none'>
                                                    {reviews.map((review) => (
                                                        <li key={review._id}>
                                                            <div className='top row col'>
                                                                <Review review={review} name={true}/>
                                                                <div className="col-2"></div>
                                                            </div>
                                                        </li>))}
                                                </ul>

                                    }
                                    <div className="col row top">
                                        <div className="col-1"></div>
                                        <div className="col-2">
                                            {userInfo ? (
                                                <>
                                                    <ReviewEditor
                                                        submitHandler={(e) => submitHandler(e)}
                                                        title="Write a customer review"
                                                        rating={rating}
                                                        updateRating={(value) => setRating(value)} updateComment={(value) => setComment(value)}
                                                        button='Submit'
                                                    />
                                                    <div>
                                                        {loadingReviewCreate && (<LoadingBox />)}
                                                        {errorReviewCreate && (<MessageBox variant="danger">{errorReviewCreate}</MessageBox>)}
                                                    </div>
                                                </>
                                            ) : (
                                                <MessageBox>
                                                    Please <Link to="/signin">Sign In</Link> to write a review
                                                </MessageBox>
                                            )}
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </div>
                            </div>
                        )
            }
        </div>
    )
}

/*
147
<Review productId={productId} />
<div>
                                    <h2 id="reviews">Reviews</h2>
                                    {product.reviews.length === 0 && (<MessageBox>There is no reviews</MessageBox>)}
                                    <ul>
                                        {product.reviews.map((review) => (
                                            <li key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating rating={review.rating} caption=" "/>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </li>
                                        ))}
                                        <li>
                                            {userInfo ? (
                                                <form className='form' onSubmit={submitHandler}>
                                                    <div>
                                                        <h2>Write a customer review</h2>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="rating">Rating</label>
                                                        <select
                                                            id="rating"
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value="">Select...</option>
                                                            <option value="1">1 - Poor</option>
                                                            <option value="2">2 - Fair</option>
                                                            <option value="3">3 - Good</option>
                                                            <option value="4">4 - Very good</option>
                                                            <option value="5">5 - Excelent</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor='comment'>Comment</label>
                                                        <textarea
                                                            id="comment"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label />
                                                        <button
                                                            className='primary'
                                                            type='submit'
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                    <div>
                                                        {loadingReviewCreate && (<LoadingBox />)}
                                                        {errorReviewCreate && (<MessageBox variant="danger">{errorReviewCreate}</MessageBox>)}
                                                    </div>
                                                </form>
                                            ) : (
                                                <MessageBox>
                                                    Please <Link to="/signin">Sign In</Link> to write a review
                                                </MessageBox>
                                            )}
                                        </li>
                                    </ul>
                                </div>
 */

/*

<form className='form' onSubmit={submitHandler}>
                                                    <div>
                                                        <h2>Write a customer review</h2>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="rating">Rating</label>
                                                        <select
                                                            id="rating"
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value="">Select...</option>
                                                            <option value="1">1 - Poor</option>
                                                            <option value="2">2 - Fair</option>
                                                            <option value="3">3 - Good</option>
                                                            <option value="4">4 - Very good</option>
                                                            <option value="5">5 - Excelent</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor='comment'>Comment</label>
                                                        <textarea
                                                            id="comment"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label />
                                                        <button
                                                            className='primary'
                                                            type='submit'
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                    <div>
                                                        {loadingReviewCreate && (<LoadingBox />)}
                                                        {errorReviewCreate && (<MessageBox variant="danger">{errorReviewCreate}</MessageBox>)}
                                                    </div>
                                                </form>

 */