import React, { Component } from 'react'
import { arc, pie } from 'd3-shape'

class AnimatedDonut extends Component {
  constructor(props) {
    super(props)
    const sum = props.data.reduce((a, b, i) => a + b.value, 0)

    this.state = {
      pathLengths: props.data.map(({ value }) => ({
        current: value / sum * 45 * Math.PI * 2 * 2,
        end: value / sum * 45 * Math.PI * 2
      }))
    }
  }

  render() {
    const { data } = this.props

    const arcs = pie().value(d => d.value).sort(_ => undefined)(data)
    const drawArc = arc().outerRadius(45).innerRadius(45)
    const { pathLengths } = this.state
    const { children } = this.props

    if (pathLengths.every(offset => offset.current <= offset.end)) {
      clearInterval(this.interval)
    }

    return (
      <div style={{ width: '50%' }}>
        <svg viewBox="0 0 100 100">
          <g transform="translate(50, 50)">
            {arcs.map((arc, i) => (
              <path
                key={i}
                d={drawArc(arc)}
                style={{
                  stroke: arc.data.color,
                  strokeWidth: 5,
                  strokeDasharray: pathLengths[i].end * 2,
                  strokeDashoffset: pathLengths[i].current
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
    this.interval = setInterval(() => {
      this.setState(({ pathLengths }) => ({
        pathLengths: pathLengths.map(
          (offset, i) =>
            offset.current > offset.end &&
              (i === 0 ||
                (pathLengths[i - 1] &&
                  pathLengths[i - 1].current <= pathLengths[i - 1].end))
              ? { ...offset, current: offset.current - 1 }
              : offset
        )
      }))
    }, 5)
  }
}

AnimatedDonut.defaultProps = {
  data: [
    { value: 50, color: '#ED696C' },
    { value: 10, color: '#f0e387' },
    { value: 30, color: '#d6d6d6' },
    { value: 70, color: '#43b4a1' }
  ]
}

export default AnimatedDonut
