import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import ScrollButton from '../ScrollButton/ScrollButton'
import { useDispatch } from 'react-redux'
import { fetchAccessToken } from '../../redux/slices/authSlice'
import { cartActions } from '../../redux/slices/cartSlice'

const Layout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccessToken())
  }, [])

  return (
    <>
      <Header />
      <div className='bg-gray-50 xs:pt-5 sm:pt-3 pb-5 font-ConCung111'>
        <Routers />
        <ScrollButton />
      </div>
      <Footer />
    </>
  )
}

export default Layout
