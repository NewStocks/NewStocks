'use client'
import styles from './ValueStockModal.module.css'
import styled, { keyframes } from 'styled-components';
import { SingleTicker } from "react-ts-tradingview-widgets";
import { CompanyProfile } from "react-ts-tradingview-widgets";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
import { PiTreeStructure } from "react-icons/pi";


const PointText = styled.span`
  color: #4FE7B0; 
`;

type ModalProps = {
  code: any;
};
// type SingleTicker={
//   colorTheme : string
//   isTransparent: boolean
//   locale : string
//   showSymbolLogo : boolean
//   width: string
//   symbols: string
// }

export default function LoginModal({code}: ModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const fetchData = () => {
      axios({
          method: 'get',
          url: `http://localhost:8200/stock/find-all-value-chains-of-stock/005930`
          })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [code]);


  return (
    <>
        <button onClick={onOpen}><PiTreeStructure className={styles["icon"]}/></button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="#262730" top="20%">
          <ModalHeader><h3><PointText>{code}</PointText >의 밸류체인</h3></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SingleTicker 
              colorTheme="dark"
              // isTransparent={true}
              locale="kr"
              // showSymbolLogo={true}
              width="300"
              symbol="NASDAQ:AAPL"
              //@ts-ignore
            >
            </SingleTicker>
            <CompanyProfile 
              colorTheme="dark" 
              height={400} 
              width="100%"
              symbol="NASDAQ:AAPL"
              locale="kr"
              >

            </CompanyProfile>
						
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