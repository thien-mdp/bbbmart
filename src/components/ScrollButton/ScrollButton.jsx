import React, { useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
               in place of 'smooth' */
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <div className='fixed w-full left-[92%] bottom-[40px] h-10 text-[3rem]'>
      <FaArrowCircleUp
        className='text-teal-500 w-15 h-15 animate-bounce bg-white rounded-full cursor-pointer'
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      />
    </div>
  )
}

export default ScrollButton
