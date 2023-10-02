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

type Props = {
  type: 'nav' | 'header' | undefined
}

export default function LoginModal({type}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const accessToken = localStorage.getItem("access-token")

  const handleLogout = () => {
    // 로그아웃 버튼을 눌렀을 때 실행될 코드
    localStorage.removeItem("access-token"); // access-token 제거
    window.location.href = '/'
  };

  return (
    <>  
      {type === "nav" ? 
        (
          accessToken ? (
            // 로그인 했고 nav바 일 때 넣어야할 것들 ex) 프로필 이미지, 내 정보로 가기 등
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
        ) : (
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