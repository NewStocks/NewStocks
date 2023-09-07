import styles from './minepage.module.css'

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined 
  }
}

export default function MynotesPage({ searchParams }: Props) {
  return (
    <div className={styles.main}>
      나의 노트: {searchParams.page}
    </div>
  )
}