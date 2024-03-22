import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import ScrollButton from '../ScrollButton/ScrollButton'
import { useDispatch } from 'react-redux'
import { fetchAccessToken } from '../../redux/slices/authSlice'
import { fetch } from 'whatwg-fetch'

// const response = await fetch('https://github.com/')
// const body = await response.text()

// console.log(body)

// console.log('nodefetch', data)
// const url = '/connect/token'
const article = `scope=PublicApi.Access&grant_type=client_credentials&client_id=9b12a992-59ff-42e0-a085-a455e9cac06e&client_secret=8A3FAD40A6EE80C2AEED2B8191A407AA3E3B8B02`
const abortableFetch = 'signal' in new Request('') ? window.fetch : fetch

const Layout = () => {
  const dispatch = useDispatch()

  abortableFetch('https://id.kiotviet.vn/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: article
  })

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
