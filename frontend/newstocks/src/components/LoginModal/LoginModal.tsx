'use cline'
import { useEffect, useState } from "react"
import styles from './loginmodel.module.css'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import Logo from '@/components/Logo/Logo'
import LoginButtons from './LoginButtons/LoginButtons'

import { PiArrowSquareRightBold } from "react-icons/pi"
import { AiOutlineGlobal } from 'react-icons/ai'
import Link from 'next/link'
import { IoIosAddCircleOutline } from 'react-icons/io'

type Props = {
  type?: 'nav' | 'headerLogin' | 'headerCommunity' | 'note' | 'favorite' | undefined
  children?: React.ReactNode;
}

export default function LoginModal({type, children}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ accessToken, setAccessToken ] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {setAccessToken(token)}
  }, [])


  const handleLogout = () => {
    // 로그아웃 버튼을 눌렀을 때 실행될 코드
    localStorage.removeItem("access-token"); // access-token 제거
    window.location.href = '/'
  };

  return (
    <>
      {/* 관심 종목 추가 */}
      {type === "favorite" && (
        <div className={styles["like-button"]}>
          <button onClick={onOpen}>
          종목 추가
          <IoIosAddCircleOutline id={styles["like-button-icon"]} />
          </button>
        </div>
      )}
      {/* 차트 페이지에서 노트 탭 클릭했을 때 뜨는 것들 */}
      {type === "note" && (
        <div className={styles["mynote-out-box"]}>
          <div>NEWStocks에 가입해 오답 노트를 관리해보세요!</div>
          <button onClick={onOpen}>
            <div className={styles["login-box"]}>로그인<PiArrowSquareRightBold size={17} className={styles["login-icon"]}/></div>
          </button>
        </div>
      )}
      {type === "nav" &&
        (
          accessToken ? (
            <>
            </>
          ) : (
            <>
              <div className={styles["login-subtitle"]}>더 다양한 서비스 이용하기</div>
              <button onClick={onOpen}>
                <div className={styles["login-title"]}>로그인 | 회원가입</div>
                <div className={styles["login-icon"]}><PiArrowSquareRightBold size="21"/></div>
              </button>
            </>
          )
        )
      }
      {type === "headerLogin" && 
        (
          accessToken ? (
            <>
              <button className={styles["logout-button"]} onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button className={styles["login-button"]} onClick={onOpen}>로그인</button>
            </>
          )
        )}
      {/* {type === "headerCommunity" && 
        (
          accessToken ? (
              <Link className={styles["header-link"]} href='/community'><AiOutlineGlobal size="28"/></Link>
          ) : (
            <>
              <button><AiOutlineGlobal size="28" onClick={onOpen}/></button>
            </>
          )
        )} */}
      {!type &&
      (
        <section onClick={onOpen}>
          {children}
        </section>
      )}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="#262730">
          {/* <ModalHeader><Logo /></ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <div className={styles["logo"]}><Logo /></div>
            <LoginButtons />
          </ModalBody>

          <ModalFooter>
            <Button mb={4} colorScheme={"#4dd7a4;"} w={"100%"} onClick={onClose} color={"black"}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}