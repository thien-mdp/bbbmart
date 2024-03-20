import { Avatar, Button, Carousel, Divider, Form, Input, InputNumber, List, Rate, Skeleton, Spin } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'
import ImageMagnifier from '../components/ImageMagnifier'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { cartActions } from '../redux/slices/cartSlice'
import ProductList from '../components/UI/ProductList'
import { BsFillCaretRightFill } from 'react-icons/bs'
import icon_hethang from '../assets/img/tam-het-hang.png'
import TextArea from 'antd/es/input/TextArea'

const ProductDetails = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [rating, setRating] = useState([])
  const [loading, setLoading] = useState(true)
  const [listReview, setListReview] = useState([])
  const [quantity, setQuantity] = useState()
  const navigate = useNavigate()

  const reviewUser = useRef()
  const reviewMsg = useRef()

  const product = products.find((item) => item.id == id)
  const related = []
  const other = []

  const dispatch = useDispatch()
  // const product = products.find(item => item.id === id)
  const fetchData = async () => {
    const res = await axios('https://dummyjson.com/products?limit=100')
    if (res.status == 200) {
      setProducts(res.data.products)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  products.filter((element) => {
    if (element.category === product.category) {
      related.push(element)
    }
  })

  for (let i = 4; i < products.length; i += 8) {
    other.push(products[i])
  }
  // console.log(product)

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: quantity
      })
    )

    toast.success('Đã thêm vào giỏ hàng !')
  }
  const buyNow = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
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
  // console.log(product)
  // const {img, title, price, rating, review, description} = product;

  return (
    <Helmet title={`${product ? product.title : ''}`}>
      <CommoSection />
      {!loading ? (
        <section className='xs:mx-2 md:mx-[20%] min-h-[90vh] font-mono'>
          <div className='flex my-10'>
            <div className='w-[65%] flex'>
              <div className='w-[20%] max-h-[400px]'>
                {product?.images.slice(0, 3).map((item, index) => (
                  <img key={index} className='object-cover mx-auto min-w-full my-1 h-auto max-h-[100px] cursor-pointer' src={item} />
                ))}
              </div>
              <div className='w-[80%] h-auto mt-1 ml-2'>
                <ImageMagnifier style={'object-cover mx-auto min-w-full h-auto min-h-[400px] cursor-zoom-in'} src={product?.images?.[0]} />
              </div>
            </div>

            <div className='w-[35%] ml-10'>
              {product.stock > 0 ? null : (
                <h1 className='py-2 absolute z-50'>
                  <img src={icon_hethang} className='w-auto' />
                </h1>
              )}
              <div className='flex items-baseline'>
                <h1 className='text-4xl min-w-fit font-ConCung'>{product.title}</h1>
              </div>
              <div className='py-2 xs:grid 2xl:flex items-end'>
                <Rate disabled allowHalf defaultValue={product.rating} className='xs:text-sm sm:text-xl mr-5' />
                <p className='text-md '>(203 Đánh giá)</p>
              </div>
              <div className='flex justify-between items-center'>
                <h1 className=' font-bold py-2 text-xl'>{product.price},000 ₫</h1>
              </div>
              <div className='py-2 '>
                <div className='xs:grid lg:flex items-center'>
                  <InputNumber
                    min={1}
                    max={product.stock}
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
                {product.brand}
              </h1>
            </div>
          </div>
          <div>
            <p className='py-2 text-2xl mr-2 min-w-fit font-ConCung'>Mô tả sản phẩm: </p>
            <p className='font-base mt-5'>{product.description}</p>
            <img className='object-cover mx-auto w-[50%] my-5 h-auto cursor-pointer' src={product.images?.[1]} />
            <p className='font-base'>
              Khăn ướt Mamamy với thiết kế nhỏ gọn, tiện cầm tay và đút túi dùng trong những chuyến đi xa, du lịch cùng gia đình, bè bạn.
              Sản phẩm có nắp đậy giúp giữ ẩm và bảo quản khăn, tránh nhiễm khuẩn ngược. Khăn ướt VS Mamamy 100 tờ, có nắp, không mùi Vải
              không dệt,hàm lượng sợi 60%, dầy, mềm mại không xơ, độ đàn hồi cao, dẫn xuất đường glucose từ nho thiên nhiên giúp giữ ẩm và
              làm mềm da được cấp bằng sáng chế số US8877703B2 của hoa kỳ,coco phospatidyl PG - Dimonium chloride có tác dụng chống hăm,
              chống rôm sẩy được cấp bằng sáng chế số US 7803746B2 của hoa kỳ, chlorhexidine gluconate solution* có tác dụng kháng khuẩn WHO
              chỉ định trong nước xúc miệng, thích hợp cho da em bé kể cả da nhạy cảm Thành phần : Vải không dệt, nước tinh khiết 99,9%,
              coco phospatidyl PG - Dimonium chloride, stearyldimoniumhydroxypropyl laurylgluccosides chloride, chlorhexidine gluconate
              solution* (13 - tetraazatertradecanediimidamide 4 - chlorophenyl, 12 diimi - no - di -D - gluconate; hexamethlenebis THÔNG TIN
              SẢN PHẨM Thương hiệu : Mamamy Nơi sản xuất : Việt Nam Số lượng : 100 tờ / gói Kích thước: 200mm* 150mm HƯỚNG DẪN SỬ DỤNG Mở
              nắp, bóc bỏ miếng decal phía trong, rút từng chiếc khăn sử dụng. Sau khi sử dụng xong đóng nắp lại để giữ ẩm và chống nhiễm
              khuẩn HƯỚNG DẪN BẢO QUẢN Bảo quản nơi khô mát, tránh ánh nắng trực tiếp và những nơi có nhiệt độ cao Chú ý : Sản phẩm không
              tan trong nước
            </p>
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
