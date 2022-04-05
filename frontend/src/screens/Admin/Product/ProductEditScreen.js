import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../../../actions/productAction';
import LoadingBox from '../../../components/Loading/LoadingBox';
import MessageBox from '../../../components/Support/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../../../constants/productConstant';
import { useNavigate, useParams } from 'react-router-dom';
import ProductEditor from "../../../components/Product/ProductEditor";

export default function ProductEditScreen(props) {
    const params = useParams();
    const navigate = useNavigate();
    const {id : productId }= params;
    const [name, setName]                   = useState('');
    const [price, setPrice]                 = useState('');
    const [image, setImage]                 = useState('');
    const [category, setCategory]           = useState('');
    const [countInStock, setCountInStock]   = useState('');
    const [attribute, setAttribute]         = useState([]);
    const [brand, setBrand]                 = useState('');
    const [description, setDescription]     = useState('');
    
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            navigate('/productlist/pageNumber/1');
        }
        if(!product || (product._id !== productId) || successUpdate){
            dispatch({
                type: PRODUCT_UPDATE_RESET,
            })
            dispatch(detailsProduct(productId));
        }
        else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setAttribute(product.attribute);
            setDescription(product.description);
        }
    }, [product, dispatch, productId, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            category,
            brand,
            attribute,
            countInStock,
            description
        }))
    }

    return (
        <div>
            {loadingUpdate && (<LoadingBox />)}
            {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
            {loading ? <LoadingBox/> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <ProductEditor
                        title={`Update Product ${productId}`}
                        loading={false}
                        error={undefined}
                        submitHandler={e => submitHandler(e)}
                        name={name}                     setName={value => setName(value)}
                        price={price}                   setPrice={value => setPrice(value)}
                        image={image}                   setImage={value => setImage(value)}
                        category={category}             setCategory={value => setCategory(value)}
                        countInStock={countInStock}     setCountInStock={value => setCountInStock(value)}
                        brand={brand}                   setBrand={value => setBrand(value)}
                        attribute={attribute}           setAttribute={value => setAttribute(value)}
                        description={description}       setDescription={value => setDescription(value)}
                    />
            }
        </div>
    )
}
