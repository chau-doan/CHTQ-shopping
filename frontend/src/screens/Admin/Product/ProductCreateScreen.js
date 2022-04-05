import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, detailsProduct} from "../../../actions/productAction";
import ProductEditor from "../../../components/Product/ProductEditor";
import LoadingBox from "../../../components/Loading/LoadingBox";
import MessageBox from "../../../components/Support/MessageBox";
import {PRODUCT_CREATE_RESET} from "../../../constants/productConstant";

function ProductCreateScreen(props) {

    const navigate = useNavigate();

    const [name, setName]                   = useState('');
    const [price, setPrice]                 = useState('');
    const [image, setImage]                 = useState('');
    const [category, setCategory]           = useState('');
    const [countInStock, setCountInStock]   = useState('');
    const [brand, setBrand]                 = useState('');
    const [attribute, setAttribute]         = useState([]);
    const [description, setDescription]     = useState('');

    const productCreate = useSelector(state => state.productCreate);
    const {loading, error, success} = productCreate;

    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            window.alert('New Product Created Successfully');
            dispatch({
                type: PRODUCT_CREATE_RESET
            })
            navigate('/productlist/pageNumber/1');
        }

            setName('');
            setPrice('');
            setImage('');
            setCategory('');
            setCountInStock('');
            setBrand('');
            setAttribute([]);
            setDescription('');

    }, [dispatch, success, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct({
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
            {loading && <LoadingBox />}
            {error && <MessageBox variant='danger'>{error}</MessageBox>}
            <ProductEditor
                title='Create New Product'
                loading={false}
                error={undefined}
                submitHandler={e => submitHandler(e)}
                name={name}                     setName={value => setName(value)}
                price={price}                   setPrice={value => setPrice(value)}
                image={image}                   setImage={value => setImage(value)}
                category={category}             setCategory={value => setCategory(value)}
                countInStock={countInStock}     setCountInStock={value => setCountInStock(value)}
                attribute={attribute}           setAttribute={value => setAttribute(value)}
                brand={brand}                   setBrand={value => setBrand(value)}
                description={description}       setDescription={value => setDescription(value)}
            />
        </div>
    );
}

export default ProductCreateScreen;