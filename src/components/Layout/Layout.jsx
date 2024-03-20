import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import ScrollButton from '../ScrollButton/ScrollButton'
import { useDispatch } from 'react-redux'
import { fetchAccessToken } from '../../redux/slices/authSlice'

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAccessToken())
  }, [dispatch])

  return (
    <>
      <Header />
      <div className='bg-gray-50 xs:pt-5 sm:pt-1 pb-5 font-ConCung'>
        <Routers />
        <ScrollButton />
      </div>
      <Footer />
    </>
  )
}

export default Layout
