'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { PiTreeStructure } from 'react-icons/pi';
import { SingleTicker } from 'react-ts-tradingview-widgets';
import styles from './ValueStockModal.module.css';
import styled from 'styled-components';
import { fetchStockInfo} from '@/services/chart';

const PointText = styled.span`
  color: #4FE7B0; 
`;

type ModalProps = {
  code: any;
};

type ValueChain = {
  id: string;
  valueChainName: string;
};

type StockItem = {
  name: string
}

export default function ValueModal({ code }: ModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valueChains, setValueChains] = useState<ValueChain[]>([]);


  useEffect(() => {
      const fetchData = () => {
        fetchStockInfo(code)
          .then((res) => {
            // const date = new Date(res.data[0].publishTime).getTime()
            const stockData: StockItem = res.data.name;
            setStockData(stockData)
            console.log(code)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchData();

    }, [code]);
    
  useEffect(() => {
    const fetchData = () => {
      axios({
        method: 'get',
        url: `https://www.newstocks.kr/api/stock/find-all-value-chains-of-stock/${code}`
      })
      .then((res) => {
        console.log(res.data)
        setValueChains(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    fetchData();
  }, [code]);

  const[stockData, setStockData] = useState<StockItem | null>(null);

  

  return (
    <>
      <button className={styles['valuechain']} onClick={onOpen}>
        ValueChain{/* <PiTreeStructure className={styles['icon']} /> */}
      </button>
      <Modal size={'xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#262730" top="-5%">
          <ModalHeader>
            <h3>
              <PointText>{stockData ? stockData.name : ''}</PointText> 밸류체인
            </h3>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {valueChains.length === 0 ? (
              <p>밸류체인이 없습니다.</p>
            ) : (
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 3, marginRight: '16px' }}>
                  {valueChains.slice(0, 3).map((item) => (
                    <div key={item.id}>
                      <PointText className={styles['valuename']}>{item.valueChainName}</PointText>
                      <SingleTicker
                        colorTheme="dark"
                        locale="kr"
                        width="250"
                        symbol={`NASDAQ:${item.id}`}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ flex: 2 }}>
                  {valueChains.slice(3, 5).map((item) => (
                    <div key={item.id}>
                      <PointText className={styles['valuename']}>{item.valueChainName}</PointText>
                      <SingleTicker
                        colorTheme="dark"
                        locale="kr"
                        width="250"
                        symbol={`NASDAQ:${item.id}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mb={4} colorScheme={"#4dd7a4;"} w={"100%"} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
