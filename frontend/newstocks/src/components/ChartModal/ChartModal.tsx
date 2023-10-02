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
          <ModalHeader><h3>차트 이용 방법</h3></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles["logo"]}>
							<Image
								src={stockimg}
                alt="stockimg"
							/>
							<div >
								<div className={styles["logo"]}>1. 해당 날짜의 일봉 차트 하단에는 <PointText>뉴스</PointText>, 상단에는 작성한 <PointText>오답노트</PointText> 유무 표시</div>
                <div className={styles["logo"]}>2. 해당 날짜 클릭 시 뉴스 및 오답노트 상세보기</div>  
								<div className={styles["logo"]}>3. <PointText>ValueChain</PointText> 버튼 클릭 시 해당 종목의 <PointText>ValueChain</PointText> 주식 정보 보기</div>  
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