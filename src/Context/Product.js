import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL

const ProductContext = createContext();

export function ProductState(props) {
    const { Auth } = useContext(AuthContext);
    const [AllCategories, setAllCategories] = useState([]);
    const [AllProducts, setAllProducts] = useState([]);
    const [SearchResult, setSearchResult] = useState({ Results: [] });


    /*http://localhost:5002 */

    async function GetAllCategories() {
        const Result = await axios.get(`${BASE_URL}/api/v1/category/showall-category`);
        if (Result?.data?.status === 'Pass') {
            setAllCategories(Result.data.categories);
        } else {
            toast.error(Result?.data?.message);
        }
    }

    async function AddNewCategory(newCategory) {
        const Result = await axios.post(`${BASE_URL}/api/v1/category/create-category`, { name: newCategory }, {
            headers: { Authorization: "Bearer " + Auth.token }
        });
        if (Result?.data?.status === "Pass") {
            GetAllCategories();
            toast.success(Result?.data?.message)
        } else {
            toast.error(Result?.data?.message)
        }
        return Result.data
    }

    async function DeleteCategory(id) {
        const Result = await axios.delete(`${BASE_URL}/api/v1/category/delete-category/${id}`, {
            headers: { Authorization: "Bearer " + Auth.token }
        });
        if (Result?.data?.status === 'Pass') {
            GetAllCategories();
            toast.success(Result?.data?.message);
        } else {
            toast.error(Result?.data?.message)
        }
    }

    async function UpdateCategory(id, UpdatedName) {
        const Result = await axios.put(`${BASE_URL}/api/v1/category/update-category/${id}`, { name: UpdatedName }, {
            headers: { Authorization: "Bearer " + Auth.token }
        });
        if (Result?.data?.status === 'Pass') {
            toast.success(Result?.data?.message);
            GetAllCategories();
        } else {
            toast.error(Result?.data?.message);
        }
    }

    async function AddNewProduct(formData) {
        try {
            const Result = await axios.post(`${BASE_URL}/api/v1/product/create-product`, formData, {
                headers: { Authorization: "Bearer " + Auth.token }
            });
            if (Result?.data?.status === 'Pass') {
                GetAllProducts();
                toast.success(Result?.data?.message);
            } else {
                toast.error(Result?.data?.message);
            }
            return Result.data
        } catch (error) { }

    }
    async function UpdateProduct(formData, Product_id) {
        const Result = await axios.put(`${BASE_URL}/api/v1/product/update-product/${Product_id}`, formData, {
            headers: { Authorization: "Bearer " + Auth.token }
        });
        if (Result?.data?.status === 'Pass') {
            GetAllProducts();
            toast.success(Result?.data?.message);
        } else {
            toast.error(Result?.data?.message);
        }
    }

    async function GetProductDetails(slug) {
        const Result = await axios.get(`${BASE_URL}/api/v1/product/single-product/${slug}`);
        if (Result?.data?.status === 'Pass') {
            return Result?.data?.product
        } else {
            toast.error(Result?.data?.message);
        }
    }
    async function GetRelatedProduct(CategoryId, ProductId) {
        const RelatedProduct = await axios.get(`${BASE_URL}/api/v1/product/related-product/${CategoryId}/${ProductId}`);
        if (RelatedProduct?.data?.status) {
            return RelatedProduct?.data?.products
        } else {
            toast.error(RelatedProduct.data.message)
        }
    }

    async function GetAllProducts() {
        const Result = await axios.get(`${BASE_URL}/api/v1/product/all-product`);
        if (Result?.data?.status === 'Pass') {
            setAllProducts(Result?.data?.products);
        }
        return Result
    }

    /* Category Products */
    const [CategoryProducts, setCategoryProduct] = useState([])
    async function SetCategoryWiseProduct(ID) {
        const Result = await axios.get(`${BASE_URL}/api/v1/product/getCategoryProducts/${ID}`);
        if (Result?.data?.status === 'Pass') {
            setCategoryProduct(Result?.data?.products);
        }
    }


    async function DeleteProduct(id) {
        const Result = await axios.delete(`${BASE_URL}/api/v1/product/Delete-product/${id}`,
            { headers: { Authorization: "Bearer " + Auth.token } });
        if (Result?.data?.status === 'Pass') {
            GetAllProducts();
            toast.success(Result?.data?.message, { style: { color: '#fff', borderRadius: '10px', background: '#333' } });
        } else {
            toast.error(Result?.data?.message);
        }
    }

    async function SearchProduct(SearchKeyword) {
        const Result = await axios.get(`${BASE_URL}/api/v1/product/search/${SearchKeyword}`);
        if (Result?.data?.status === 'Pass') {
            setSearchResult({ Results: Result?.data?.products });
            return true
        } else {
            toast.error(Result?.data?.message);
        }
    }

    // Filter Product
    const [FilteredResult, SetFilteredResult] = useState([]);
    async function FilterProducts(FilterData) {
        const Result = await axios.post(`${BASE_URL}/api/v1/product/filter-product`, FilterData,
            { headers: { 'Content-Type': 'application/json' } });
        if (Result?.data?.status === 'Pass') {
            SetFilteredResult(Result?.data?.products);
            return Result;
        } else {
            toast.error(Result?.data?.message);
        }
    }

    //Like Product
    const [LikeProducts, setLikeProducts] = useState([]);
    async function AddLikeProduct(Product) {
        localStorage.setItem('like', JSON.stringify([...LikeProducts, Product]))
        SetLikeProducts();
    }
    async function SetLikeProducts() {
        let ExistingLikeProducts = JSON.parse(localStorage.getItem('like'));
        if (ExistingLikeProducts) {
            setLikeProducts(ExistingLikeProducts)
        }
    }
    async function DislikeProduct(product) {
        const RemoveProduct = LikeProducts.filter(item => item?._id !== product?._id);
        localStorage.setItem('like', JSON.stringify(RemoveProduct))
        SetLikeProducts();
    }

    // Cart
    const [CartProducts, setCartProduct] = useState([]);
    async function AddProductToCart(CartItem) {
        if (!CartProducts.some(element => element._id === CartItem?._id)) {
            localStorage.setItem('cart', JSON.stringify([...CartProducts, CartItem]))
            SetCartItems();
            toast.success(`${CartItem?.name} Added to Cart`);
        } else {
            toast.error("The Product is Already added in Cart...")
        }
    }

    async function SetCartQuntity(CartItem, quantity) {
        const Cart = JSON.parse(localStorage.getItem('cart'));
        const productIndex = Cart.findIndex(product => product?._id === CartItem?._id);
        if (productIndex !== -1) {
            Cart[productIndex].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(Cart));
            SetCartItems(Cart);
        }
    }

    async function SetCartItems() {
        let ExistingCartItem = JSON.parse(localStorage.getItem('cart'))
        if (ExistingCartItem) {
            setCartProduct(ExistingCartItem);
        } else {
            setCartProduct([])
        }
    }
    async function RemoveProductCart(CartItem) {
        const remove = CartProducts.filter(item => item?._id !== CartItem?._id);
        localStorage.setItem('cart', JSON.stringify(remove))
        SetCartItems();
        toast.success(`${CartItem?.name} Removed From Cart`)
    }

    //Total Price 
    function ConvertToINR(Amount) {
        let price = 0;
        if (Amount) {
            price = Amount.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        }

        return price
    }




    useEffect(() => {
        SetCartItems();
        SetLikeProducts();
        GetAllCategories();
        GetAllProducts();
    }, []);

    return (
        <ProductContext.Provider value={{
            AddNewProduct, AllCategories, AllProducts, UpdateProduct, GetProductDetails, DeleteProduct,
            AddNewCategory, DeleteCategory, UpdateCategory, GetRelatedProduct, ConvertToINR,
            SearchProduct, SearchResult,
            LikeProducts, AddLikeProduct, DislikeProduct,
            CartProducts, AddProductToCart, RemoveProductCart, SetCartQuntity, SetCartItems,
            FilteredResult, FilterProducts,
            CategoryProducts, SetCategoryWiseProduct
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContext