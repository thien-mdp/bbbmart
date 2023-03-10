import { Button, Result, Space, Table } from 'antd';
import React from 'react'
import { BiTrash } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'

import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';



const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)
  const data = cartItems
  const dispatch = useDispatch()
  const deleteProduct = (item) => {
    dispatch(cartActions.deleteItem(item))
  }

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) =>
        <div className='w-full flex justify-center'>
          <img src={thumbnail} className="w-[200px]" />
        </div>,
      width: '20%',
      align: "center"
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '10%',
    },
    {
      title: 'Tổng tiền',
      width: '15%',
      render: (text, row) =>
      (
        <div className='w-full flex justify-center'>
          {row.quantity * row.price} đ
        </div>
      )

    },
    {
      title: 'Xóa',
      key: 'delete',
      width: '5%',
      render: (text, row) => (
        <BiTrash onClick={()=>deleteProduct(row.id)} className='text-2xl hover:text-red-500 cursor-pointer' />
      ),
    },
  ];
  let locale = {
    emptyText: (
      <Result
        status="404"
        title="Không có sản phẩm nào trong giỏ hàng của bạn"
        subTitle="Hôm nay có rất nhiều sản phẩm ưu đãi đấy !!"
        extra={[
          <Button href='/home' className='bg-blue-600 h-10 font-ConCung  text-2xl' type="primary">Tiếp tục mua sắm </Button>,
        ]}
      />
    )
  };

  return (
    <Helmet title={`Giỏ hàng`}>
      {/* <CommoSection title="Giỏ hàng"/> */}
      <section>
        <div className='mx-[20%] my-10'>
          <Table locale={locale}  columns={columns} dataSource={data} bordered pagination={false} />
        </div>
      </section>
    </Helmet>
  )
}



export default Cart