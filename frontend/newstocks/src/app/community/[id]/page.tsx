import styles from './detailpage.module.css'

type Props = {
  params: {
    id: string,
  }
  searchParams: {
    [key: string]: string | string[] | undefined 
  }
}

export default function DetailnotePage({ params, searchParams, }: Props) {
  return (
    <div className={styles.main}>
    </div>
  )
}