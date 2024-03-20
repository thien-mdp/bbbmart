import { Carousel, Skeleton } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { IoMdFlash } from 'react-icons/io'
import Helmet from '../components/Helmet/Helmet'
import Clock from '../components/UI/Clock'
import ProductList from '../components/UI/ProductList'
import axiosApi from '../api/axiosApi'

const Home = () => {
  const [products, setProducts] = useState([])
  const [fragrances, setFragrances] = useState([])
  const [smartphones, setSmartphones] = useState([])
  const [laptops, setLaptops] = useState([])
  const [skincare, setSkincare] = useState([])
  const [groceries, setGroceries] = useState([])
  const [flashSale, setFlashSale] = useState([])
  const [homeDecoration, setHomeDecoration] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDataKiot = async () => {
    const res = await axiosApi.get('/products?pageSize=100')
    console.log('Res', res)
  }
  const fetchData = async () => {
    const res = await axios('https://dummyjson.com/products?limit=100')
    if (res.status == 200) {
      setProducts(res.data.products)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
    fetchDataKiot()
  }, [])
  useEffect(() => {
    const filteredProducts = products.filter((item) => item.category === 'fragrances')
    const smartphones = products.filter((item) => item.category === 'smartphones')
    const laptops = products.filter((item) => item.category === 'laptops')
    const skincare = products.filter((item) => item.category === 'skincare')
    const groceries = products.filter(
      (item) =>
        item.category !== 'fragrances' && item.category !== 'smartphones' && item.category !== 'laptops' && item.category !== 'skincare'
    )
    const homeDecoration = products.filter((item) => item.category === 'home-decoration')
    const fls = []

    for (let i = 0; i < products.length; i += 9) {
      fls.push(products[i])
    }
    setFlashSale(fls)
    setFragrances(filteredProducts)
    setSmartphones(smartphones)
    setLaptops(laptops)
    setSkincare(skincare)
    setGroceries(groceries)
    setHomeDecoration(homeDecoration)
  }, [products])

  // console.log(flashSale)
  return (
    <Helmet title={'Trang chủ'}>
      <section className='hero__section '>
        <div className='mx-[20%]'>
          <div className='flex w-full'>
            <div className='w-[70%]'>
              <Carousel autoplay>
                <div>
                  <img className='w-full h-[400px] bg-cover' src={'https://ss-hn.fptvds.vn/images/2023/02/home-banner_867-x-400.jpg'} />
                </div>
                <div>
                  <img className='w-full h-[400px] bg-cover' src={'https://ss-hn.fptvds.vn/images/2023/02/867x400_a1-20230223030103.jpg'} />
                </div>
                <div>
                  <img className='w-full h-[400px] bg-cover' src={'https://ss-hn.fptvds.vn/images/2023/02/home-banner_867-x-400.jpg'} />
                </div>
                <div>
                  <img className='w-full h-[400px] bg-cover' src={'https://ss-hn.fptvds.vn/images/2023/02/867x400_web.jpg'} />
                </div>
                <div>
                  <img
                    className='w-full h-[400px] bg-cover'
                    src={'https://ss-hn.fptvds.vn/images/2022/main-banner-_trao-rau-cu-qua-sach-01.jpg'}
                  />
                </div>
              </Carousel>
            </div>

            <div className='w-[30%] ml-1'>
              <img
                className='w-full h-[198px] mb-1 bg-cover'
                src={'https://ss-hn.fptvds.vn/images/2023/02/nam-moi-ron-rang-hang-ngan-uu-dai-614x397.jpg'}
              />
              <img
                className='w-full h-[198px] bg-cover'
                src={'https://ss-hn.fptvds.vn/images/2022/sub-banner-bua-com-ngon-lanh-copy-01.jpg'}
              />
            </div>
          </div>

          <>
            <h1 className='xs:text-xl sm:text-3xl font-bold p-2 text-red-600 flex items-center cursor-pointer max-w-max'>
              Flash <IoMdFlash className='!text-yellow-400 xs:text-2xl sm:text-5xl rotate-12' /> Sale :
              <Clock />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              {loading ? (
                <div className='flex w-full justify-between items-center'>
                  <Skeleton className='m-5' active size='large' />
                </div>
              ) : (
                <ProductList data={flashSale} />
              )}
            </div>
          </>

          <>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
              Nước hoa <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              {loading ? (
                <div className='flex w-full justify-between items-center'>
                  <Skeleton className='m-5' active size='large' />
                </div>
              ) : (
                <ProductList data={fragrances} />
              )}
            </div>
          </>

          <>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
              Điện thoại di động <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              {loading ? (
                <div className='flex w-full justify-between items-center'>
                  <Skeleton className='m-5' active size='large' />
                </div>
              ) : (
                <ProductList data={smartphones} />
              )}
            </div>
          </>

          <>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
              Laptops - Máy tính bảng <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              {loading ? (
                <div className='flex w-full justify-between items-center'>
                  <Skeleton className='m-5' active size='large' />
                </div>
              ) : (
                <ProductList data={laptops} />
              )}
            </div>
          </>

          <>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
              Chăm sóc da <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              {loading ? (
                <div className='flex w-full justify-between items-center'>
                  <Skeleton className='m-5' active size='large' />
                </div>
              ) : (
                <ProductList data={skincare} />
              )}
            </div>
          </>

          <>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
              Trang trí <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              {loading ? (
                <div className='flex w-full justify-between items-center'>
                  <Skeleton className='m-5' active size='large' />
                </div>
              ) : (
                <ProductList data={homeDecoration} />
              )}
            </div>
          </>

          <>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
              Sản phẩm khác <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              {loading ? (
                <div className='flex w-full justify-between items-center'>
                  <Skeleton className='m-5' active size='large' />
                </div>
              ) : (
                <ProductList data={groceries} />
              )}
            </div>
          </>
        </div>
      </section>
    </Helmet>
  )
}

export default Home
