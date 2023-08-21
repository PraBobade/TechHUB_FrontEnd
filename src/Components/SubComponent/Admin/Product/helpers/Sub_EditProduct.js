import React, { useState, useEffect, useContext } from 'react'
import ProductContext from '../../../../../Context/Product';
const BASE_URL = process.env.REACT_APP_BASE_URL


export default function Sub_EditProduct({ slug }) {
    const { AllCategories, UpdateProduct, GetProductDetails } = useContext(ProductContext);
    const [loading, setloading] = useState(false);
    const [UpdatedProductTag, SetUpdatedProductTag] = useState([]);
    const [InputText, SetInputText] = useState('');

    const WordLimit = 160;

    const MobileBrands = ["Apple", "Samsung", "OnePlus", 'MI', "Google", "Sony", "Nokia", "Oppo", "Realme"]
    const LaptopBrands = ["HP", "Dell", "Samsung", "Lenovo", "Apple", "Asus", "Acer", "Microsoft", "MSI", "LG", "Razer"];
    const HeadphoneBrands = ["boAt", "JBL", "Sony", "Bose", "Philips", "Beats by Dre", "Audio-Technica", "CrossBeats"];
    const WatchBrands = ["Titan", 'Galaxy', "Fossil", "Timex", "FastTrack", "Sonata", "Rolex"];
    //For Brand List 
    const [CategoryName, SetCategoryName] = useState('')

    const [UpdatedProduct, setUpdatedProduct] = useState({
        UpdatedProductID: '', UpdatedName: '', UpdatedCategory: '', UpdatedAvailability: "", UpdatedBrand: '', UpdatedPrice: '', UpdatedPhoto: '', UpdatedCategoryID: '', UpdatedModel: '', UpdatedDescription: [],
    });
    const { UpdatedProductID, UpdatedName, UpdatedCategory, UpdatedAvailability, UpdatedDescription, UpdatedBrand, UpdatedPrice, UpdatedPhoto, UpdatedCategoryID, UpdatedModel } = UpdatedProduct;

    async function GetProduct(slug) {
        const PDetails = await GetProductDetails(slug);
        setUpdatedProduct({
            ...UpdatedProduct,
            UpdatedProductID: PDetails?._id,
            UpdatedName: PDetails?.name,
            UpdatedCategory: PDetails?.category?.name,
            UpdatedAvailability: PDetails?.availability,
            UpdatedPrice: PDetails?.price,
            UpdatedModel: PDetails?.model,
            UpdatedBrand: PDetails?.brand,
            UpdatedDescription: PDetails?.description
        });
        SetUpdatedProductTag(PDetails?.tag);
        SetCategoryName(PDetails?.category?.name)
    }


    async function handleSubmit(event) {
        setloading(true);
        event.preventDefault();
        const formData = new FormData();
        formData.append('photo', UpdatedPhoto);
        formData.append('model', UpdatedModel);
        formData.append('name', UpdatedName);
        formData.append('availability', UpdatedAvailability);
        formData.append('price', UpdatedPrice);
        formData.append('brand', UpdatedBrand);
        formData.append('description', JSON.stringify(UpdatedDescription));
        formData.append('category', UpdatedCategoryID);
        formData.append('tag', JSON.stringify(UpdatedProductTag));

        await UpdateProduct(formData, UpdatedProductID);
        setloading(false);
    }


    async function AddNewDescription(event) {
        event.preventDefault();
        setUpdatedProduct({ ...UpdatedProduct, UpdatedDescription: [...UpdatedDescription, ''] })
    }
    const HandleDescriptionChange = (event, index) => {
        event.preventDefault();
        const values = [...UpdatedDescription];
        values[index] = event.target.value;
        if (index === 0) {
            if (values[0].length <= WordLimit) {
                setUpdatedProduct({ ...UpdatedProduct, UpdatedDescription: values });
            }
        } else {
            setUpdatedProduct({ ...UpdatedProduct, UpdatedDescription: values });
        }
    };
    async function DeleteDescription(event, index) {
        event.preventDefault();
        const values = [...UpdatedDescription];
        values.splice(index, 1);
        setUpdatedProduct({ ...UpdatedProduct, UpdatedDescription: values });
    }

    function RemoveTag(index) {
        const TagList = UpdatedProductTag.filter((Tag) => (Tag !== UpdatedProductTag[index]));
        SetUpdatedProductTag(TagList);
    }
    useEffect(() => {
        GetProduct(slug);
    }, [slug]);


    return (

        <form className='Form appfont'>
            <div className="Form-Heading">
                Edit Product
            </div>
            <hr className='FormHR' />
            <div className="Form-Field">
                <label className="Field-Label" htmlFor="ProductName">Name : </label>
                <input type="text" value={UpdatedName}
                    onChange={(event) => { setUpdatedProduct({ ...UpdatedProduct, UpdatedName: event.target.value }) }}
                    className="Field-Input" id="ProductName" />
            </div>

            <div className="Form-Field">
                <label className="Field-Label" htmlFor="Category">Category : </label>
                <select className="Field-Input" id='Category'
                    onChange={(event) => {
                        setUpdatedProduct({ ...UpdatedProduct, UpdatedCategoryID: event.target.value });
                        SetCategoryName(event.target.options[event.target.selectedIndex].text);
                    }}>
                    <option value={UpdatedCategory} defaultValue>{UpdatedCategory}</option>
                    {AllCategories.map((cate) => {
                        return <option key={cate._id} value={cate._id}>{cate.name}</option>
                    })}
                </select>
            </div>
            <div className="Form-Field">
                <label className="Field-Label" htmlFor="availability">Avaibality </label>
                <select className="Field-Input"
                    onChange={(event) => {
                        setUpdatedProduct({ ...UpdatedProduct, UpdatedAvailability: event.target.value })
                    }}
                    id="availability">
                    <option value={UpdatedAvailability} defaultValue>{UpdatedAvailability}</option>
                    <option value='In Stock'>In Stock</option>
                    <option value='Out Of Stock'>Out Of Stock</option>
                </select>
            </div>

            <div className="Form-Field">
                <label className="Field-Label" htmlFor="Description">Description</label>
                <div className="Description-List">
                    <textarea className='Field-Input' rows="6" cols="50" value={UpdatedDescription[0]}
                        onChange={(event) => { HandleDescriptionChange(event, 0) }} />
                    <small style={{ width: '50%' }} className="show-password ">{UpdatedDescription[0]?.length}/{WordLimit}</small>

                    <div className="Description-Add">
                        <div></div>
                        <button onClick={AddNewDescription} className="Description-Add-btn">Add Point</button>
                    </div>
                    {UpdatedDescription.slice(1).map((val, index) => {
                        return (
                            <div className="Description-Points" key={"dsfdsf" + index}>
                                <div className="Description-Input">
                                    <input className='Description-Field-Input' value={val} placeholder={`Add More Points`} onChange={(event) => { HandleDescriptionChange(event, index + 1) }} type="text" />
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
            </div>

            <div className="row">
                <div className="col-md-4 Form-Field">
                    <label className="Field-Label" htmlFor="Brand">Brand </label>
                    <select className="Field-Input"
                        onChange={(event) => {
                            setUpdatedProduct({ ...UpdatedProduct, UpdatedBrand: event.target.value });
                        }}
                        id="Brand">
                        <option value={UpdatedBrand} defaultValue>{UpdatedBrand}</option>
                        {CategoryName === 'Mobile' ?
                            <> {MobileBrands.map((bran) => {
                                return <option key={bran} value={bran}>{bran}</option>
                            })}
                            </> : (CategoryName === 'Laptop' ?
                                <> {LaptopBrands.map((bran) => {
                                    return <option key={bran} value={bran}>{bran}</option>
                                })}
                                </> : (CategoryName === 'Headphone' ?
                                    <> {HeadphoneBrands.map((bran) => {
                                        return <option key={bran} value={bran}>{bran}</option>
                                    })}
                                    </> : (CategoryName === 'Watch' ?
                                        <> {WatchBrands.map((bran) => {
                                            return <option key={bran} value={bran}>{bran}</option>
                                        })}
                                        </> : <></>
                                    )))}
                    </select>
                </div>
                <div className="col-md-4 Form-Field">
                    <label className="Field-Label" htmlFor="update-price">Price : </label>
                    <input type="number" className="Field-Input" id='update-price' value={UpdatedPrice}
                        onChange={(event) => { setUpdatedProduct({ ...UpdatedProduct, UpdatedPrice: event.target.value }) }} />
                </div>
                <div className="col-md-3 Form-Field">
                    <label className="Field-Label" htmlFor="update-model">Model : </label>
                    <input type="text" value={UpdatedModel} className="Field-Input" id='update-model'
                        onChange={(event) => { setUpdatedProduct({ ...UpdatedProduct, UpdatedModel: event.target.value }) }} />
                    <small style={{ width: '50%' }} className="show-password ">{UpdatedModel.length}/10</small>
                </div>
            </div>

            <div className="Tag Form-Field">
                <label className="Field-Label" htmlFor="Tag-Input">Add Tags</label>
                <div className="Tag-Add-Input">
                    <input id='Tag-Input' type="text" value={InputText} className="Field-Input Tag-Input"
                        onChange={(event) => { SetInputText(event.target.value); }} />
                    <button onClick={(event) => {
                        event.preventDefault();
                        if (InputText.trim() !== '') {
                            SetUpdatedProductTag((prevArray) => [...prevArray, InputText]);
                            SetInputText('')
                        }
                    }} className="Tag-Button">Add</button>
                </div>
                <div className="Tag-List">
                    {UpdatedProductTag.map((text, index) => {
                        return (
                            <div key={index} className="Tag-Name-Remove">
                                <div className='Tag-Name'>{text}</div>
                                <i onClick={() => { RemoveTag(index) }} className="fas fa-times Remove-Tag" />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="Update-Photo">
                <label htmlFor="Photo" className="Field-Label">Image : </label>
                <div className="Field-Update-Photo" id='Photo'>
                    <div className="Image-Input" >
                        <input type="file" accept='image/*' className="Field-Input photo-image-input"
                            onChange={(event) => { setUpdatedProduct({ ...UpdatedProduct, UpdatedPhoto: event.target.files[0] }) }} />
                    </div>
                    {UpdatedProductID && <>
                        {UpdatedPhoto === '' ?
                            <img
                                className='Update-Field-Photo-Size img img-responsive'
                                src={`${BASE_URL}/api/v1/product/product-photo/${UpdatedProductID}`}
                                alt={UpdatedName}
                            />
                            :
                            <img
                                className='Update-Field-Photo-Size img img-responsive'
                                src={URL.createObjectURL(UpdatedPhoto)} alt={UpdatedName}
                            />
                        }   </>}
                </div>
            </div>
            <hr className='FormHR' />


            <div className="Button-Field">
                <button onClick={handleSubmit} type="submit" className="Form-Save-Button" disabled={loading}>
                    {loading ?
                        <i className="fa-solid fa-spinner fa-spin-pulse" />
                        : <>Update Product</>
                    }
                </button>

            </div>
            <hr className='FormHR' />
        </form>

    )
}
