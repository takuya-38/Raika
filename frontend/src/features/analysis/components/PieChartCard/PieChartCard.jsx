import { Card } from '@mui/material'
import { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'
import styles from '@/features/analysis/components/HomeTab/HomeTab.module.css'

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <text
        x={cx}
        y={cy}
        dx={-135}
        textAnchor="middle"
        fill="#333"
      >{`PV ${value}`}</text>
      <text x={cx} y={cy} dx={-135} dy={18} textAnchor="middle" fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const PieChartCard = ({ title, className, color, data }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <Card className={`${styles.card} ${styles.pieChart} ${className}`}>
      <p className={styles.titleBox}>
        <span>{title}</span>
      </p>
      <div className={styles.pieChartBox}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width="100%" height="100%">
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="65%"
              cy="45%"
              innerRadius={50}
              outerRadius={70}
              fill={color}
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default PieChartCard
