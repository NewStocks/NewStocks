'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link'; 
import styled from 'styled-components';
import { fetchMyReviewNoteData } from '@/services/chart';
import Notepreview from '@/components/Notepreview/Notepreview';
import StockProfile from "@/components/StockProfile/StockProfile";
import styles from './TabNotes.module.css';
import { HiPencilAlt } from "react-icons/hi";

type TabProps = {
  code: any;
};


const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  `

export default function TabNotes({ code }: TabProps) {
  const noteDate = useSearchParams()?.get('date');
  const [note, setNote] = useState<any[]>([]);
  const [datenote, setdateNote] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 4;


  useEffect(() => {
    const fetchData = () => {
      fetchMyReviewNoteData()
        .then((res) => {
          const notecode: any[] = [];
          res.data.forEach((item: any) => {
            if (item.stockDto.id == code) {
              notecode.push(item);
            }
          });
					notecode.sort((a, b) => {
						const dateA = new Date(a.settingDate).getTime();
						const dateB = new Date(b.settingDate).getTime();
						return dateB - dateA;
					});

					const slicedNote = notecode.slice(
						(currentPage - 1) * notesPerPage,
						currentPage * notesPerPage
					);
			
					setNote(slicedNote);
          console.log(slicedNote)

          // setNote(notecode);
          const datenote: any[] = [];
          notecode.forEach((item: any) => {
            if (item.settingDate == null) {
              return;
            } else {
              const itemdate = item.settingDate.split(' ');
              if (itemdate[0] == noteDate) {
                datenote.push(item);
              }
            }
          });
          setdateNote(datenote);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [code, noteDate, currentPage]);

  return (
    <div>
			<div className={styles["Notetab-head"]}>
				<StockProfile
					stockName="나의 오답노트를 확인하세요"
					stockId=""
					stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${code}.png`}
				/>
			</div>
	  	<StyledLink href={`/community/create`}>
      	<div className={styles["Notetab-create"]}>오답노트 작성하기<HiPencilAlt className={styles["Notetab-create-icon"]}/></div>          
    	</StyledLink>
      {noteDate && datenote.length === 0 && (
      <div className={styles["no-notes"]}>오답노트가 없습니다.</div>
      )}
        {noteDate &&
          datenote.map((item: any) => (
              <StyledLink key={item.id} href={`/community/${item.id}`}>
								<Notepreview 
									title = {item.title}
									date = {item.settingDate.split(' ')[0]}
									name = {item.memberDto.name}
                  profile= {item.memberDto.profileImage}
									content = {item.content}
                  image = {item.reviewNoteImageDtoList[0]?.url}
                  likeCount = {item.likeCount}
                  scrapCount= {item.scrapCount}
								/> 
              </StyledLink>
          ))}
        {!noteDate && note.length === 0 && (
          <div className={styles["no-notes"]}>오답노트가 없습니다.</div>
        )}
        {!noteDate &&
          note.map((item: any) => (
              <StyledLink key={item.id} href={`/community/${item.id}`}>
                <Notepreview 
									title = {item.title}
									date = {item.settingDate?.split(' ')[0]}
									name = {item.memberDto.name}
                  profile = {item.memberDto.profileImage}
									content = {item.content}
                  image = {item.reviewNoteImageDtoList[0]?.url}
                  likeCount = {item.likeCount}
                  scrapCount = {item.scrapCount}
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
