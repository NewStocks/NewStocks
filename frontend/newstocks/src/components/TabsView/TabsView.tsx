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
        {tabName?.get('tab') === 'chat' && (<Chat />)}
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
            <LoginModal type="note"/>
          )
        )}
      </Provider>
    </div>
  );
  
}
