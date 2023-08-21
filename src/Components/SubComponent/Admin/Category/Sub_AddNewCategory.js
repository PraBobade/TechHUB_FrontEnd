import React, { useState, useContext } from 'react'
import ProductContext from '../../../../Context/Product.js'
import '../../../../Public/Css/Menu-Content/AddNewCategory.css'

export default function AddNewCategory() {
    const [helper, setHelper] = useState({ showInput: false, newCategory: '' })
    const { showInput, newCategory } = helper;

    const { AddNewCategory } = useContext(ProductContext);

    async function handleSubmit(event) {
        event.preventDefault();
        AddNewCategory(newCategory);
        setHelper({ showInput: false, newCategory: '' });
    }


    return (
        <div className='New-Category'>
            <button className='AddCategory-Button' onClick={() => { setHelper({ ...helper, showInput: true }) }}>Add Category</button>
            <div className="Category-Field">
                {showInput &&
                    <form className='Category-Form' onSubmit={handleSubmit}>
                        <input type="text" value={newCategory} className="Field-Input"
                            onChange={(event) => { setHelper({ ...helper, newCategory: event.target.value }) }} placeholder="Enter New Category" />
                        <button type="submit" className="SubmitBtn">Add</button>
                    </form>
                }
            </div>
        </div>
    )
}
