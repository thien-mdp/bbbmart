import { Radio, Skeleton } from 'antd'
import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ data, loading }) => {
  // console.log(data);
  return (
    <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pt-2'>
      {/* <div className='grid grid-cols-4 gap-10 p-4 pt-2'> */}
      {data.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </div>
  )
}

export default ProductList
