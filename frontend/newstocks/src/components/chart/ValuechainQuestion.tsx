import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// styled-components 써보기.. 모달 스타일
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in; /* fade-in 애니메이션 적용 */
`;

const ModalContainer = styled.div`
  // background-color: #4FE7B0;
  border: 1px solid #4FE7B0;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  max-width: 30%;
  max-height: 80%;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  background-color: rgba(0, 5, 30, 0.7);
  color: #fff;
`;

const ModalContent = styled.div`

  padding: 20px;
  background-color: rgba(0, 5, 30, 0.7);
`;

const CloseButton = styled.button`
  background: none;
  border: 1px solid #4FE7B0;
  border-radius: 8px;
  font-size: 20px;
  color: #4FE7B0;
  cursor: pointer;
`;

const PointText = styled.span`
  color: #4FE7B0; 
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [modalOpen, setModalOpen] = useState(isOpen);

  // 모달의 상태 변경
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  if (!modalOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <h3><PointText>밸류체인(Value Chain)</PointText > 이란?</h3>
          <CloseButton onClick={() => { onClose(); setModalOpen(false); }}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          <p>
          <PointText>밸류체인</PointText >은 가치사슬이라는 의미로 제품을 생산하기 위해서 제조공정을 세분화해 <PointText>사슬
            (Chain)</PointText >처럼 엮여 <PointText>가치 (Value)</PointText >를 창출하는 것을 의미합니다. 
            기업이 제품 및 서비스를 생산해서 부가가치를 생성하는 모든 과정을 말합니다.
          </p>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}