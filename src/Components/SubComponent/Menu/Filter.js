import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../../Context/Product'
import { useParams } from 'react-router-dom';
import '../../../Public/Css/Menu/Filter.css'

export default function FilterProduct() {
    const { FilterProducts, AllCategories } = useContext(ProductContext);

    const params = useParams();
    const CategoryID = params.id;


    const MobileBrands = ["Apple", "Samsung", "OnePlus", 'MI', "Google", "Sony", "Nokia", "Oppo", "Realme"]
    const LaptopBrands = ["HP", "Dell", "Samsung", "Lenovo", "Apple", "Asus", "Acer", "Microsoft", "MSI", "LG", "Razer"];
    const HeadphoneBrands = ["boAt", "JBL", "Sony", "Bose", "Philips", "Beats by Dre", "Audio-Technica", "CrossBeats"];
    const WatchBrands = ["Titan", 'Galaxy', "Fossil", "Timex", "FastTrack", "Sonata", "Rolex"];

    const [BrandList, setBrandList] = useState(['Not Available']);


    async function GetBrandList() {
        var Category = await AllCategories.find(cat => cat._id === CategoryID);
        var CategoryName = Category?.name
        if (CategoryName === "Mobile") {
            setBrandList(MobileBrands)
        } else if (CategoryName === 'Laptop') {
            setBrandList(LaptopBrands)
        } else if (CategoryName === 'Headphone') {
            setBrandList(HeadphoneBrands)
        } else if (CategoryName === 'Watch') { setBrandList(WatchBrands) }
    }

    const Prices = [
        { id: "11", name: '1000-4999', range: [1000, 4999] },
        { id: "12", name: '5000-9999', range: [5000, 9999] },
        { id: "13", name: '10000-19999', range: [10000, 19999] },
        { id: "14", name: '20000-49999', range: [20000, 49999] },
        { id: "15", name: '50000+', range: [50000, 1000000] }
    ]
    const BatteryInMAH = [
        { name: '2000 - 2999 mAh', range: [2000, 2999] },
        { name: '3000 - 3999 mAh', range: [3000, 3999] },
        { name: '4000 - 4999 mAh', range: [4000, 4999] },
        { name: '5000 - 5999 mAh', range: [5000, 5999] },
        { name: '6000 mAh & Above', range: [6000, 8000] }
    ]
    const Discount = ['50% or more', '40% or more', '30% or more', '20% or more', '10% or more']

    const [PriceRange, setPriceRange] = useState([]);
    const [BrandName, setBrandName] = useState([]);
    const [availability, setAvailability] = useState('');
    const [Battery, setBattery] = useState([]);
    const [dis, setDiscount] = useState('');

    function handleSet(isChecked, ListItem) {
        if (isChecked) { setBrandName((brn) => [...brn, ListItem]); }
        else { setBrandName((brn) => brn.filter((item) => item !== ListItem)); }
    }

    function ResetData() {
        setPriceRange([]);
        setBrandName([]);
        setBattery([]);
        setDiscount('');
        setAvailability('');
    }


    async function Apply() {
        const RequiredItems = { category: CategoryID, PriceRange, availability, brand: BrandName, battery: Battery };
        await FilterProducts(RequiredItems);
    }

    useEffect(() => {
        Apply();
    }, [PriceRange, BrandName, availability, Battery]);

    useEffect(() => {
        GetBrandList();
    }, [AllCategories])

    return (
        <div className="Filter-Menu Menu appfont">
            <ol className="MenuItem MenuItem-1">
                <div className="Menu-Heading"> Price </div>
                <div className="List">
                    {Prices.map((num, index) => {
                        return (
                            <li key={`keyprice${index}`} className='List-Item'>
                                <input className='List-Input' type="radio" id={num.id}
                                    value={JSON.stringify(num.range)}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setPriceRange(JSON.parse(event.target.value));
                                    }}
                                    checked={JSON.stringify(PriceRange) === JSON.stringify(num.range)}
                                />
                                <label className='List-Item-Label' htmlFor={num.id}>{num.name}</label>
                            </li>)
                    })}
                </div>
            </ol>

            <ol className="MenuItem MenuItem-2">
                <div className="Menu-Heading"> Brand</div>
                <div className="List">
                    {BrandList.map((brn, index) => {
                        return (
                            <li key={`keybrand${index}`} className='List-Item'>
                                <input className='List-Input' type="checkbox" id={`brand${index}`} value={brn}
                                    onChange={(event) => {
                                        handleSet(event.target.checked, brn);
                                    }}
                                    checked={BrandName.includes(brn)}
                                />
                                <label className='List-Item-Label' htmlFor={`brand${index}`}>{brn}</label>
                            </li>)
                    })}
                </div>
            </ol>
            <ol className="MenuItem MenuItem-3">
                <div className="Menu-Heading"> Availability</div>
                <div className="List">
                    <li className='List-Item'>
                        <input type="checkbox" className="List-Input" id='Availability' value={availability}
                            onChange={() => {
                                setAvailability(availability === '' ? 'Out Of Stock' : '');
                            }} checked={availability === 'Out Of Stock'} />
                        <label htmlFor="Availability" className="List-Item-Label">Exclude Out of Stock</label>
                    </li>
                </div>
            </ol>

            <ol className="MenuItem MenuItem-4">
                <div className="Menu-Heading">Battery </div>
                <div className="List">
                    {BatteryInMAH.map((bat, index) => {
                        return (
                            <li key={`keybattery${index}`} className='List-Item'>
                                <input className='List-Input' type="radio" id={`bat${index}`} value={bat.range}
                                    onChange={() => { setBattery(bat.range) }}
                                    checked={JSON.stringify(Battery) === JSON.stringify(bat.range)} />
                                <label className='List-Item-Label' htmlFor={`bat${index}`}>{bat.name}</label>

                            </li>)
                    })}
                </div>
            </ol>
            <ol className="MenuItem MenuItem-5">
                <div className="Menu-Heading">Discount </div>
                <div className="List">
                    {Discount.map((bran, index) => {
                        return (
                            <li key={`keydiscount${index}`} className='List-Item'>
                                <input className='List-Input' type="radio" id={`dis${index}`} value={dis}
                                    onChange={() => { setDiscount(bran) }} checked={dis === bran} />
                                <label className='List-Item-Label' htmlFor={`dis${index}`}>{bran}</label>
                            </li>)
                    })}
                </div>
            </ol>
            <div className="Reset">
                <button className='Reset-Button' onClick={ResetData}>Reset</button>
            </div>
        </div>
    )
}
