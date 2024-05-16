import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '@mui/material'
import styles from '@/features/analysis/components/Home/Home.module.css'

const LineChartCard = ({ title, data }) => (
  <Card className={`${styles.card} ${styles.lineChart}`}>
    <p className={styles.titleBox}>
      <span>{title}</span>
    </p>
    <div className={styles.chartBox}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke="#FEAD73"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="visits"
            stroke="#43B6C4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
)

export default LineChartCard
