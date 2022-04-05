import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { listProducts } from '../../actions/productAction'
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import Product from '../../components/Product/Product';
import Rating from '../../components/Review and Rating/Rating';
import { prices, ratings } from '../../helper.js';
import { useNavigate } from 'react-router-dom';
import SkeletonCard from "../../components/Loading/SkeletonCard";

export default function SearchScreen(props) {
    const navigate = useNavigate();
    
    const {name = 'all', category='all', brand='all', min=0, max=0, rating=0, order='newest', pageNumber=1} = useParams();
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList);
    const {loading, error, products, page, pages} = productList;

    const productCategoryList = useSelector(state => state.productCategoryList);
    const {loading: loadingCategory, error: errorCategory, categories } = productCategoryList;

    const productBrandList = useSelector(state => state.productBrandList);
    const {loading: loadingBrand, error: errorBrand, brands } = productBrandList;

    useEffect(() => {
        dispatch(
          listProducts({
            pageNumber,
            name:       name !== 'all'      ? name      : '',
            category:   category !== 'all'  ? category  : '',
            brand:      brand !== 'all'     ? brand  : '',
            min, 
            max,
            rating,
            order,
          })
        );
      }, [category, dispatch, name, min, max, rating, order, pageNumber, brand]);

    const getFilterUrl = (filter) => {
        const filterPage        = filter.page       || pageNumber;
        const filterCategory    = filter.category   || category;
        const filterBrand       = filter.brand      || brand;
        const filterName        = filter.name       || name;
        const filterMin         = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax         = filter.max        || max;
        const filterRating      = filter.rating     || rating;
        const sortOrder         = filter.order      || order;
        return `/search/category/${filterCategory}/brand/${filterBrand}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
    }
    return (
        <div>
            <div className='row'>
            {
                loading ? (<LoadingBox />) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                (
                    <div>
                        {products.length} Results
                    </div>
                )
            }   
                <div>
                    Sort by {' '}
                    <select 
                        value={order}
                        onChange={e => {
                            navigate(getFilterUrl({order: e.target.value}));
                        }}
                    >
                        <option value="newest">Newest Arrivals</option>                        
                        <option value="lowest">Price: Low to High</option>                        
                        <option value="highest">Price: High to Low</option>
                        <option value="toprated">Average Customer Reviews</option>
                    </select>
                </div>
            </div>
            <div className='row top'>
                <div className='col-1'>
                    <h3>Department</h3>
                    <div>
                    {
                        loadingCategory ? (<LoadingBox />) :
                        errorCategory ? (<MessageBox variant="danger">{errorCategory}</MessageBox>) :
                        (
                            <ul className='none'>
                                <li key='all'>
                                    <Link 
                                        className={'all'===category? 'active': ''} 
                                        to={getFilterUrl({category:'all'})}
                                    >
                                        All
                                    </Link>
                                </li>
                            {
                                categories.map((c) => (
                                <li key={c}>
                                    <Link 
                                        className={c===category? 'active': ''} 
                                        to={getFilterUrl({category:c})}
                                    >
                                        {c}
                                    </Link>
                                </li>
                            ))}
                            </ul>
                        )
                    }
                    </div>
                    <h3>Brand</h3>
                    <div>
                        {
                            loadingBrand ? (<LoadingBox />) :
                                errorBrand ? (<MessageBox variant="danger">{errorBrand}</MessageBox>) :
                                    (
                                        <ul className='none'>
                                            <li key='all'>
                                                <Link
                                                    className={'all'===brand? 'active': ''}
                                                    to={getFilterUrl({brand:'all'})}
                                                >
                                                    All
                                                </Link>
                                            </li>
                                            {
                                                brands.map((c) => (
                                                    <li key={c}>
                                                        <Link
                                                            className={c===brand? 'active': ''}
                                                            to={getFilterUrl({brand:c})}
                                                        >
                                                            {c}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    )
                        }
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul className='none'>
                            {prices.map((p) => (
                                <li key={p.name}>
                                    <Link 
                                        className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active': ''}
                                        to={getFilterUrl({min: p.min, max: p.max})}
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Average Customer Review</h3>
                        <ul className='none'>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link 
                                        className={`${r.rating}` === `${rating}` ? 'active': ''}
                                        to={getFilterUrl({rating: r.rating})}
                                    >
                                        <Rating 
                                            caption={' & up'} 
                                            rating={r.rating}                                             
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='col-3'>
                {
                loading ? (<SkeletonCard list={false}/>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                (
                    <>
                        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                        <div className="row center">
                        {
                            products.map(product => (
                            <Product
                                key={product._id}
                                product={product} 
                            />     
                            ))
                        }
                        </div>
                        <div className='row center pagination'>
                            {
                                [...Array(pages).keys()].map(x => (
                                    <Link className={x+1 === page ? 'active' : ''} key={x+1} to={getFilterUrl({page:x+1})}>{x+1}</Link>
                                ))
                            }
                        </div>
                    </> 
                )
                }   
                </div>
            </div>         
        </div>
    )
}
