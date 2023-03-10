import React, { useEffect, useRef, useState } from 'react'
import { Select, Badge } from 'antd';
import { BsShop } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const data = [
    {
      value: 'fragrances',
      label: 'Nước hoa',
    },
    {
      value: 'smartphones',
      label: 'Điện thoại di động',
    },
    {
      value: 'laptops',
      label: 'Laptops - Máy tính bảng',
    },
    {
      value: 'skincare',
      label: 'Chăm sóc da',
    },
    {
      value: 'home-decoration',
      label: 'Trang trí',
    },
    {
      value: 'groceries',
      label: 'Sản phẩm khác',
    },
  ]
  const [inputValue, setInputValue] = useState()
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const cartItems = useSelector(state => state.cart.cartItems)

  const headerRef = useRef(null);
  const navigate = useNavigate()

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add("sticky", "!bg-emerald-600")
      }else {
        headerRef.current.classList.remove("sticky", "!bg-emerald-600")
      }
    })
  }
  // console.log(inputValue)
  useEffect(()=>{
    stickyHeaderFunc()
    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })
  const navigateToCart = () => {
    navigate('/cart')
  }
  const navigateToHome = () => {
    navigate('/home')
  }
  const navigateToLogin = () => {
    navigate('/login')
  }
  return (
    <>
    <div className='h-[80px]'>
      <img className='h-full bg-cover w-full invert' src="https://concung.com//img/adds/2023/02/1677569888-CASHBACK-TOP.png"/>
    </div>
    <div ref={headerRef} className='bg-teal-700 sm:h-[80px] md:h-[80px] z-[140] flex items-center font-ConCung w-full top-0 left-0'>
      <div className='xs:mx-[10%] md:mx-[20%] flex items-center justify-between w-full'>

        <div className='flex items-center justify-between xs:w-[70%] md:w-[75%]'>
          <p onClick={navigateToHome} className='flex w-full'>
            <BsShop className='xs:hidden sm:block text-6xl text-white mr-2'/>
            <div className='text-4xl text-white mr-16 w-[178px]'>
              <p>BB Market</p>
              <p className='text-sm leading-normal tracking-[6px] text-center font-semibold font-sans'>Since 2023</p>
            </div>
          </p>
          <Select
            showSearch
            className='xs:hidden sm:block w-full mr-5'
            placeholder="Tôi muốn mua"
            optionFilterProp="children"
            allowClear
            onChange={(value)=>setInputValue(value)}
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={data}
          />
        </div>
        <div className='flex items-center text-white ml-3 w-auto'>
          <p onClick={navigateToCart} className='cart text-white flex items-center cursor-pointer'>
            <Badge count={cartItems.length} size="small">
                  <BiShoppingBag className='text-3xl text-white hover:text-amber-300'/> 
            </Badge>
          </p>
          <p onClick={navigateToLogin} className='xs:ml-3 md:ml-6 lg:ml-10 flex items-center hover:text-amber-300 cursor-pointer text-xl '>
            <p className='min-w-[94px]'>Đăng nhập</p>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header