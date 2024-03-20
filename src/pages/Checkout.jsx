import { Button, Col, Form, Input, Radio, Row } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Helmet from '../components/Helmet/Helmet'

const Checkout = () => {
  const [inputValues, setInputValues] = useState([])

  const totalQty = useSelector((state) => state.cart.totalQuantity)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const navigate = useNavigate()

  const submitHandler = (values) => {
    toast.success('Đã đặt hàng', { theme: 'dark' })
    navigate('/home')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  console.log(totalQty)
  const layout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    }
  }
  return (
    <Helmet title='Thanh toán'>
      <section className='xs:mx-2 md:mx-[20%] my-10 xs:grid lg:flex font-mono min-h-[630px]'>
        <div className='w-full p-5 bg-white rounded-md'>
          <h1 className='text-3xl font-bold text-center font-ConCung text-teal-600 mb-10 underline underline-offset-4'>Thanh toán</h1>
          <Form
            {...layout}
            name='basic'
            className='!w-full'
            labelAlign='right'
            // initialValues={{ remember: true }}
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <div className='xs:grid lg:flex'>
              <div className='w-full pr-5 '>
                <Form.Item
                  name='thanhtoan'
                  label='Thanh toán: '
                  rules={[{ required: true, message: 'Bạn chưa chọn phương thức thanh toán !' }]}
                >
                  <Radio.Group name='thanhtoan' onChange={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}>
                    <Radio value='cod'> Tiền mặt (Ship COD) </Radio>
                    <Radio value='online' disabled>
                      {' '}
                      Thanh toán Online{' '}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label='Tên người nhận'
                  name='name'
                  className='!mb-2'
                  rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                >
                  <Input
                    name='name'
                    onBlur={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    placeholder='Họ & Tên người nhận'
                  />
                </Form.Item>
                <Form.Item
                  label='Số điện thoại'
                  name='phone'
                  className=' !mb-2'
                  rules={[
                    { required: true, message: 'Vui lòng nhập sdt người nhận!' },
                    {
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: 'Vui lòng nhập số điện thoại hợp lệ'
                    }
                  ]}
                >
                  <Input
                    placeholder='Số điện thoại người nhận'
                    name='phone'
                    onBlur={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
                <Form.Item
                  label='Địa chỉ'
                  name='address'
                  className='!mb-2'
                  rules={[{ required: true, message: 'Bạn chưa nhập địa chỉ !' }]}
                >
                  <Input
                    name='address'
                    onBlur={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    placeholder='Địa chỉ nhận hàng'
                  />
                </Form.Item>
                <Form.Item label='Ghi chú' name='note' className='!mb-2'>
                  <Input
                    name='note'
                    onBlur={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    placeholder='Nếu có những yêu cầu đặc biệt, vui lòng nhập vào đây !'
                  />
                </Form.Item>
                <Form.Item className='!w-full flex justify-center mt-10 ml-5'>
                  <Button className='bg-teal-600 text-center font-semibold text-xl h-10 min-w-[150px]' type='primary' htmlType='submit'>
                    Đặt hàng
                  </Button>
                </Form.Item>
              </div>
              <div className='min-w-[40%] pl-5 my-5 flex justify-center'>
                <Bill values={inputValues} totalQty={totalQty} totalAmount={totalAmount} />
              </div>
            </div>
          </Form>
        </div>
      </section>
    </Helmet>
  )

  function Bill({ values, totalQty, totalAmount }) {
    console.log(values)
    return (
      <div className='min-w-[235px]'>
        <div className='h-5 bg-gray-300 rounded-b-lg sticky'></div>
        <div className='bg-white border border-solid border-gray mx-3 py-5 relative bottom-3 text-lg'>
          <div className='flex flex-col w-full mx-3'>
            <div className='flex flex-col'>
              <div className='text-4xl text-black mr-16 font-ConCung text-center w-full'>
                <p>&nbsp;&nbsp;BB Market &nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p className='text-sm leading-normal tracking-[6px] text-center font-semibold font-sans'>© Since 2023</p>
              </div>
              <div className='pt-5 pb-2'>
                {values.name ? (
                  <>
                    <p className='font-semibold text-sm'>Tên người nhận:</p>
                    <p className='break-all pr-5'>{values.name}</p>
                  </>
                ) : null}
                {values.phone ? (
                  <>
                    <p className='font-semibold text-sm'>Sđt người nhận:</p>
                    <p className='pr-5'>{values.phone}</p>
                  </>
                ) : null}
                {values.address ? (
                  <>
                    <p className='font-semibold text-sm'>Địa chỉ nhận hàng:</p>
                    <p className='break-all pr-5'>{values.address}</p>
                  </>
                ) : null}
              </div>
            </div>
            <div className='flex justify-between mr-5 border-t-2 pt-5'>
              <p className='font-bold mr-5 min-w-fit'>Tổng sản phẩm:</p>
              <p className='min-w-fit'>{totalQty}</p>
            </div>
            <div className='flex justify-between mr-5'>
              <p className='font-bold mr-5 min-w-fit'>Tiền hàng:</p>
              <p className='min-w-fit'>{totalAmount} ₫</p>
            </div>
            <div className='flex justify-between mr-5'>
              <p className='font-bold mr-5 min-w-fit'>Vận chuyển:</p>
              <p className='min-w-fit'>0 ₫</p>
            </div>
            <div className='flex justify-between mr-5 border-t-2 mt-5 py-2'>
              <p className='font-bold mr-5 min-w-fit'>Tổng cộng:</p>
              <p className='min-w-fit'>{totalAmount} ₫</p>
            </div>
          </div>
          <div
            className="absolute box-border bottom-[-20px] w-full h-[35px] bg-repeat-x bg-[url('assets/img/bg-end-cart.svg')]"
            style={{
              backgroundPositionX: '-3px',
              backgroundPositionY: '-3px'
            }}
          />
        </div>
      </div>
    )
  }
}

export default Checkout
