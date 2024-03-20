import React, { useEffect, useState } from 'react'

const Clock = () => {
  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()

  let interval
  const countDown = () => {
    const destination = new Date('Mar 9, 2030').getTime()
    interval = setInterval(() => {
      const now = new Date().getTime()
      const different = destination - now

      const days = Math.floor(different / (1000 * 60 * 60 * 24))
      const hours = Math.floor((different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((different % (1000 * 60)) / 1000)

      if (destination < 0) clearInterval(interval.current)
      else {
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
      }
    })
  }
  useEffect(() => {
    countDown()
  }, [])
  return (
    <div className='flex h-full'>
      <div className='flex sm:text-xl xs:text-base text-white ml-2'>
        {/* <h1 className='bg-sky-800 py-1 px-2 rounded-lg '>{days}</h1>
            <p className='text-black mx-[1px]'>:</p> */}
        <h1 className='bg-teal-500 py-1 rounded-lg px-2 text-center'>{hours}</h1>
        <p className='text-black mx-[1px] text-2xl font-bold'>:</p>
        <h1 className='bg-teal-500 py-1 rounded-lg px-2 text-center'>{minutes}</h1>
        <p className='text-black mx-[1px] text-2xl font-bold'>:</p>
        <h1 className='bg-teal-500 py-1 rounded-lg px-2 text-center'>{seconds}</h1>
      </div>
    </div>
  )
}

export default Clock
