import { Carousel, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { IoMdFlash } from 'react-icons/io'
import Helmet from '../components/Helmet/Helmet'
import Clock from '../components/UI/Clock'
import ProductList from '../components/UI/ProductList'
import { useSelector } from 'react-redux'

const Home = () => {
  const [flashSale, setFlashSale] = useState([])

  const loading = useSelector((state) => state.cart.loading)
  const products = useSelector((state) => state.cart.products)
  const productsFilter = useSelector((state) => state.cart.productsFilter)
  const productsFilterStatus = useSelector((state) => state.cart.productsFilterStatus)

  const groupProductsByCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.categoryId]) {
        acc[product.categoryId] = []
      }
      acc[product.categoryId].push(product)
      return acc
    }, {})
  }
  const groupedProducts = groupProductsByCategory(products)
  // console.log('productsFilterStatus', productsFilterStatus)
  // console.log('groupedProducts', groupedProducts)
  // console.log('products', products)
  console.log('loading', loading)
  // console.log('productsFilter', productsFilter)

  useEffect(() => {
    if (products) {
      const fls = []

      for (let i = 50; i < products.length; i += 50) {
        fls.push(products[i])
      }
      setFlashSale(fls)
    }
  }, [products])
  return (
    <Helmet title={'Trang chủ'}>
      <section className='hero__section '>
        <div className='mx-[10%]'>
          <div className='flex w-full'>
            <div className='213w-[70%] w-full'>
              <Carousel infinite autoplay effect='fade' speed='800' autoplaySpeed={2500}>
                <div>
                  <img
                    className='w-full xs:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-cover rounded-lg'
                    src={'https://cdn1.concung.com/img/adds/2024/03/1710752920-HOME(1).png'}
                  />
                </div>
                <div>
                  <img
                    className='w-full xs:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-cover rounded-lg'
                    src={'https://cdn1.concung.com/img/adds/2024/02/1709122107-HOME(2).png'}
                  />
                </div>
                <div>
                  <img
                    className='w-full xs:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-cover rounded-lg'
                    src={'https://cdn1.concung.com/img/adds/2024/03/1709628664-HOME.png'}
                  />
                </div>
                <div>
                  <img
                    className='w-full xs:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-cover rounded-lg'
                    src={'https://cdn1.concung.com/img/adds/2024/02/1708596409-HOME(2).png'}
                  />
                </div>
                <div>
                  <img
                    className='w-full xs:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-cover rounded-lg'
                    src={'https://cdn1.concung.com/img/adds/2024/02/1708592066-HOMEPAGEMAINBANNER980x320(5).png'}
                  />
                </div>
              </Carousel>
            </div>

            {/* <div className='w-[30%] ml-1'>
              <img
                className='w-full h-[198px] mb-1 bg-cover'
                src={'https://ss-hn.fptvds.vn/images/2023/02/nam-moi-ron-rang-hang-ngan-uu-dai-614x397.jpg'}
              />
              <img
                className='w-full h-[198px] bg-cover'
                src={'https://ss-hn.fptvds.vn/images/2022/sub-banner-bua-com-ngon-lanh-copy-01.jpg'}
              />
            </div> */}
          </div>
          {productsFilterStatus && (
            <>
              <div className='w-full xs:bg-transparent 111md:bg-white rounded-xl xs:my-3 lg:my-6'>
                <h1 className='text-2xl font-bold p-2 xs:ml-3 lg:ml-7 xs:pt-3 lg:pt-6 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
                  {loading ? (
                    <Skeleton.Input active size='large' />
                  ) : (
                    <>
                      {productsFilter?.[0]?.categoryName} <BsFillCaretRightFill className='ml-1' />
                    </>
                  )}
                </h1>
                {loading ? (
                  <div className='grid grid-cols-3'>
                    <div className='col-span-1 flex justify-center'>
                      <Skeleton.Image className='m-5' active size='large' />
                    </div>
                    <div className='col-span-1 flex justify-center'>
                      <Skeleton.Image className='m-5' active size='large' />
                    </div>
                    <div className='col-span-1 flex justify-center'>
                      <Skeleton.Image className='m-5' active size='large' />
                    </div>
                    <div className='col-span-1 flex justify-center'>
                      <Skeleton.Image className='m-5' active size='large' />
                    </div>
                    <div className='col-span-1 flex justify-center'>
                      <Skeleton.Image className='m-5' active size='large' />
                    </div>
                    <div className='col-span-1 flex justify-center'>
                      <Skeleton.Image className='m-5' active size='large' />
                    </div>
                  </div>
                ) : (
                  <ProductList data={productsFilter} />
                )}
              </div>
            </>
          )}
          <>
            <div className='w-full xs:bg-transparent 111md:bg-white rounded-xl xs:my-3 lg:my-6'>
              <h1 className='xs:text-xl sm:text-3xl font-bold p-2 xs:ml-3 lg:ml-7 xs:pt-3 lg:pt-6 text-red-600 flex items-center cursor-pointer max-w-max'>
                Giá <IoMdFlash className='!text-yellow-400 xs:text-2xl sm:text-5xl rotate-12' /> Sốc :
                <Clock />
              </h1>
              {loading && !flashSale ? (
                <div className='grid grid-cols-3'>
                  <div className='col-span-1 flex justify-center'>
                    <Skeleton.Image className='m-5' active size='large' />
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Skeleton.Image className='m-5' active size='large' />
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Skeleton.Image className='m-5' active size='large' />
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Skeleton.Image className='m-5' active size='large' />
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Skeleton.Image className='m-5' active size='large' />
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Skeleton.Image className='m-5' active size='large' />
                  </div>
                </div>
              ) : (
                <ProductList data={flashSale} />
              )}
            </div>
          </>

          {!productsFilterStatus && (
            <>
              {Object.keys(groupedProducts).map((categoryId) => (
                <div key={categoryId}>
                  <div className='w-full xs:bg-transparent 111md:bg-white rounded-xl xs:my-3 lg:my-6'>
                    <h1 className='text-2xl font-bold p-2 xs:ml-3 lg:ml-7 xs:pt-3 lg:pt-6 text-red-600 flex items-center underline underline-offset-8 cursor-pointer max-w-max'>
                      {groupedProducts[categoryId][0].categoryName} <BsFillCaretRightFill className='ml-1' />
                    </h1>
                    <ProductList data={groupedProducts[categoryId]} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </Helmet>
  )
}

export default Home
