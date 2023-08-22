import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Preview from './Sub_Preview';
import ProductContext from '../../../../../Context/Product.js';
import AuthContext from '../../../../../Context/AuthContext';

export default function AddProductForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { AddNewProduct, AllCategories } = useContext(ProductContext);
    const { Auth } = useContext(AuthContext);
    const [loading, setloading] = useState(false);

    const WordLimit = 160;

    const MobileBrands = ["Apple", "Samsung", "OnePlus", 'MI', "Google", "Sony", "Nokia", "Oppo", "Realme"]
    const LaptopBrands = ["HP", "Dell", "Samsung", "Lenovo", "Apple", "Asus", "Acer", "Microsoft", "MSI", "LG", "Razer"];
    const HeadphoneBrands = ["boAt", "JBL", "Sony", "Bose", "Philips", "Beats by Dre", "Audio-Technica", "CrossBeats"];
    const WatchBrands = ["Titan", 'Galaxy', "Fossil", "Timex", "FastTrack", "Sonata", "Rolex"];

    const [productDetail, setProductDetail] = useState({
        name: '', photo: '', categoryID: '', availability: 'In Stock', price: '',
        description: ['Short Product Description', "Description Point 1"], model: '', brand: ''
    });
    const { name, photo, availability, categoryID, price, brand, description, model } = productDetail;

    //For Brand List 
    const [CategoryName, SetCategoryName] = useState('')

    const [ProductTag, SetProductTag] = useState([]);
    const [InputText, SetInputText] = useState('');

    async function handleSubmit(event) {
        setloading(true);
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('photo', photo);
        formData.append('price', price);
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('availability', availability);
        formData.append('description', JSON.stringify(description));
        formData.append('tag', JSON.stringify(ProductTag));
        formData.append('category', categoryID);

        const Result = await AddNewProduct(formData);
        setloading(false);
        if (Result?.status === 'Pass') {
            const UrlPath = location.state;
            navigate(UrlPath || `/admin/${Auth?.user?.UserID}/product-list`);
        }
    }

    async function AddNewDescription(event) {
        event.preventDefault();
        setProductDetail({ ...productDetail, description: [...description, ''] })
    }

    const handleInputChange = (event, index) => {
        const values = [...description];
        values[index] = event.target.value;
        if (index === 0) {
            if (values[0].length <= WordLimit) {
                setProductDetail({ ...productDetail, description: values });
            }
        } else {
            setProductDetail({ ...productDetail, description: values });
        }
    };
    async function DeleteDescription(event, index) {
        event.preventDefault();
        const values = [...description];
        values.splice(index, 1);
        setProductDetail({ ...productDetail, description: values });
    }
    async function AddNewTagInList(event, TagName) {
        event.preventDefault();
        if (TagName.trim() !== '') {
            SetProductTag((prevArray) => [...prevArray, TagName]);
            SetInputText('')
        }
    }

    function RemoveTag(index) {
        const TagList = ProductTag.filter((Tag) => (Tag !== ProductTag[index]));
        SetProductTag(TagList);
    }


    return (
        <form className='Form appfont'>
            <div className="Form-Heading">
                Add New Product
            </div>
            <hr className='FormHR' />
            <div className="Form-Field">
                <label className="Field-Label" htmlFor="Name">Name </label>
                <input className="Field-Input" type="text" value={name} onChange={(event) => { setProductDetail({ ...productDetail, name: event.target.value }); }} id="Name" placeholder="Enter Name" />
            </div>

            <div className="Form-Field">
                <label className="Field-Label" htmlFor="Category">Category </label>
                <select className="Field-Input"
                    onChange={(event) => {
                        setProductDetail({ ...productDetail, categoryID: event.target.value });
                        SetCategoryName(event.target.options[event.target.selectedIndex].text);
                        AddNewTagInList(event, event.target.options[event.target.selectedIndex].text);
                    }}
                    id="Category">
                    <option value='default' defaultValue>Select Category</option>
                    {AllCategories.map((cate) => {
                        return <option key={cate._id} value={cate._id} name={cate.name}>{cate.name}</option>
                    })}
                </select>
            </div>
            <div className="Form-Field">
                <label className="Field-Label" htmlFor="availability">Avaibality </label>
                <select className="Field-Input"
                    onChange={(event) => {
                        setProductDetail({ ...productDetail, availability: event.target.value })
                    }}
                    id="availability">
                    <option value='In Stock'>In Stock</option>
                    <option value='Out Of Stock'>Out Of Stock</option>
                </select>
            </div>
            <div className="Form-Field">
                <label className="Field-Label" htmlFor="Description">Description</label>
                <div className="DescriptionBlock">
                    <textarea className='Field-Input' rows="6" cols="50" value={description[0]}
                        onChange={(event) => { handleInputChange(event, 0) }} />
                    <small style={{ width: '50%' }} className="show-password ">{description[0].length}/{WordLimit}</small>
                    <small style={{ width: '60%' }} className="show-password ">This is the Product short Description, Add short Points About the Product.</small>
                    <div className="Handle-Description">
                        <div className="Description-List">
                            {description.slice(1).map((val, index) => {
                                return (
                                    <div className="Description-Points" key={index}>
                                        <div className="Description-Input">
                                            <input className='Description-Field-Input' value={val} placeholder={`Description Point ${index + 1}`}
                                                onChange={(event) => {
                                                    handleInputChange(event, index + 1)
                                                }} type="text" />
                                        </div>
                                        <div className="Description-Icon">
                                            <i className="Delete-Description-Icon fa-solid fa-trash-can fa-lg"
                                                onClick={(event) => {
                                                    DeleteDescription(event, index + 1);
                                                }}></i>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="Description-btn">
                            <button onClick={AddNewDescription} className="Description-Add-btn">Add Point</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-md-4 Form-Field">
                    <label className="Field-Label" htmlFor="Brand">Brand </label>
                    <select className="Field-Input"
                        onChange={(event) => {
                            setProductDetail({ ...productDetail, brand: event.target.value });
                            AddNewTagInList(event, event.target.value);
                        }}
                        id="Brand">
                        <option value='default' defaultValue>Select Brand</option>
                        {CategoryName === 'Mobile' ? <>
                            {MobileBrands.map((bran) => {
                                return <option key={bran} value={bran}>{bran}</option>
                            })}
                        </> : (CategoryName === 'Laptop' ? <>
                            {LaptopBrands.map((bran) => {
                                return <option key={bran} value={bran}>{bran}</option>
                            })}
                        </> : (CategoryName === 'Headphone' ? <>
                            {HeadphoneBrands.map((bran) => {
                                return <option key={bran} value={bran}>{bran}</option>
                            })}</> : (CategoryName === 'Watch' ?
                                <> {WatchBrands.map((bran) => {
                                    return <option key={bran} value={bran}>{bran}</option>
                                })}
                                </> : <></>
                        )))}
                    </select>
                </div>

                <div className="col-md-4 Form-Field">
                    <label className="Field-Label" htmlFor="Price">Price </label>
                    <input type="number" id="Price" className="Field-Input" placeholder="Product Price" value={price}
                        onChange={(event) => {
                            setProductDetail({ ...productDetail, price: event.target.value })
                        }} />
                </div>

                <div className="col-md-3 Form-Field">
                    <label className="Field-Label" htmlFor="Model">Model </label>
                    <input value={model} type="text" className="Field-Input" id='Model' placeholder='Product Model'
                        onChange={(event) => {
                            setProductDetail({ ...productDetail, model: event.target.value });
                        }} />
                    <small style={{ width: '50%' }} className="show-password ">{model.length}/10</small>
                </div>
            </div>

            <div className="Tag Form-Field">
                <label className="Field-Label" htmlFor="Tag-Input">Add Tags</label>
                <div className="Tag-Add-Input">
                    <input id='Tag-Input' type="text" value={InputText} className="Field-Input Tag-Input"
                        onChange={(event) => { SetInputText(event.target.value); }} />
                    <button onClick={(event) => AddNewTagInList(event, InputText)} className="Tag-Button">Add</button>
                </div>
                <small style={{ width: '40%' }} className="show-password ">These Tag Helps To Find the Product</small>
                <div className="Tag-List">
                    {ProductTag.length === 0 && <div className='Tag-Name-Remove'>
                        <div className='Tag-Name'> No Tag Added</div>
                    </div>}
                    {ProductTag?.map((text, index) => {
                        return (
                            <div key={index} className="Tag-Name-Remove">
                                <div className='Tag-Name'>{text}</div>
                                <i onClick={() => { RemoveTag(index) }} className="fas fa-times Remove-Tag" />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="Product-Image Form-Field">
                <label className="Field-Label">Image </label>

                <div className="Image-Input" >
                    <input type="file" accept='image/*'
                        onChange={(event) => {
                            setProductDetail({ ...productDetail, photo: event.target.files[0] })
                        }}
                        className="Field-Input photo-image" />

                    <div className="Preview">
                        {photo && <Preview ProductPhoto={photo} />}
                    </div>
                </div>

            </div>
            <div className="Button-Field">
                <button onClick={handleSubmit} type="submit" className="Form-Save-Button" disabled={loading}>
                    {loading ?
                        <i className="fa-solid fa-spinner fa-spin-pulse" />
                        : <>Add Product</>
                    }
                </button>
            </div>
            <hr className='FormHR' />
        </form>
    )
}
