'use client'
import React, { useState, useEffect, useRef } from 'react';
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
  max-width: 100%;
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
  color: #4FE7B0; /* 영어 부분 텍스트 색상을 원하는 색상으로 변경하세요. */
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  code: any;
};

export default function ValuechainModal({ isOpen, onClose, code }: ModalProps) {
  const [modalOpen, setModalOpen] = useState(isOpen);
  // const scriptRef = useRef<HTMLScriptElement | null>(null);

  // 모달의 상태 변경
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  // useEffect(() => {
  //   if (modalOpen && scriptRef.current) {
  //     // 모달이 열린 상태에서 스크립트 추가
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
  //     script.async = true;
  //     script.text = JSON.stringify({
  //       colorTheme: 'dark',
  //       isTransparent: false,
  //       largeChartUrl: '',
  //       displayMode: 'regular',
  //       width: 800,
  //       symbol: 'NASDAQ:AAPL',
  //       locale: 'kr',
  //     });

  //     scriptRef.current.appendChild(script);
  //   }
  // }, [modalOpen]);

  if (!modalOpen) return null;

  

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <h3><PointText>삼성 전자 {code}</PointText >의 밸류체인</h3>
          <CloseButton onClick={() => { onClose(); setModalOpen(false); }}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          {/* <div ref={scriptRef}></div> */}
          <p>
            삼전이랑 연결된 밸류체인
            코드는 {code}
          </p>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}

// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://kr.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">트레이딩뷰에서 모든 시장 추적</span></a></div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js" async>
//   {
//   "symbol": "NASDAQ:AAPL",
//   "width": 1000,
//   "locale": "kr",
//   "colorTheme": "dark",
//   "isTransparent": false
// }
//   </script>
// </div>
// <!-- TradingView Widget END -->