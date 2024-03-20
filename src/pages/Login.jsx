import { Button, Checkbox, Form, Input, Modal, Spin, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import PinInput from 'react-pin-input'
import { Link, useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'

const Login = () => {
  const [inputValues, setInputValues] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // const login = async (values) => {
  //   // e.preventDefault()
  //   setLoading(true)

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, values.email + '@gmail.com', values.password)
  //     const user = userCredential.user
  //     setLoading(false)
  //     toast.success('Đăng nhập thành công!')
  //     navigate('/checkout')
  //   } catch (error) {
  //     setLoading(false)
  //     toast.error(JSON.stringify(error.code));
  //   }
  // }

  const onFinish = async (values) => {
    // console.log('Success:', values);
    // login(values)
    // setInputValues((prev) => ({ ...prev, email: values.email, password: values.password }));
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email + '@gmail.com', values.password)
      const user = userCredential.user
      setLoading(false)
      toast.success('Đăng nhập thành công!')
      navigate('/checkout')
    } catch (error) {
      setLoading(false)
      toast.error(JSON.stringify(error.code))
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    toast.warning('Bạn nhập thiếu gì rồi kìa !')
  }

  return (
    <Helmet title='Đăng nhập'>
      <section>
        {/* {
          loading ? (
            <div className='my-10min-h-[510px] w-full flex justify-center items-center'>
              <Spin size='large' className='mr-3'/> Loading ... !
            </div>
          ) : ( */}
        <div className='mx-[10%] my-10 grid grid-cols-2 xs:grid-cols-1 lg:grid-cols-2 gap-4 font-mono min-h-[510px]'>
          <Form
            layout='vertical'
            name='basic'
            className='!w-full'
            labelAlign='right'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <p className='text-center text-xl font-bold mt-2 mb-10'>Đăng nhập</p>
            <Form.Item
              label='Số điện thoại'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Nhập số điện thoại đăng nhập!'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Mật khẩu'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24
              }}
              className='m-[-1px]'
            >
              <Typography>
                Bạn chưa có tài khoản?{' '}
                <Link to={'/signup'} className='text-blue-500'>
                  Đăng ký ngay
                </Link>
              </Typography>
            </Form.Item>
            <Form.Item
              name='remember'
              valuePropName='checked'
              className='m-[-1px]'
              wrapperCol={{
                offset: 0,
                span: 24
              }}
            >
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24
              }}
            >
              <Link className='text-blue-500' to={'#quenmk'}>
                Quên mật khẩu ?
              </Link>
            </Form.Item>
            <Form.Item className='!w-full flex justify-center'>
              <Button
                className='bg-teal-600 text-center font-semibold text-base h-10 min-w-[150px]'
                type='primary'
                htmlType='submit'
                loading={loading}
                // onClick={(e)=>login(e)}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className='w-full'>
            <img alt='' src='/src/assets/img/login-banner.png' className='w-full max-h-[400px] bg-cover rounded-lg' />
          </div>
        </div>
      </section>
    </Helmet>
  )
}

export default Login
