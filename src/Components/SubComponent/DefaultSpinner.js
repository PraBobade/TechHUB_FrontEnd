import React from 'react'

export default function DefaultSpinner(height, width) {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>

    )
}
