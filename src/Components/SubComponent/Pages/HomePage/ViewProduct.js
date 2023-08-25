import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../../Layout/Layout'
import { useParams } from 'react-router-dom';
import ProductContext from '../../../../Context/Product';
import RelatedProduct from './Helper/Sub_RelatedProduct';
import ProductInfo from './Helper/Sub_ProductDetails';

export default function ProductDetails() {
    const params = useParams();
    const { GetProductDetails, ConvertToINR, GetRelatedProduct, LikeProducts, AddLikeProduct, DislikeProduct, AddProductToCart } = useContext(ProductContext);
    const [productDetail, setProductDetail] = useState();
    const [relatedProduct, setRelatedProducts] = useState([]);


    async function GetProduct() {
        const Result = await GetProductDetails(params.slug);
        setProductDetail(Result);
        const RelatedProduct = await GetRelatedProduct(Result?.category?._id, Result?._id, Result.brand);
        setRelatedProducts(RelatedProduct);
    }
    useEffect(() => {
        GetProduct();
    }, [params]);

    return (
        <Layout title={'Product details : MyTechHub'}>
            <div className="container">
                <ProductInfo product={productDetail} AddToCart={AddProductToCart} AddLikeProduct={AddLikeProduct} LikeProducts={LikeProducts} DislikeProduct={DislikeProduct} ConvertToINR={ConvertToINR} />
                <RelatedProduct RelatedProducts={relatedProduct} AddLikeProduct={AddLikeProduct} LikeProducts={LikeProducts} DislikeProduct={DislikeProduct} ConvertToINR={ConvertToINR} />
            </div>
        </Layout>
    )
}
