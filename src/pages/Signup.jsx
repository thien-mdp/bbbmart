import { Button, Checkbox, Form, Input, Modal, Skeleton, Spin, Upload } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { BiUpload, BiUser } from 'react-icons/bi'
import PinInput from 'react-pin-input'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Helmet from '../components/Helmet/Helmet'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../firebase.config'
import { storage } from '../firebase.config'
import { db } from '../firebase.config'

const Signup = () => {
  const [open, setOpen] = useState(false)
  const [inputValues, setInputValues] = useState({})
  const [file, setFile] = useState(null)
  const [inputOTP, setInputOTP] = useState()
  const [OTP, setOTP] = useState()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [modalText, setModalText] = useState('')
  let ele = useRef()

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const showModal = () => {
    setOpen(true)
  }

  useEffect(() => {
    setModalText(`Nhập OTP: (${OTP})`)
  }, [OTP])

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
    setTimeout(() => {
      ele.clear()
    }, 200)
  }

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setConfirmLoading(true)
    try {
      if (inputOTP == OTP) {
        const userCredential = await createUserWithEmailAndPassword(auth, inputValues.email + '@gmail.com', inputValues.password)
        const user = await userCredential.user

        const storageRef = ref(storage, `images/${Date.now() + '_' + inputValues.username}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          (error) => {
            toast.error(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(user, {
                displayName: inputValues.username,
                photoURL: downloadURL
              })
              await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: inputValues.username,
                email: inputValues.email + '@gmail.com',
                photoURL: downloadURL
              })
            })
          }
        )
        toast.success('Đăng ký thành công')
        setConfirmLoading(true)
        handleCancel()
        navigate('/login')
      } else {
        setConfirmLoading(true)
        setTimeout(() => {
          setConfirmLoading(false)
          setLoading(false)
          toast.warning('Sai OTP')
        }, 500)
      }
    } catch (error) {
      setConfirmLoading(false)
      setLoading(false)
      toast.error(JSON.stringify(error.code))
      if (error.code == 'auth/email-already-in-use') {
        handleCancel()
      }
      console.log(error)
    }
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    setOTP(Math.floor(1000 + Math.random() * 9000))
    setInputValues((prev) => ({ ...prev, email: values.email, password: values.password, username: values.username }))
    showModal()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    toast.warning('Bạn nhập thiếu gì rồi kìa !')
  }
  return (
    <Helmet title='Đăng ký'>
      <section>
        <div className={`mx-[10%] my-10 grid grid-cols-2 xs:grid-cols-1 lg:grid-cols-2 gap-4 font-mono min-h-[510px]`}>
          <Form
            layout='vertical'
            name='basic'
            className='!w-full'
            labelAlign='right'
            initialValues={{ acceptCS: true, acceptInfo: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Nhập số điện thoại của phụ huynh'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại'
                }
              ]}
            >
              <Input size='large' addonBefore={'+84'} placeholder='Nhập số điện thoại' />
            </Form.Item>
            <Form.Item
              label='Mật khẩu'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu'
                }
              ]}
            >
              <Input type='password' size='large' placeholder='Nhập mật khẩu' />
            </Form.Item>
            <Form.Item
              label='Tên người dùng'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên của bạn'
                }
              ]}
            >
              <Input size='large' placeholder='Nhập tên của bạn' />
            </Form.Item>
            <Form.Item
              name='file'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Vui lòng nhập tên của bạn',
              //   },
              // ]}
            >
              <Upload
                listType='picture'
                accept='.png,.jpg,.jpeg'
                beforeUpload={(file) => {
                  // this.setState(prevState => ({
                  //   fileUpload: [...prevState.fileUpload, file]
                  // }));
                  // console.log({file})
                  setFile(file)
                }}
                customRequest={dummyRequest}
              >
                <Button className='flex items-center '>
                  <BiUpload className='mr-2 w-5 h-5' />
                  Ảnh đại diện
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='acceptCS'
              valuePropName='checked'
              className='!mb-[-1px]'
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Bạn chưa đồng ý các điều khoản')))
                }
              ]}
            >
              <Checkbox>
                Tôi đã đọc và đồng ý với các{' '}
                <Link to={'#dieukhoan'} className='text-blue-600'>
                  điều khoản
                </Link>{' '}
                của BB Market
              </Checkbox>
            </Form.Item>
            <Form.Item
              name='acceptInfo'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Bạn chưa đồng ý với chính sách bảo vệ thông tin cá nhân'))
                }
              ]}
            >
              <Checkbox>
                Tôi đã đọc và đồng ý với{' '}
                <Link to={'#chinhsach'} className='text-blue-600'>
                  chính sách bảo vệ thông tin cá nhân
                </Link>{' '}
                của BB Market
              </Checkbox>
            </Form.Item>

            <Form.Item className='!w-full flex justify-center'>
              <Button className='bg-teal-600 text-center font-semibold text-xl h-10' type='primary' htmlType='submit'>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <div className='w-full'>
            <img alt='' src='/src/assets/img/login-banner.png' className='w-full max-h-[400px] bg-cover rounded-lg' />
          </div>
        </div>
        <Modal
          open={open}
          onOk={(e) => signup(e)}
          title={modalText}
          okText='Đăng ký'
          cancelText='Hủy bỏ'
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div className='text-center relative min-h-[70px]'>
            {loading ? (
              <div className='absolute w-full h-full top-[50%] z-[9999999]  my-auto'>
                <Spin />
              </div>
            ) : (
              <PinInput
                length={4}
                initialValue=''
                focus
                // secret
                // secretDelay={100}
                onChange={(value, index) => {
                  setInputOTP(value)
                }}
                type='numeric'
                inputMode='number'
                style={{ padding: '10px', borderRadius: '5px' }}
                // inputStyle={{ borderColor: 'red', borderRadius:'5px' }}
                inputFocusStyle={{ borderColor: 'blue', borderRadius: '5px' }}
                onComplete={(value, index) => {
                  setInputOTP(value)
                }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                ref={(n) => (ele = n)}
              />
            )}
          </div>
        </Modal>
      </section>
    </Helmet>
  )
}

export default Signup
