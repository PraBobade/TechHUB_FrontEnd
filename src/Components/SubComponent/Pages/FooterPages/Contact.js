import React from 'react'
import ContactImg from '../../../../Public/Images/contactus.jpg'
import { AiOutlineMail } from 'react-icons/ai'
import { BsTelephoneOutbound } from 'react-icons/bs'
import { FaRegAddressCard } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import Layout from '../../../Layout/Layout'
import '../../../../Public/Css/Layout/ContactUs.css'

export default function Contact() {
  return (
    <Layout title={"Contact Us - TechHub"} >
      <div className="ContactUs appfont ">
        <div className="Contact-Content container">
          <div className="Contact-Img">
            <img src={ContactImg} className='ContactImg-Size' alt="No Image Found" />
          </div>
          <div className="Contact-Info">
            <div className='Contact-Heading'>Contact Us</div>
            <div className='Contact-SubHeading'>For any query and information about product feel free to call any time we 24*7 available</div>
            <div className="Contact-Info-Block">
              <p className='contact-item'><AiOutlineMail /> : <a target='_blank' href="https://mytechhub.netlify.app" rel='noreferrer'>https://mytechhub.netlify.app</a></p>
              <p className='contact-item'><BsFacebook /> : <a target='_blank' href="https://www.facebook.com/TechHub-Store/" rel='noreferrer'>https://www.facebook.com/TechHub-Store/</a></p>
              <p className='contact-item'><BsTelephoneOutbound /> : +91-9876543210</p>
              <p className='contact-item'><FaRegAddressCard /> : 12, Manohar Mahal, Mogul Lane, Matunga (West), Mumbai, Maharashtra 400016</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
