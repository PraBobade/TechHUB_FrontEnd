import React from 'react'
import { HelmetProvider } from 'react-helmet-async';
import Footer from './Footer.js';
import Header from './Header.js';

export default function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <HelmetProvider>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
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
  title: "Eccomerse Store - Shop Now",
  description: "A Ecommerse Store you can buy all the Product from here.",
  keywords: "mern, react, node, mongodb",
  author: "Pradip Bobade"
}