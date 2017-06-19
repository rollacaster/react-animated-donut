import React, { Component } from 'react'
import { arc, pie } from 'd3-shape'

class AnimatedDonut extends Component {
  state = {
    strokeDashoffsets: [45 * Math.PI, 45 * Math.PI, 45 * Math.PI, 45 * Math.PI]
  }

  render() {
    const data = [
      { value: 25, color: '#ED696C' },
      { value: 25, color: '#f0e387' },
      { value: 25, color: '#d6d6d6' },
      { value: 25, color: '#43b4a1' }
    ]
    const arcs = pie().value(d => d.value)(data)
    const drawArc = arc().outerRadius(45).innerRadius(45)
    const { strokeDashoffsets } = this.state
    const { children } = this.props

    if (strokeDashoffsets.every(offset => offset <= 0)) {
      console.log('done')
      clearInterval(this.interval)
    }

    return (
      <div style={{ width: '30%' }}>
        <svg viewBox="0 0 100 100">
          <g transform="translate(50, 50)">
            {arcs.map((arc, i) => (
              <path
                key={i}
                d={drawArc(arc)}
                style={{
                  stroke: arc.data.color,
                  strokeWidth: 2,
                  strokeDasharray: 45 * Math.PI,
                  strokeDashoffset: strokeDashoffsets[i]
                }}
              />
            ))}
            {children}
          </g>
        </svg>
      </div>
    )
  }

  componentDidMount() {
    this.interval = setInterval(() =>
      window.requestAnimationFrame(
        () =>
          this.setState(({ strokeDashoffsets }) => ({
            strokeDashoffsets: strokeDashoffsets.map(
              (offset, i) =>
                offset > 45 * Math.PI / 2 &&
                  (i === 0 ||
                    (strokeDashoffsets[i - 1] &&
                      strokeDashoffsets[i - 1] <= 45 * Math.PI / 2))
                  ? offset - 1
                  : offset
            )
          })),
        10
      )
    )
  }
}

export default AnimatedDonut
