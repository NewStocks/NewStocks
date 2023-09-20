import styles from './loginmodel.module.css'

export default function LoginModal() {
  return (
    <>
      <div className={styles["overlay"]}>
        <div className={styles["login-modal-container"]}>
          Login Modal
        </div>
      </div>
    </>
  )
}