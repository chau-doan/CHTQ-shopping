import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../../../actions/productAction';
import LoadingBox from '../../../components/Loading/LoadingBox';
import MessageBox from '../../../components/Support/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../../constants/productConstant';
import { useNavigate } from 'react-router-dom';

export default function ProductListScreen(props) {
    const navigate = useNavigate();
    const {pageNumber=1} = useParams();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete =useSelector(state => state.productDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successDelete){
            dispatch({
                type: PRODUCT_DELETE_RESET,
            })
        }
        dispatch(listProducts({pageNumber}));
    }, [dispatch, navigate, successDelete, pageNumber] );


    const deleteHandler = (product) =>{
        // todo: dispatch delete action
        if(window.confirm('Are you sure to delele?')){
            dispatch(deleteProduct(product._id));
        }
    }

    const createHandler = () => {
        navigate('/product/create');
    }

    return (
        <div>
            <div className='row'>
                <h1>Product</h1>
                <button type="button" className='primary' onClick={createHandler}>
                    Create Product
                </button>
            </div>             
            {loadingDelete && (<LoadingBox />)}
            {errorDelete && (<MessageBox variant="danger">{errorDelete}</MessageBox>)}
            {loading ? (<LoadingBox />) :
            error ? (<MessageBox variant="danger">{error}</MessageBox>) :
            (
                <>
                <table className='content-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>COUNT</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.countInStock}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button 
                                        type='button' 
                                        className='small' 
                                        onClick={() => navigate(`/product/${product._id}/edit`)}
                                    >
                                        <i className="fa fa-edit" /> Edit
                                    </button>
                                    <button
                                        type='button'
                                        className='small'
                                        onClick={() => deleteHandler(product)}
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
                            <Link className={x+1 === page ? 'active' : ''} key={x+1} to={`/productlist/pageNumber/${x+1}`}>{x+1}</Link>
                        ))
                    }
                </div>
                </>
            )}
        </div>
    )
}
