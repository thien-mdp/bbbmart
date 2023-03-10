import React from 'react'
import Services from '../../services/Services'

const Footer = () => {
  return (
    <div className='bg-emerald-600 py-5 font-ConCung '>
      {/* <div className='mx-[10%] grid grid-cols-4 gap-4 my-5'>
        <Services/>
      </div> */}
      <div className='xs:mx-0 md:mx-[20%] flex items-center justify-between text-gray-200'>
        <div className='w-[40%] bg-emerald-700 rounded-tr-2xl rounded-bl-2xl px-5 pt-2 pb-4 '>
          <h1 className='text-2xl mb-2'>Công ty cổ phần BBB</h1>
          <div className='text-[15px] font-mono font-light truncate'>
            <span className='font-bold text-[16px] min-w-max mr-1'>Email:</span>
            cskh@bbb.com
          </div>
          <div className='text-[15px] font-mono font-light'>
            <span className='font-bold text-[16px] min-w-max mr-1'>Điện thoại:</span>
            078 2222 884
          </div>
          <div className='text-[15px] font-mono font-light'>
            <span className='font-bold text-[16px] min-w-max mr-1'>Địa chỉ:</span>
            Tầng 14 Tòa nhà Phú Mỹ Hưng Tower, 08 Hoàng Văn Thái, P.Tân Phú, Q.7, HCM
          </div>
        </div>
        <div className='flex items-center justify-between w-[60%]'>

          <div className='font-ConCung text-2xl w-[50%] text-center'>
            <h1 className=''>BBB Market</h1> 
            <div className='text-[15px] font-mono font-light'>
              <p className='cursor-pointer hover:text-yellow-500'>Giới thiệu về BBB</p>
              <p className='cursor-pointer hover:text-yellow-500'>Tuyển dụng khối cửa hàng</p>
              <p className='cursor-pointer hover:text-yellow-500'>Điều khoản sử dụng</p>
              <p className='cursor-pointer hover:text-yellow-500'>Chính sách bảo mật</p>
            </div>
          </div>

          <div className='font-ConCung text-2xl w-[50%] text-center'>
            <h1 className=''>Hỗ trợ khách hàng</h1> 
            <div className='text-[15px] font-mono font-light'>
              <p className='cursor-pointer hover:text-yellow-500'>Fanpage</p>
              <p className='cursor-pointer hover:text-yellow-500'>Mua & giao nhận online</p>
              <p className='cursor-pointer hover:text-yellow-500'>Qui định & hình thức thanh toán</p>
              <p className='cursor-pointer hover:text-yellow-500'>Đổi trả & hoàn tiền</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer