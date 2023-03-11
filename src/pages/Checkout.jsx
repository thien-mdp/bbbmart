import { Button, Col, Form, Input, Radio, Row } from 'antd'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Helmet from '../components/Helmet/Helmet'

const Checkout = () => {
  const [inputValues, setInputValues] = useState([])

  const submitHandler = (values) => {

    toast.success("Đã đặt hàng", { theme: "dark" })
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  return (
    <Helmet title="Thanh toán">
      <section className="xs:mx-2 md:mx-[20%] my-10 xs:grid lg:flex font-mono min-h-[630px]">
        <div className="w-full p-5 bg-white rounded-md">
          <h1 className="text-3xl font-bold text-center font-ConCung text-teal-600 mb-10 underline underline-offset-4">
            Thanh toán
          </h1>
          <Form
            {...layout}
            name="basic"
            className="!w-full"
            labelAlign="right"
            // initialValues={{ remember: true }}
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className='xs:grid lg:flex'>
              <div className='w-full pr-5 '>
                <Form.Item
                  name="thanhtoan"
                  label="Thanh toán: "
                  rules={[
                    { required: true, message: 'Bạn chưa chọn phương thức thanh toán !' },
                  ]}
                >
                  <Radio.Group
                    name="thanhtoan"
                    onChange={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                  >
                    <Radio value="cod"> Tiền mặt (Ship COD) </Radio>
                    <Radio value="online" disabled> Thanh toán Online </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Tên người nhận"
                  name="name"
                  className="!mb-2"
                  rules={[
                    { required: true, message: 'Bạn chưa nhập tên nè >"<' },
                  ]}

                >
                  <Input
                    name="name"
                    onChange={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    placeholder="Họ & Tên người nhận"
                  />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  className=" !mb-2"
                  rules={[
                    { required: true, message: "Bạn chưa nhập số điện thoại !" },
                  ]}
                >
                  <Input
                    placeholder="Số điện thoại người nhận"
                    name="phone"
                    onChange={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  className="!mb-2"
                  rules={[
                    { required: true, message: "Bạn chưa nhập địa chỉ !" },
                  ]}
                >
                  <Input
                    name="address"
                    onChange={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    placeholder="Địa chỉ nhận hàng"
                  />
                </Form.Item>
                <Form.Item
                  label="Ghi chú"
                  name="note"
                  className="!mb-2"
                >
                  <Input
                    name="note"
                    onChange={(e) => setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    placeholder="Nếu có những yêu cầu đặc biệt, vui lòng nhập vào đây !"
                  />
                </Form.Item>
              </div>
              <div className='min-w-[40%] pl-5 my-5 flex justify-center'>
                <Bill values={inputValues} />
              </div>
            </div>
            <Form.Item className="!w-full flex justify-center">
              <Button
                className="bg-teal-600 text-center font-semibold text-xl h-10"
                type="primary"
                htmlType="submit"
              >
                Đặt hàng
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </Helmet>
  );

  function Bill(values) {
    console.log(values)
    return (
      <div className="min-w-[235px]">
        <div className="h-5 bg-gray-300 rounded-b-lg sticky"></div>
        <div className="bg-white border border-solid border-gray mx-3 py-5 relative bottom-3 text-lg">
          <div className="flex flex-col w-full mx-3">
            <div className='flex flex-col'>
              <p>{values.name}</p>
              <p>{values.address}</p>
              <p>{values.phone}</p>
            </div>
            <div className="flex justify-around mr-5 border-t-2 py-2">
              <p className="font-bold mr-5 min-w-fit">Tiền hàng:</p>
              <p className="min-w-fit">1000 ₫</p>
            </div>
            <div className="flex justify-around mr-5">
              <p className="font-bold mr-5 min-w-fit">Vận chuyển:</p>
              <p className="min-w-fit">10000 ₫</p>
            </div>
            <div className="flex justify-around mr-5 border-y-2 my-5 py-2">
              <p className="font-bold mr-5 min-w-fit">Tổng cộng:</p>
              <p className="min-w-fit">123123 ₫</p>
            </div>
          </div>
          <div
            className="absolute box-border bottom-[-20px] w-full h-[35px] bg-repeat-x bg-[url('assets/img/bg-end-cart.svg')]"
            style={{
              backgroundPositionX: "-3px",
              backgroundPositionY: "-3px",
            }} />
        </div>
      </div>
    )
  }
}

export default Checkout