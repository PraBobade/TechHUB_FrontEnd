import React from 'react'
import about1 from '../../../../Public/Images/about1.jpg'
import about2 from '../../../../Public/Images/about3.jpg'
import about3 from '../../../../Public/Images/about3.jpg'
import Layout from '../../../Layout/Layout'

export default function About() {
  return (
    <Layout title={"TechHub - About"}>
      <div className="container py-2 appfont">
        <div className="row featurette py-3 d-flex justify-content-center align-items-center">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">Secure Money <span className="text-body-secondary">With Our Bank.</span></h2>
            <p className="lead">At our bank, we take the security of your funds very seriously. We have implemented a number of measures to ensure that your money is protected at all times. For instance, our bank is FDIC insured, which means that your deposits are insured up to $250,000 per depositor, giving you peace of mind in the unlikely event of a bank failure. Additionally, we use state-of-the-art encryption technology to safeguard your personal and financial information, both online and offline.
            </p>
          </div>
          <div className="col-md-5">
            <img src={about1} width="400px" height="300px" alt="" />
          </div>
        </div>
        <div className="row featurette py-3 d-flex justify-content-center align-items-center">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">Grow Your Savings with Our Competitive Interest Rates: <span className="text-body-secondary">Find the Account that Works for You</span></h2>
            <p className="lead">We understand that you work hard for your money, and we want your money to work hard for you too. That's why we offer competitive interest rates on all of our deposit accounts. By depositing your money with us, you can earn interest on your funds that will help your savings grow over time. Our interest rates are regularly reviewed and updated to ensure that they remain competitive with other financial institutions. </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img src={about2} width="400px" height="300px" alt="" />
          </div>
        </div>
        <div className="row featurette py-3 d-flex justify-content-center align-items-center">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">Invest in the Future with Our <span className="text-body-secondary">Bitcoin Service Offerings</span></h2>
            <p className="lead">In addition to traditional banking services, we also offer bitcoin services to our customers. Our bitcoin service allows you to buy, sell, and store bitcoin within our secure platform, making it easy and convenient to invest in cryptocurrency. With the growing popularity of bitcoin and other cryptocurrencies, we recognize the importance of offering this service to our customers.
            </p>
          </div>
          <div className="col-md-5">
            <img src={about3} width="400px" height="300px" alt="" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
