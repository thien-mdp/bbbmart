import React from 'react'
import { BsBagPlus, BsFillBagPlusFill } from 'react-icons/bs'

import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ item }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const navigateToItem = () => {
    navigate(`/shop/${item.id}`)
    scrollToTop()
  }
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail
      })
    )

    toast.success('Đã thêm vào giỏ hàng !')
  }

  return (
    <div className='product__item cursor-pointer xs:mx-0 md:mx-5 xs:bg-white md:bg-transparent xs:p-5 md:p-0 rounded-[5px]'>
      <div className='relative mb-2'>
        <p onClick={navigateToItem} className=' flex items-center text-center h-[250px]'>
          <img
            loading='auto'
            alt='product image transition duration-500 ease-in-out'
            className='scale-100 hover:scale-[0.85] ease-in-out duration-500 max-h-[220px] h-full w-full bg-cover min-w-auto rounded-[5px]'
            src={item.thumbnail}
          />
        </p>
        <div className='h-7 bottom-[-6px] z-1 absolute'>
          <img className='max-w-full h-7 w-auto' src='https://cdn1.concung.com/img/res/ship_label_new/list_70k.png' />
        </div>
      </div>
      <div className='px-4 pb-2'>
        <p className='truncate hover:text-blue-800'>{item.title}</p>
        <div className='flex justify-between items-center mt-1'>
          <p className='cursor-default w-[80%] mb-[-5px]'>{item.price},000 ₫</p>
          <BsFillBagPlusFill onClick={addToCart} className='text-xl hover:text-red-600 font-bold' />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
