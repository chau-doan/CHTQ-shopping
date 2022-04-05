import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import LoadingBox from "../Loading/LoadingBox";
import MessageBox from "../Support/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listProductsBrands, listProductsCategories} from "../../actions/productAction";
import "./App.css"

export default function SideBar(props) {

    const productCategoryList = useSelector(state => state.productCategoryList);
    const {loading: loadingCategory, error: errorCategory, categories } = productCategoryList;

    const productBrandList = useSelector(state => state.productBrandList);
    const {loading: loadingBrand, error: errorBrand, brands } = productBrandList;


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductsCategories());
        dispatch(listProductsBrands());
    },[dispatch])

    return (
        <aside className={props.open ? 'open' : ''} >
            <ul className="categories none">
                <button
                    className='close-sidebar'
                    onClick={() => props.closeSideBar(false)}
                >
                    <i className="fa fa-close" />
                </button>
                <label />
                <li>
                    <strong>Categories</strong>
                </li>
                {
                    loadingCategory ? (<LoadingBox />) :
                        errorCategory ? (<MessageBox variant="danger">{errorCategory}</MessageBox>) :
                            (
                                categories.map((c) => (
                                    <li key={c}>
                                        <Link to={`/search/category/${c}`} onClick={() => props.closeSideBar(false)}>{c}</Link>
                                    </li>
                                ))
                            )
                }
            </ul>
            <ul className="categories none">
                <li>
                    <strong>Brands</strong>
                </li>
                {
                    loadingBrand ? (<LoadingBox />) :
                        errorBrand ? (<MessageBox variant="danger">{errorBrand}</MessageBox>) :
                            (
                                brands.map((b) => (
                                    <li key={b}>
                                        <Link to={`/search/brand/${b}`} onClick={() => props.closeSideBar(false)}>{b}</Link>
                                    </li>
                                ))
                            )
                }
            </ul>
        </aside>
    )
}
