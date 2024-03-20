import React from 'react'
import { BsTruck } from 'react-icons/bs'
import { TiArrowBack } from 'react-icons/ti'
import { FaCcPaypal } from 'react-icons/fa'
import { GiMoneyStack } from 'react-icons/gi'
import { serviceData } from '../assets/serviceData'
const Services = () => {
  // console.log(serviceData);
  return (
    <>
      {serviceData.map((item) => (
        <div className=''>
          <div className='p-5 bg-red-600 flex items-center rounded-md'>
            <span className='bg-yellow-600 p-3 rounded-full mr-3'>{item.icon}</span>
            <div className='font-semibold text-white'>
              <p>{item.title}</p>
              <p>{item.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Services
