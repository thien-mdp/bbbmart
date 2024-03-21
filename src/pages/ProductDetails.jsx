import { Avatar, Button, Carousel, Divider, Form, Input, InputNumber, List, Rate, Skeleton, Spin } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'
import ImageMagnifier from '../components/ImageMagnifier'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { cartActions } from '../redux/slices/cartSlice'
import ProductList from '../components/UI/ProductList'
import { BsFillCaretRightFill } from 'react-icons/bs'
import icon_hethang from '../assets/img/tam-het-hang.png'
import TextArea from 'antd/es/input/TextArea'
import fetchBase from '../api/fetchBase'

const ProductDetails = () => {
  const { id } = useParams()
  const products = useSelector((state) => state.cart.products)
  const [product, setProduct] = useState()
  const [rating, setRating] = useState([])
  const [loading, setLoading] = useState(true)
  const [listReview, setListReview] = useState([])
  const [quantity, setQuantity] = useState()
  const navigate = useNavigate()

  const reviewUser = useRef()
  const reviewMsg = useRef()

  // const product = products.find((item) => item.id == id)
  const related = []
  const other = []

  const dispatch = useDispatch()
  // const product = products.find(item => item.id === id)

  const fetchData = async (id) => {
    const res = await fetchBase(`/api/products/${id}`)
    setProduct(res)
    setLoading(false)
  }
  useEffect(() => {
    if (id) {
      fetchData(id)
    }
  }, [id])

  if (product) {
    products.filter((element) => {
      if (element.categoryId === product.categoryId) {
        related.push(element)
      }
    })

    for (let i = 4; i < products.length; i += 12) {
      other.push(products[i])
    }
  }

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.fullName,
        price: product.basePrice,
        thumbnail: product.images?.[0],
        quantity: quantity
      })
    )

    toast.success('Đã thêm vào giỏ hàng !')
  }
  const buyNow = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.fullName,
        price: product.basePrice,
        thumbnail: product.images?.[0],
        quantity: quantity
      })
    )
    navigate('/cart')
  }

  const submitHandler = (values) => {
    // console.log('Success:', values);
    // const reviewUserName = reviewUser.current.value
    // const reviewUserMsg = reviewMsg.current.value
    const reviewUserName = values.name
    const reviewUserMsg = values.msg
    // console.log(reviewUserName, reviewUserMsg)
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating
    }

    setListReview([...listReview, reviewObj])
    toast.success('Đã gửi đánh giá', { theme: 'dark' })
  }

  console.log(quantity)

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  console.log('id', id)
  console.log('product', product)
  // const {img, title, price, rating, review, description} = product;

  return (
    <Helmet title={`${product ? product.fullName : ''}`}>
      <CommoSection />
      {!loading ? (
        <section className='xs:mx-2 md:mx-[10%] min-h-[90vh] font-mono'>
          <div className='flex my-10'>
            <div className='w-[65%] flex'>
              <div className='w-[10%] max-h-[400px]'>
                {product?.images.map((item, index) => (
                  <img key={index} className='object-cover mx-auto min-w-full my-1 h-auto max-h-[100px] cursor-pointer' src={item} />
                ))}
              </div>
              <div className='w-[80%] h-auto mt-1 ml-2'>
                <ImageMagnifier style={'object-cover mx-auto min-w-full h-auto min-h-[400px] cursor-zoom-in'} src={product?.images?.[0]} />
              </div>
            </div>

            <div className='w-[35%] ml-10'>
              {product.inventories[0].onHand > 0 ? null : (
                <h1 className='py-2 absolute z-50'>
                  <img src={icon_hethang} className='w-auto' />
                </h1>
              )}
              <div className='flex items-baseline'>
                <h1 className='text-4xl min-w-fit font-ConCung'>{product.fullName}</h1>
              </div>
              <div className='py-2 xs:grid 2xl:flex items-end'>
                <Rate disabled allowHalf defaultValue={product?.rating || 5} className='xs:text-sm sm:text-xl mr-5' />
                <p className='text-md '>(203 Đánh giá)</p>
              </div>
              <div className='flex justify-between items-center'>
                <h1 className=' font-bold py-2 text-xl'>
                  {product.basePrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </h1>
              </div>
              <div className='py-2 '>
                <div className='xs:grid lg:flex items-center'>
                  <InputNumber
                    min={1}
                    max={product.inventories[0].onHand}
                    defaultValue={1}
                    onChange={(value) => setQuantity(value)}
                    className='min-w-[40px] w-auto'
                  />
                  <h1
                    onClick={addToCart}
                    className='min-w-fit w-auto text-center bg-teal-500 p-1 rounded-lg text-gray-100 hover:bg-teal-700 font-bold cursor-pointer lg:ml-5 xs:mt-3 lg:mt-0'
                  >
                    Thêm vào giỏ hàng
                  </h1>
                </div>
                <Button onClick={buyNow} className='w-full mt-3 h-auto bg-blue-500  font-bold !text-white text-base hover:bg-blue-700 py-1'>
                  Mua ngay
                </Button>
              </div>
              <h1 className='py-2 flex'>
                <p className='font-bold min-w-fit mr-5'>Thương hiệu:</p>
                {product?.inventories[0]?.branchName}
              </h1>
            </div>
          </div>
          <div>
            <p className='py-2 text-2xl mr-2 min-w-fit font-ConCung'>Mô tả sản phẩm: </p>
            <p className='font-base mt-5'>{product.description}</p>
            <img className='object-cover mx-auto w-[50%] my-5 h-auto cursor-pointer' src={product.images?.[0]} />
            <p className='font-base'>Mô tả chi tiết sản phẩm</p>
          </div>
          <Divider />
          <div className='my-10'>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center max-w-max mb-2'>
              Sản phẩm tương tự <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              <ProductList data={related} />
            </div>
          </div>

          <div className='my-10'>
            <h1 className='text-2xl font-bold p-2 text-red-600 flex items-center max-w-max mb-2'>
              Sản phẩm khác <BsFillCaretRightFill className='ml-1' />
            </h1>

            <div className='w-full xs:bg-transparent md:bg-white rounded-xl'>
              <ProductList data={other} />
            </div>
          </div>
          <Divider />
          <div className='Rating'>
            <p className='py-2 text-2xl mr-2 mb-3 min-w-fit font-ConCung'>Đánh giá sản phẩm: </p>
            <div className='flex items-center'>
              <Avatar size={64}>m.dpt_</Avatar>
              <div className='ml-5'>
                <p className='font-semibold text-xl'>m.dpt_</p>
                <Rate value={5} disabled />
                <p>Sản phẩm này sài thích lắm nè</p>
              </div>
            </div>
            <Divider />
            {listReview?.map((item, index) => (
              <div key={index}>
                <div className='flex items-center'>
                  <Avatar size={64}>{item.userName.charAt(0).toUpperCase()}</Avatar>
                  <div className='ml-5'>
                    <p className='font-semibold text-xl'>{item.userName}</p>
                    <Rate value={item.rating} disabled />
                    <p>{item.text}</p>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
            {/* <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://joesch.moe/api/v1/random`} />}
                    title={<a href="https://ant.design">{}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item> */}
            <p className='py-2 text-2xl mr-2 mb-3 min-w-fit font-ConCung'>Đánh giá của bạn: </p>
            <Form
              name='basic'
              className='!w-full'
              // initialValues={{ remember: true }}
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item name='name' className='!w-full !mb-2' rules={[{ required: true, message: 'Bạn chưa nhập tên nè >"<' }]}>
                <Input className='!w-full' placeholder='Nhập tên của bạn ở đây !!' autoSize={{ minRows: 1, maxRows: 1 }} ref={reviewUser} />
              </Form.Item>
              <Form.Item name='rate' rules={[{ required: true, message: 'Bạn quên đánh giá sản phẩm rồi nè :P' }]}>
                <Rate onChange={(value) => setRating(value)} />
              </Form.Item>
              <Form.Item name='msg' rules={[{ required: true, message: 'Bạn chưa nhập nội dung phản hồi!!' }]}>
                <Input.TextArea placeholder='Nhập đánh giá' autoSize={{ minRows: 3, maxRows: 5 }} ref={reviewMsg} />
              </Form.Item>

              <Form.Item className='text-center'>
                <Button className='bg-teal-600 text-center font-semibold text-xl h-14' type='primary' htmlType='submit'>
                  Gửi đánh giá
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      ) : (
        <div className='flex w-full min-h-[70vh] justify-center items-center'>
          <Spin size='large'>
            <div className='content' />
          </Spin>
        </div>
      )}
    </Helmet>
  )
}

export default ProductDetails
