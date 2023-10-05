"use client";
import styles from "./TabsView.module.css";
import TabHeader from "./TabHeader/TabHeader";
import TabNotes from './TabNotes/TabNotes'
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import AllNotes from "./AllNotes/AllNotes";
import Chat from "./chat/Chat";

import { usePathname, useSearchParams } from "next/navigation";
import { getAccessToken } from '@/utils/token';
import LoginButtons from '../LoginModal/LoginButtons/LoginButtons';
import LoginModal from '../LoginModal/LoginModal';
import { Provider } from '@/utils/ChakraProvider';
import { PiArrowSquareRightBold } from 'react-icons/pi';


export default function TabsView() {
  const tabName = useSearchParams();
  const tabcode: string | null = usePathname()
  const code = tabcode ? tabcode.split('/').filter(Boolean)[0] : '';
  const accessToken = getAccessToken();

  return (
    <div>
      <Provider>
        <TabHeader />
    
        {tabName?.get('tab') === 'company' && (<CompanyInfo />)}
        {tabName?.get('tab') === 'chat' && (<div style={{display: "flex", justifyContent: "center", marginTop: "20px", color: "#3FBFA0"}}>추후 업데이트될 예정입니다.</div>)}
        {accessToken ? (
          <>
            {tabName?.get('tab') === 'more' && (
              <AllNotes code={code} />
            )}
            {tabName?.get('tab') === 'notes' && (
              <TabNotes code={code} />
            )}
          </>
        ) : (
          tabName?.get('tab') !== 'company' && tabName?.get('tab') !== 'chat' && (
            <div className={styles["mynote-out-box"]}>
              <div>NEWStocks에 가입해 <br/> 오답노트를 관리해보세요!</div>
              <LoginModal>
                <button>
                  <div className={styles["login-box"]}>로그인<PiArrowSquareRightBold size={22} className={styles["login-icon"]}/></div>
                </button>
              </LoginModal>
            </div>
          )
        )}
      </Provider>
    </div>
  );
  
}
