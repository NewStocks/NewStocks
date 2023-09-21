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
  return (
    <>
        {type==="nav" ? 
        (
        <>
          <div className={styles["login-subtitle"]}><span>NEWStocks</span>의 더 많은 서비스 이용하기</div>
          <button onClick={onOpen}>
            <div className={styles["login-title"]}>로그인 | 회원가입</div>
            <div className={styles["login-icon"]}><PiArrowSquareRightBold size="21"/></div>
          </button>
        </>
        )
        :
        (<>
          <button className={styles["login-button"]} onClick={onOpen}>로그인</button>
        </>) 
        } 
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