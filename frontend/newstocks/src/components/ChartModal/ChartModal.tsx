import styles from './ChartModal.module.css'
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import stockimg from '@/assets/stockimg.png'

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


export default function ChartModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <button onClick={onOpen}><LiaQuestionCircleSolid className={styles["icon"]}/></button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="#262730" top="20%">
          <ModalHeader><h3>차트 설명??</h3></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles["logo"]}>
							<PointText>차트</PointText >뭐라고 설명하지..
							<Image
								src={stockimg}
                alt="stockimg"
							/>
							<div>
								<div>1. 해당 날짜에 해당하는 일봉 차트 하단에는 뉴스 및 상단에는 작성한 오답노트 표시</div>
								<div>2. 클릭시 뉴스 및 오답노트 상세보기</div> 
							</div>
								
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