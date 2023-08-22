import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import ProductContext from '../../../../Context/Product';
import '../../../../Public/Css/Product/UserProduct.css'
import { Link } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL
export default function SearchProduct() {
    const params = useParams();
    const { SearchResult, SearchProduct, LikeProducts, AddLikeProduct, ConvertToINR, DislikeProduct, AddProductToCart } = useContext(ProductContext);

    function CheckSearchResult() {
        if (SearchResult?.Results.length < 1) {
            SearchProduct(params.keyword);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        CheckSearchResult();
    }, []);
    return (
        <Layout title={"Search Result- MyTechHUB"}>
            <div className="container appfont">
                <div className='Search-Heading'>
                    {SearchResult?.Results.length < 1 ? 'No Product Found' : `${SearchResult.Results.length} Items Found`}
                </div>
                <div className="Product-List appfont">
                    {SearchResult.Results?.slice(0).reverse().map((product, index) => {
                        return (
                            <div key={index} className="Each-Product card">
                                <div className="product-img">
                                    <img className='product-img-size' src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
                                    <div className="Like-Product">
                                        {LikeProducts.some((item) => item?._id === product?._id) ?
                                            <i onClick={() => { DislikeProduct(product) }} className="fa-solid fa-heart" style={{ color: "#f1092c" }} /> :
                                            <i onClick={() => { AddLikeProduct(product) }} className="fa-regular fa-heart" />
                                        }
                                    </div>
                                </div>
                                <Link to={`/product/${product?.slug}`} className="product-body">
                                    <div className="product-model-rating">
                                        <span className='product-model'>Model {product?.model}</span>
                                        <span className='product-rating '><i className="fa-solid fa-star fa-2xs" />4+</span>
                                    </div>

                                    <div className="product-name">{product?.name}</div>
                                    <div className="product-price">
                                        <span className="New-Price">
                                            {ConvertToINR(product?.price)}
                                        </span>
                                        <span className="Old-Price">
                                            {ConvertToINR(product?.price + 100)}
                                        </span>
                                    </div>
                                    {product?.availability === 'Out Of Stock' &&
                                        <div className="Product-Availability">
                                            {product?.availability}
                                        </div>}
                                    <div className="product-description">{product?.description[0]}</div>
                                </Link>
                                <div className='Product-button' >
                                    <button onClick={() => { AddProductToCart(product) }} className="Add-to-cart-btn" disabled={product?.availability === 'Out Of Stock'}>Add to Cart</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    )
}
