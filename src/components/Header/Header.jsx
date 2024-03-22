import React, { useEffect, useRef, useState } from 'react'
import { Select, Badge, Avatar, Dropdown, Space, Typography } from 'antd'
import { BsShop } from 'react-icons/bs'
import { BiLogOut, BiShoppingBag } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'
import fetchBase from '../../api/fetchBase'
import { cartActions } from '../../redux/slices/cartSlice'

const handleTransformCategories = (categoriesData) => {
  return categoriesData.map((category) => ({
    value: category.categoryId,
    label: category.categoryName
  }))
}

const Header = () => {
  const headerRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const categories = useSelector((state) => state.cart.categories)
  const products = useSelector((state) => state.cart.products)

  const [inputValue, setInputValue] = useState()

  const transformedCategories = handleTransformCategories(categories)
  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky', '!bg-emerald-600')
      } else {
        headerRef.current.classList.remove('sticky', '!bg-emerald-600')
      }
    })
  }
  const fetchCategories = async () => {
    const res = await fetchBase('/api/categories?pageSize=100')
    dispatch(cartActions.setCategories(res.data))
  }
  const fetchDataProduct = async (id) => {
    try {
      const res = await fetchBase(`/api/products?${id && 'categoryId=' + id + '&'}pageSize=20&isActive=true`)
      return res.data
    } catch (error) {
      console.error('Error fetching product:', error)
      return [] // Trả về mảng rỗng nếu có lỗi
    }
  }
  const fetchDataProductFilter = async (id) => {
    try {
      const res = await fetchBase(`/api/products?${id && 'categoryId=' + id + '&'}pageSize=1000&isActive=true`)
      if (res.data) {
        dispatch(cartActions.setProductsFilter(res.data))
        dispatch(cartActions.setLoading(false))
      } else {
        dispatch(cartActions.setLoading(false))
      }
      return res.data
    } catch (error) {
      console.error('Error fetching product:', error)
      return [] // Trả về mảng rỗng nếu có lỗi
    }
  }
  useEffect(() => {
    fetchCategories()
    stickyHeaderFunc()
    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  }, [])
  useEffect(() => {
    if (categories && categories.length > 0) {
      Promise.all(categories.map((item) => fetchDataProduct(item.categoryId)))
        .then((results) => {
          const allProducts = results.flat() // Dùng flat() để làm phẳng mảng của mảng
          dispatch(cartActions.setProducts(allProducts))
          dispatch(cartActions.setLoading(false))
        })
        .catch((error) => {
          console.error('Error fetching all products:', error)
        })
    }
  }, [categories])
  // useEffect(() => {
  //   if (products && products.length > 0) {
  //     const filteredProducts = products.filter((item) => item.categoryId === inputValue)
  //     dispatch(cartActions.setProductsFilter(filteredProducts))
  //   }
  // }, [products, inputValue])
  // console.log('inputValue', inputValue)
  useEffect(() => {
    if (inputValue) {
      navigate('/')
      fetchDataProductFilter(inputValue)
      dispatch(cartActions.setLoading(true))
      dispatch(cartActions.setProductsFilterStatus(true))
    } else {
      dispatch(cartActions.setProductsFilterStatus(false))
    }
  }, [inputValue])
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
      key: '1',
      className: 'mt-5'
    }
  ]

  return (
    <>
      <div className='h-[80px]'>
        <img className='h-full bg-cover w-full invert333' src='https://cdn1.concung.com/img/adds/2024/03/1710752871-TOP.png' />
      </div>
      <div ref={headerRef} className='bg-teal-700 sm:h-[80px] md:h-[80px] z-[140] flex items-center font-ConCung w-full top-0 left-0'>
        <div className='xs:mx-[5%] md:mx-[10%] flex items-center justify-between w-full'>
          <div className='flex items-center justify-between w-full'>
            <Link to='/home' className='flex w-fit'>
              <BsShop className='xs:hidden sm:block text-6xl text-white mr-2' />
              <div className='text-4xl text-white mr-5 w-[178px]'>
                <p>BB Market</p>
                <p className='text-sm leading-normal tracking-[6px] text-center font-semibold font-sans'>Since 2023</p>
              </div>
            </Link>
            <div className='px-10 w-2/3 flex justify-center'>
              <Select
                showSearch
                className='xs:hidden lg:block min-w-[215px] w-full max-w-96 text-center'
                placeholder='Tôi muốn mua'
                optionFilterProp='children'
                allowClear
                value={inputValue}
                onChange={(value) => setInputValue(value)}
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                options={transformedCategories}
              />
            </div>
            <div className='flex items-center justify-end text-white w-auto'>
              <Space className='min-w-fit'>
                <Link to='/cart' className='cart text-white flex items-center cursor-pointer rounded-full hover:bg-teal-800 p-1.5'>
                  <Badge count={cartItems.length} size='small'>
                    <BiShoppingBag className='text-3xl text-white' />
                  </Badge>
                </Link>
              </Space>
              {currentUser ? (
                <Dropdown
                  menu={{
                    items: itemsDropdown
                  }}
                  className='min-w-fit'
                >
                  <Space>
                    <Avatar src={currentUser?.photoURL} className='ml-6' size='large' />
                    <div className='text-xs text-white xs:hidden xl:block '>
                      Xin chào, <p className='text-base font-semibold'>{currentUser.displayName}!</p>
                    </div>
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
      </div>
    </>
  )
}

export default Header
