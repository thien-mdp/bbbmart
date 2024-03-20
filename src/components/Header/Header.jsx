import React, { useEffect, useRef, useState } from 'react'
import { Select, Badge, Avatar, Dropdown, Space, Typography } from 'antd'
import { BsShop } from 'react-icons/bs'
import { BiLogOut, BiShoppingBag } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'
import axiosApi from '../../api/axiosApi'

const data = [
  {
    value: 'fragrances',
    label: 'Nước hoa'
  },
  {
    value: 'smartphones',
    label: 'Điện thoại di động'
  },
  {
    value: 'laptops',
    label: 'Laptops - Máy tính bảng'
  },
  {
    value: 'skincare',
    label: 'Chăm sóc da'
  },
  {
    value: 'home-decoration',
    label: 'Trang trí'
  },
  {
    value: 'groceries',
    label: 'Sản phẩm khác'
  }
]
const Header = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Đã đăng xuất !')
        navigate('/')
      })
      .catch((err) => {
        toast.error(err.code)
      })
  }
  const itemsDropdown = [
    {
      label: (
        <p className='flex items-center justify-center' onClick={logout}>
          <BiLogOut className='mr-2 w-5 h-5' /> Đăng xuất
        </p>
      ),
      key: '1'
    }
  ]
  const [inputValue, setInputValue] = useState()
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const cartItems = useSelector((state) => state.cart.cartItems)

  const headerRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  // console.log('currentUser', currentUser)
  const fetchDataKiot = async () => {
    const res = await axiosApi.get('/categories')
    console.log('Res', res)
  }
  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky', '!bg-emerald-600')
      } else {
        headerRef.current.classList.remove('sticky', '!bg-emerald-600')
      }
    })
  }
  // console.log(inputValue)
  useEffect(() => {
    fetchDataKiot()
    stickyHeaderFunc()
    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })
  return (
    <>
      <div className='h-[80px]'>
        <img className='h-full bg-cover w-full invert' src='https://concung.com//img/adds/2023/02/1677569888-CASHBACK-TOP.png' />
      </div>
      <div ref={headerRef} className='bg-teal-700 sm:h-[80px] md:h-[80px] z-[140] flex items-center font-ConCung w-full top-0 left-0'>
        <div className='xs:mx-[5%] md:mx-[20%] flex items-center justify-between w-full'>
          <div className='flex items-center justify-between xs:w-[70%] md:w-[75%]'>
            <Link to='/home' className='flex w-fit'>
              <BsShop className='xs:hidden sm:block text-6xl text-white mr-2' />
              <div className='text-4xl text-white mr-5 w-[178px]'>
                <p>BB Market</p>
                <p className='text-sm leading-normal tracking-[6px] text-center font-semibold font-sans'>Since 2023</p>
              </div>
            </Link>
            <Select
              showSearch
              className='xs:hidden lg:block min-w-[215px] w-full mx-5 text-center'
              placeholder='Tôi muốn mua'
              optionFilterProp='children'
              allowClear
              onChange={(value) => setInputValue(value)}
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
              options={data}
            />
          </div>
          <div className='flex items-center text-white ml-3 w-auto'>
            <Space>
              <Link to='/cart' className='cart text-white flex items-center cursor-pointer'>
                <Badge count={cartItems.length} size='small'>
                  <BiShoppingBag className='text-3xl text-white hover:text-amber-300' />
                </Badge>
              </Link>
            </Space>
            {currentUser ? (
              <Dropdown
                menu={{
                  items: itemsDropdown
                }}
              >
                <Space>
                  <Avatar src={currentUser?.photoURL} className='ml-6' size='large' />
                  <Typography className='text-sm text-white xs:hidden xl:block'>
                    Xin chào, <strong className='text-base'>{currentUser.displayName}!</strong>
                  </Typography>
                </Space>
              </Dropdown>
            ) : (
              <Link to={'login'} className='ml-6 flex items-center hover:text-amber-300 cursor-pointer text-xl '>
                <p className='min-w-[94px]'>Đăng nhập</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
