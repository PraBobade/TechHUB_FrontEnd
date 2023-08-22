import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Footer from './Footer.js';
import Header from './Header.js';
import logo from '../../Public/Images/TH.png'

export default function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <HelmetProvider>
        <Helmet>

          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
          <link rel="icon" type="image/png" href={logo} />
        </Helmet>
      </HelmetProvider>
      <Header />

      <main style={{ minHeight: "72vh" }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title: "TechHUB - Shop Now",
  description: "A TechHUB you can buy all the Product from here.",
  keywords: "mern, react, node, mongodb",
  author: "Pradip Bobade"
}