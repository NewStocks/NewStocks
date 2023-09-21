'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link'; 
import styled from 'styled-components';
import { fetchReviewNoteData } from '@/services/chart';
import Notepreview from '@/components/Notepreview/Notepreview';
import StockProfile from "@/components/StockProfile/StockProfile";
import styles from './TabNotes.module.css';

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
  const notesPerPage = 5;


  useEffect(() => {
    const fetchData = () => {
      fetchReviewNoteData()
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
					stockName="오답노트"
					stockId=""
					stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${code}.png`}
				/>
			</div>
	  	<StyledLink href={`/community/create`}>
      	<div className={styles["Notetab-create"]}>오답노트 작성하기</div>          
    	</StyledLink>
        {noteDate &&
          datenote.map((item: any) => (
              <StyledLink key={item.id} href={`/community/${item.id}`}>
								<Notepreview 
									title = {item.title}
									date = {item.settingDate.split(' ')[0]}
									name = {item.memberDto.name}
									content = {item.content}
								/> 
              </StyledLink>
          ))}
        {!noteDate &&
          note.map((item: any) => (
              <StyledLink key={item.id} href={`/community/${item.id}`}>
                <Notepreview 
									title = {item.title}
									date = {item.settingDate.split(' ')[0]}
									name = {item.memberDto.name}
									content = {item.content}
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
