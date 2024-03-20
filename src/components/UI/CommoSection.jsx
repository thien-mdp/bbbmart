import React from 'react'

const CommoSection = ({ title }) => {
  return (
    <section className='bg-gradient-to-r from-cyan-500 to-blue-500 bg-contain'>
      <div>
        <h1>{title}</h1>
      </div>
    </section>
  )
}

export default CommoSection
