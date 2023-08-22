import React, { useState, useContext } from 'react'
import ProductContext from '../../../../Context/Product'
import '../../../../Public/Css/Menu-Content/AdminUserList.css'

export default function CategoryList() {
    const { AllCategories, DeleteCategory, UpdateCategory } = useContext(ProductContext);
    const [editDetails, setEditDetails] = useState({ id: '', UpdatedName: '', ShowInput: false })
    const { id, UpdatedName, ShowInput } = editDetails

    async function handleSubmit(event) {
        event.preventDefault();
        UpdateCategory(id, UpdatedName);
        setEditDetails({ id: '', UpdatedName: '', ShowInput: false });
    }


    return (
        <div className='UserTable appfont'>
            <table className="table table-hover">
                <thead className='table-head'>
                    <tr>
                        <th className='table-Heading' scope="col">#</th>
                        <th className='table-Heading' scope="col">Categoies</th>
                        <th className='table-Heading' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {AllCategories?.map((cate, index) => {
                        return (
                            <tr key={cate?._id}>
                                <th className='table-Fields' scope="row">{index + 1}</th>
                                <td className='table-Fields'>
                                    {ShowInput && id === cate?._id ?
                                        <div className='Edit-Category'>
                                            <input type="text" className='Field-Input'
                                                value={UpdatedName} onChange={(event) => {
                                                    setEditDetails({ ...editDetails, UpdatedName: event.target.value })
                                                }} />
                                            <button className="CategoryEditBtn" onClick={handleSubmit} >Update</button>
                                        </div>
                                        : cate?.name}
                                </td>
                                <td className='table-Fields'>
                                    <button className="CategoryEditBtn" onClick={() => {
                                        setEditDetails({ ...editDetails, id: cate?._id, UpdatedName: cate?.name, ShowInput: true });
                                    }}> Edit </button>
                                    <button className="CategoryDeleteBtn" onClick={() => {
                                        // DeleteCategory(cate?._id)
                                    }}> Delete </button>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
