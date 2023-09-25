import styles from './ValueModal.module.css'
import styled, { keyframes } from 'styled-components';

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
import { LiaQuestionCircleSolid } from "react-icons/lia";

const PointText = styled.span`
  color: #4FE7B0; 
`;


export default function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <button onClick={onOpen}><LiaQuestionCircleSolid className={styles["icon"]}/></button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="#262730" top="20%">
          <ModalHeader><h3><PointText>밸류체인(Value Chain)</PointText > 이란?</h3></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles["logo"]}>
							<PointText>밸류체인</PointText >은 가치사슬이라는 의미로 제품을 생산하기 위해서 제조공정을 세분화해 <PointText>사슬
							(Chain)</PointText >처럼 엮여 <PointText>가치 (Value)</PointText >를 창출하는 것을 의미합니다. 
							기업이 제품 및 서비스를 생산해서 부가가치를 생성하는 모든 과정을 말합니다.
						</div>
          </ModalBody>

          <ModalFooter>
            <Button mb={4} colorScheme={"#4dd7a4;"} w={"100%"} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}