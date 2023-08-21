import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Layout/Layout.js'


export default function PageNotFound() {
  return (
    <div>
      <Layout title={"Page Not Found"} >
        <div className="px-4 py-2 my-5 text-center">

          <h1 className="display-5 fw-bold" style={{ fontSize: '100px', paddingTop: "50px" }}>404</h1>
          <div className="col-lg-6 mx-auto">
            <h2 className="lead mb-4" style={{ fontSize: '50px' }}>Oops..! Page Not Found</h2>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to='/' className="btn btn-outline-secondary btn-lg px-4">Go Back</Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
