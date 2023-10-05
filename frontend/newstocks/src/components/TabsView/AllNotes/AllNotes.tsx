'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link'; 
import styled from 'styled-components';
import { fetchStockReviewNoteData } from '@/services/chart';
import Notepreview from '@/components/Notepreview/Notepreview';
import StockProfile from "@/components/StockProfile/StockProfile";
import styles from './AllNotes.module.css';
import { HiPencilAlt } from "react-icons/hi";

type TabProps = {
  code: any;
};


const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  `

export default function TabNotes({ code }: TabProps) {
  const [note, setNote] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 4;


  useEffect(() => {
    const fetchData = () => {
      fetchStockReviewNoteData(code)
        .then((res) => {
          const notecode = res.data
					const slicedNote = notecode.slice(
						(currentPage - 1) * notesPerPage,
						currentPage * notesPerPage
					);
			
					setNote(slicedNote);

        })
        .catch((err) => {
          // console.log(err);
        });
    };
    fetchData();
  }, [code, currentPage]);

  return (
    <div>
			<div className={styles["Notetab-head"]}>
				<StockProfile
					stockName="모든 오답노트를 확인하세요"
					stockId=""
					stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${code}.png`}
				/>
			</div>
	  	<StyledLink href={{pathname: `/community/create`, query: code}}>
      	<div className={styles["Notetab-create"]}>오답노트 작성하기<HiPencilAlt className={styles["Notetab-create-icon"]}/></div>          
    	</StyledLink>
      
        {note.length === 0 && (
          <div className={styles["no-notes"]}>오답노트가 없습니다.</div>
        )}
        {note.map((item: any) => (
          <StyledLink key={item.id} href={`/community/${item.id}`}>
            <Notepreview 
							title = {item.title}
              createdDate = {item.createdDate.split(' ')[0]}
							date= {item.settingDate ? item.settingDate.split(' ')[0] : item.settingDate}
							name = {item.memberDto?.name}
							profile= {item.memberDto?.profileImage}
							content = {item.content}
							image = {item.reviewNoteImageDtoList[0]?.url}
              likeCount = {item.likeCount}
              scrapCount= {item.scrapCount}
              replyCount = {item.replyCount}
						/> 
          </StyledLink>
        ))}
			<div className={styles["pagination"]}>
      <button
				className={styles["pagebuttonbox"]}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <button
				className={styles["pagebuttonbox"]}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={note.length < notesPerPage}
      >
        다음
      </button>
    </div>
    </div>
  );
}
