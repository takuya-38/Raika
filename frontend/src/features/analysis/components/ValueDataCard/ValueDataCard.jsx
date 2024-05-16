import styles from '@/features/analysis/components/Home/Home.module.css'
import { MoneyIcon, UsersIcon } from '@/public/icons/svgIcon'
import { Card } from '@mui/material'

const ValueDataCard = ({ data, className }) => {
  return (
    <Card className={`${styles.card} ${className}`}>
      <p className={styles.titleBox}>
        <span>{data.title}</span>
      </p>
      <div className={styles.valueDataContent}>
        <UsersIcon />
        <p>{data.users}</p>
      </div>
      <div className={styles.valueDataContent}>
        <MoneyIcon />
        <p>{data.money.toLocaleString()}</p>
      </div>
    </Card>
  )
}

export default ValueDataCard
