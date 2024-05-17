import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { Card } from '@mui/material'
import styles from '@/features/analysis/components/HomeTab/HomeTab.module.css'

const BarChartCard = ({ title, data, value_name, className, color }) => (
  <Card className={`${styles.card} ${styles.pieChart} ${className}`}>
    <p className={styles.titleBox}>
      <span>{title}</span>
    </p>
    <div className={styles.barChartBox}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={value_name} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>
)

export default BarChartCard
