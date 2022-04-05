import React from 'react';
import "./Loading.css"

function SkeletonProduct(props) {
    return (
        <div>
            <div className='row top'>
            </div>
        </div>
    );
}

export default SkeletonProduct;

/*
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
                                        <ul>
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
                                                <p>{product.description}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-1'>
                                        <div className='card card-body'>
                                            <ul>
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
                                                <ul>
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
 */