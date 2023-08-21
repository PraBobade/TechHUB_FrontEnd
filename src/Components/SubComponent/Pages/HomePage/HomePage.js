import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../../Layout/Layout'
import ProductContext from '../../../../Context/Product'
import '../../../../Public/Css/HomePage/HomePage.css'
import BlogImg1 from '../../../../Public/Images/Blog-1.jpg'
import BlogImg2 from '../../../../Public/Images/Blog-2.jpg'
import Laptop from '../../../../Public/Images/Home-Laptop.jpg'
import Watch from '../../../../Public/Images/Home-Watch.jpg'
import Mobile from '../../../../Public/Images/Home-Mobile.jpg'
import Headphone from '../../../../Public/Images/Home-Headphone.jpg'

import Caro1 from '../../../../Public/Images/Caro1.webp'
import Caro2 from '../../../../Public/Images/Caro2.webp'
import Caro3 from '../../../../Public/Images/Caro3.webp'
import Caro4 from '../../../../Public/Images/Caro4.jpg'

import Home_Advertise from '../Advertise/Home_Advertise.js'
import Watch_Advertise from '../Advertise/Watch_Advertise'

const BASE_URL = process.env.REACT_APP_BASE_URL

export default function UsersHomePage() {
    const { SetCategoryWiseProduct, AllCategories, AllProducts, AddLikeProduct, DislikeProduct, LikeProducts } = useContext(ProductContext);
    const CategoryImg = [Watch, Laptop, Mobile, Headphone];
    const CategoryTitle = ['Stay on Time and on Trend with Stylish Watches', 'Choose from a Wide Range of Feature-Rich Laptops',
        'Stay Connected with the Latest Mobile Devices', 'Immerse Yourself in High-Quality Sound'];


    return (
        <Layout>
            <div className="HomePage appfont">
                <div className="First-Content appfont">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={Caro1} alt="Second slide" />
                                <div className="Carousel-Caption">
                                    <h2 className='Caro-Heading'>Branded Watches</h2>
                                    <p className='Caro-SubHeading' >Start your everyday wellness journey</p>
                                    <Link to={`/category/647a162d6648621f023de865`} className='Caro-Links'>
                                        <h5 className='Caro-Links-Btn'>Shop Now</h5>
                                        <h5 className='Caro-Links-Btn'>Learn More</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={Caro2} alt="Third slide" />
                                <div className="Carousel-Caption">
                                    <h2 className='Caro-Heading'>Galaxy Z Fold5</h2>
                                    <p className='Caro-SubHeading' >PC-like power in your pocket</p>
                                    <Link to={`/product/Samsung-Galaxy-Z-Fold`} className='Caro-Links'>
                                        <h5 className='Caro-Links-Btn'>Shop Now</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={Caro4} alt="Third slide" />
                                <div className="Carousel-Caption">
                                    <h2 className='Caro-Heading'>Galaxy Tab S9 Series</h2>
                                    <p className='Caro-SubHeading' >The new standard of premium tablets.</p>
                                    <Link to={`/category/649d48ef67488427e19d3358`} className='Caro-Links'>
                                        <h5 className='Caro-Links-Btn'>Shop Now</h5>
                                        <h5 className='Caro-Links-Btn'>Learn More</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={Caro3} alt="First slide" />
                                <div className="Carousel-Caption">
                                    <h2 className='Caro-Heading'>Buds2 Pro</h2>
                                    <p className='Caro-SubHeading' >
                                        The ultimate Hi-Fi sound now wirelessly</p>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                <div className="container">
                    <div className="Second-Content">
                        {AllCategories?.slice(0, 4).map((item, index) => {
                            return (
                                <Link className="Category-Block" onClick={() => { SetCategoryWiseProduct(item._id) }} key={item._id} to={`/category/${item._id}`} style={{ backgroundColor: 'rgb(245 245 245)' }}>
                                    <h4 className="Category-Heading">{item.name}</h4>
                                    <p className="Category-Title">{CategoryTitle[index]}</p>
                                    <div className='Category-Image'>
                                        <img className='Home-CategoryImage-Size' src={CategoryImg[index]} alt="" />
                                    </div>
                                </Link>)
                        })}
                    </div>

                    <div className="Six-Content">
                        <Watch_Advertise />
                    </div>

                    <div className="Third-Content appfont">
                        <div className="Support-Block" style={{ borderLeft: 'solid 1px #dbd2d2' }}>
                            <div className="Support-Logo">
                                <i className="Support-Logo-Size fa-solid fa-headset" />
                            </div>
                            <span className="Support-Heading">24X7 Free Support</span>
                            <span className="Support-Title">Online Support 24/7</span>
                        </div>
                        <div className="Support-Block">
                            <div className="Support-Logo">
                                <i className="Support-Logo-Size fa-solid fa-right-left" />
                            </div>
                            <span className="Support-Heading">Easy Return / Exchange</span>
                            <span className="Support-Title">100% Secure Payment</span>
                        </div>
                        <div className="Support-Block">
                            <div className="Support-Logo">
                                <i className="Support-Logo-Size fa-solid fa-truck-fast" />
                            </div>
                            <span className="Support-Heading">Free India Shipping</span>
                            <span className="Support-Title">On Order Over ₹1000</span>
                        </div>
                        <div className="Support-Block">
                            <div className="Support-Logo">
                                <i className="Support-Logo-Size fa-solid fa-gift"></i>
                            </div>
                            <span className="Support-Heading">Special Gift Cards</span>
                            <span className="Support-Title">Give The Perfect Gift</span>
                        </div>
                    </div>

                    <div className="Forth-Content appfont">
                        <h2 className="Forth-Content-Heading">New Products</h2>
                        <div className="Content-Products">
                            <div className="Product-List">
                                {AllProducts.slice(-4).reverse().map((product, index) => {
                                    return (
                                        <div key={index} className="Each-Product card">
                                            <div className="product-img">
                                                <img className='product-img-size' src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`} alt={product.name} />
                                                <div className="Like-Product">
                                                    {LikeProducts.some((item) => item._id === product._id) ?
                                                        <i onClick={() => { DislikeProduct(product) }} className="fa-solid fa-heart" style={{ color: "#f1092c" }} /> :
                                                        <i onClick={() => { AddLikeProduct(product) }} className="fa-regular fa-heart" />
                                                    }
                                                </div>
                                            </div>
                                            <Link to={`/product/${product.slug}`} className="product-body">
                                                <div className="product-model-rating">
                                                    <span className='product-model'>Model {product?.model}</span>
                                                    <span className='product-rating '><i className="fa-solid fa-star" />4+</span>
                                                </div>

                                                <div className="product-name">{product?.name}</div>
                                                <div className="product-price">
                                                    <span className="New-Price">
                                                        ₹ {product.price}
                                                    </span>
                                                    <span className="Old-Price">
                                                        ₹{product.price + 100}
                                                    </span>
                                                </div>
                                                {product?.availability === 'Out Of Stock' &&
                                                    <div className="Product-Availability">
                                                        {product?.availability}
                                                    </div>}
                                                <div className="product-description">{product?.description[0]}</div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="Six-Content">
                        <Home_Advertise />
                    </div>
                    <div className="Fifth-Content">
                        <h2 className="Fifth-Content-Heading">
                            Latest Blogs
                        </h2>
                        <div className="Blogs">
                            <div className="blog1">
                                <div className="blog-img">
                                    <img className='blog-img-size' src={BlogImg1} alt="" />
                                </div>
                                <div className="blog-body">
                                    <h4 className="blog-heading">
                                        Proactive Tips for Protecting Your Data While Working on the Go
                                    </h4>
                                    <p className="blog-content">Lorem g elit. repellenduerum recusandae earum, laudantium sunt.lorem15 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus veniam delectus et in. Modi, soluta. laboriosam sit iusto vero velit! Corporis, rudantium sint, Lorem, ipsum dolor sit amet consecteta ea quam enim quo eveniet!</p>
                                </div>
                            </div>
                            <div className="blog2">
                                <div className="blog-img">
                                    <img className='blog-img-size' src={BlogImg2} alt="" />
                                </div>
                                <div className="blog-body">
                                    <h4 className="blog-heading">
                                        Proactive Tips for Protecting Your Data While Working on the Go
                                    </h4>
                                    <p className="blog-content">Lorem g elae earum, laudantium sunt.lorem15 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus veniam delectus et in. Modi, soluta.laboriosam sit iusto vero velit! Corporis, rudantium sint, Lorem, ipsum dolor sit amet consecteta ea quam enim quo eveniet!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}
