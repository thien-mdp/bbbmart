import { Button, Divider, Result, Space, Table } from 'antd'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { TiArrowBack, TiDelete } from 'react-icons/ti'
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'

import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const data = cartItems
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const deleteProduct = (item) => {
    dispatch(cartActions.deleteItem(item))
  }

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => (
        <div className='w-full flex justify-center'>
          <img src={thumbnail} className='w-[200px]' />
        </div>
      ),
      width: '20%',
      align: 'center'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      width: '25%'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (text) => (
        <div className='w-full flex justify-center'>{text.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%'
    },
    {
      title: 'Tổng tiền',
      width: '20%',
      render: (text, row) => (
        <div className='w-full flex justify-center'>
          {(row.quantity * row.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
        </div>
      )
    },
    {
      title: 'Xóa',
      key: 'delete',
      width: '5%',
      render: (text, row) => <BiTrash onClick={() => deleteProduct(row.id)} className='text-2xl hover:text-red-500 cursor-pointer' />
    }
  ]

  let locale = {
    emptyText: (
      <Result
        status='404'
        title='Không có sản phẩm nào trong giỏ hàng của bạn'
        subTitle='Hôm nay có rất nhiều sản phẩm ưu đãi đấy !!'
        extra={[
          <Button onClick={() => navigateToHome()} className='bg-blue-600 h-10 font-ConCung  text-2xl' type='primary'>
            Tiếp tục mua sắm{' '}
          </Button>
        ]}
      />
    )
  }

  const navigateToCheckout = () => {
    navigate('/checkout')
  }
  const navigateToHome = () => {
    navigate('/home')
  }

  return (
    <Helmet title={`Giỏ hàng`}>
      {/* <CommoSection title="Giỏ hàng"/> */}
      <section className='xs:mx-2 md:mx-[10%] my-10 xs:grid lg:flex font-mono min-h-[630px]'>
        <div className='w-full mr-5'>
          <Table locale={locale} columns={columns} dataSource={data} bordered pagination={false} />
        </div>
        {totalAmount > 0 ? (
          <div className='!min-w-[35%] text-xl text-center'>
            <div className=''>
              <div className='h-5 bg-gray-300 rounded-b-lg sticky'></div>
              <div className='bg-white border border-solid border-gray mx-3 py-5 relative bottom-3 text-lg'>
                <div className='flex flex-col w-full mx-3'>
                  <div className='flex justify-between mx-5'>
                    <p className='font-bold mr-5 min-w-fit'>Tiền hàng:</p>
                    <p className='min-w-fit'>{totalAmount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} ₫</p>
                  </div>
                  <div className='flex justify-between mx-5'>
                    <p className='font-bold mr-5 min-w-fit'>Vận chuyển:</p>
                    <p className='min-w-fit'>0 VND</p>
                  </div>
                  <div className='flex justify-between mx-5 border-y-2 my-5 py-2'>
                    <p className='font-bold mr-5 min-w-fit'>Tổng cộng:</p>
                    <p className='min-w-fit'>{totalAmount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                </div>
                {/* <Divider /> */}
                <h1
                  onClick={navigateToHome}
                  className='cursor-pointer hover:text-teal-600 font-ConCung text-xl h-10 justify-center flex items-center'
                  type='primary'
                >
                  {' '}
                  <TiArrowBack className='mr-2' />
                  Tiếp tục mua sắm{' '}
                </h1>
                <div className='my-5 mx-2'>
                  <Button onClick={navigateToCheckout} className='bg-teal-600 font-ConCung text-xl h-10 text-center w-full' type='primary'>
                    Thanh toán
                  </Button>
                </div>
                <div
                  className="absolute box-border bottom-[-20px] w-full h-[35px] bg-repeat-x bg-[url('assets/img/bg-end-cart.svg')]"
                  style={{ backgroundPositionX: '-3px', backgroundPositionY: '-3px' }}
                />
              </div>
            </div>
            {/* <Button href='/home' className='bg-blue-600 font-ConCung text-xl h-10 text-center' type="primary">Tiếp tục mua sắm </Button> */}
          </div>
        ) : null}
      </section>
    </Helmet>
  )
}

export default Cart
