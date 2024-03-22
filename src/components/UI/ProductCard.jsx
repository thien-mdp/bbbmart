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
        title: item.fullName,
        price: item.basePrice,
        thumbnail: item.images?.[0]
      })
    )

    toast.success('Đã thêm vào giỏ hàng !')
  }

  return (
    <div className='product__item cursor-pointer xs:mx-0 md:mx-3 xs:bg-white md:bg-transparent p-2 rounded-[5px]'>
      <div className='relative mb-2'>
        <p onClick={navigateToItem} className=' flex items-center text-center xs:min-h-[150px] sm:min-h-[200px] min-h-[250px] h-auto'>
          <img
            loading='auto'
            alt='product image transition duration-500 ease-in-out'
            className='scale-100 hover:scale-[0.85] ease-in-out duration-500 max-h-[220px] h-full w-full bg-cover min-w-auto rounded-[5px]'
            src={item.images?.[0] || 'https://showerwell.co.nz/wp-content/uploads/2018/08/Product-Image-Coming-Soon-600x600.png'}
          />
        </p>
        <div className={`${!item.images?.[0] && 'hidden '} h-7 bottom-[-6px] z-1 absolute`}>
          <img className='max-w-full h-7 w-auto' src='https://cdn1.concung.com/img/res/ship_label_new/list_70k.png' />
        </div>
      </div>
      <div className='px-4 pb-2 xs:text-sm sm:text-base '>
        <p className='truncate hover:text-blue-800'>{item.fullName}</p>
        <div className='flex justify-between items-center mt-1'>
          <p className='cursor-default w-[80%] mb-[-5px]'>
            {item.basePrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
          </p>
          <BsFillBagPlusFill onClick={addToCart} className='text-xl hover:text-red-600 font-bold' />
        </div>
      </div>
    </div>
    // <div className='col-span-full sm:col-span-2 lg:col-span-1 group relative'>
    //   <a href='#' onClick={navigateToItem} className='w-full h-full flex flex-col'>
    //     {/* ::Container */}
    //     <div className='relative'>
    //       {/* :::Picture container */}
    //       <div className='xs:min-h-[150px] sm:min-h-[200px] min-h-[250px] h-auto aspect-w-1 aspect-h-1 shadow-sm rounded-lg overflow-hidden group-hover:shadow-md scale-100 hover:scale-[0.85] ease-in-out duration-500'>
    //         {/* ::::picture */}
    //         <img
    //           src={item.images?.[0] || 'https://showerwell.co.nz/wp-content/uploads/2018/08/Product-Image-Coming-Soon-600x600.png'}
    //           alt={item.fullName}
    //           className='scale-100 hover:scale-[0.85] ease-in-out duration-500 max-h-[220px] h-full w-full bg-cover min-w-auto rounded-[5px] object-cover object-center'
    //         />
    //         {/* ::::overlay background */}
    //         <div className='absolute inset-0 w-full h-full bg-gradient-to-t from-gray-800 via-transparent opacity-70 111group-hover:from-transparent' />
    //         <div className={`${!item.images?.[0] && 'hidden '} h-7 bottom-[-6px] z-1 absolute`}>
    //           <img className='max-w-full h-7 w-auto' src='https://cdn1.concung.com/img/res/ship_label_new/list_70k.png' />
    //         </div>
    //       </div>
    //       {/* :::price */}
    //       <span className='z-20 absolute bottom-3 right-5 px-0.5 rounded-md text-2xl text-white font-semibold antialiased 111group-hover:text-gray-700 111group-hover:bg-white 111group-hover:bg-opacity-70'>
    //         {item.basePrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
    //       </span>
    //     </div>
    //     {/* ::Product Details */}
    //     <div className='flex-grow mt-2 px-3 h-full'>
    //       {/* :::Info container */}
    //       <div className='relative flex flex-col'>
    //         {/* ::::name */}
    //         <h3 className='text-base text-gray-800 font-semibold'>{item.fullName}</h3>
    //         {/* ::::colors description */}
    //         <p className='mt-1 text-sm text-gray-500 font-medium'>description</p>
    //         {/* ::::add to cart button */}
    //         <button
    //           onClick={addToCart}
    //           className='mt-4 py-1.5 w-full rounded-md bg-gray-200 text-sm text-gray-600 font-semibold tracking-wide hover:bg-gray-300 hover:text-gray-800'
    //         >
    //           Add to bag
    //         </button>
    //       </div>
    //     </div>
    //   </a>
    // </div>
  )
}

export default ProductCard
