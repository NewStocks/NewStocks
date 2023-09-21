import styles from './footer.module.css'

export default function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["LOGO"]}>
        <p>
          <svg width="30" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path
                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                fill="#FFF"
              />
              <path
                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                fill="#555AB9"
              />
              <path
                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                fill="#91BAF8"
              />
            </g>
          </svg>
        </p>
        <div className={styles["logo-title"]}>
          <div id={styles["main-title"]}>NEWStocks</div>
          <div id={styles["sub-title"]}>STOCK NEWS AND REVIEW</div>
        </div>
      </div>
      <div className={styles["footer-content"]}>
        <div><button>개인정보 처리 방침</button> | <button>서비스 이용 약관</button></div><br />
        <div id={styles["footer-content-text"]}>대표 : 오성락 | 주소 : 서울시 강남구 테헤란로 212 | 대표번호 : 02-3429-5100</div>
        <div>COPYRIGHTⓒ 2023 A210 OH GOOD TEAM ALL RIGHTS RESERVED</div>
      </div>
    </div>
  )
}