import React from 'react'
import ReactDOM from 'react-dom'
import Donut from './AnimatedDonut'
ReactDOM.render(
  <Donut
    data={[
      { value: 50, color: '#ED696C' },
      { value: 10, color: '#f0e387' },
      { value: 30, color: '#d6d6d6' },
      { value: 70, color: '#43b4a1' }
    ]}
    speed={5}
    width={5}
  />,
  document.getElementById('root')
)
