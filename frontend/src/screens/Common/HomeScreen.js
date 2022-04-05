import React, { useEffect } from 'react'
import Product from "../../components/Product/Product";
import { Link, useParams } from 'react-router-dom'
import MessageBox from '../../components/Support/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productAction';
import SkeletonCard from "../../components/Loading/SkeletonCard";

export default function HomeScreen() {
    const dispatch = useDispatch()

    const {pageNumber=1} = useParams();

    const productList = useSelector( state => state.productList);
    const { loading, error, products, page, pages} = productList;
    useEffect(() => {
        dispatch(listProducts({pageNumber}))
    }, [dispatch, pageNumber])

    return (
        <div>
            {loading ? (<div className='product-list'>
                            <SkeletonCard list={true}/>
                        </div>) :
                error? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <>
                            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                            <div className="row center product-list">
                                {
                                    products.map(product => (
                                        <Product
                                            key={product._id}
                                            product={product} />
                                    ))
                                }
                            </div>
                            <div className='row center pagination'>
                                {
                                    pages !== 1 &&
                                    [...Array(pages).keys()].map(x => (
                                        <Link className={x+1 === page ? 'active' : ''} key={x+1} to={`/pageNumber/${x+1}`}>{x+1}</Link>
                                    ))

                                }
                            </div>
                        </>
                    )
            }
        </div>
    )
}
