import React, { useRef } from 'react'

export default function Preview({ ProductPhoto }) {
    const showModal = useRef(null);

    async function showImage() {
        showModal.current.click();
    }
    return (
        <>
            <div id="photo-preview" style={{ color: "gray", fontSize: "12px", padding: "0px 18px", cursor: "pointer" }} onClick={showImage}>Preview</div>
            <button ref={showModal} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" style={{ display: 'none' }}>
            </button>
            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <img src={URL.createObjectURL(ProductPhoto)} alt="product photo"
                                className='img img-responsive text-center PreviewImg-Size' />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
