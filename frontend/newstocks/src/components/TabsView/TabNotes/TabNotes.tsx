'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link'; 
import styled from 'styled-components';

import { fetchReviewNoteData } from '@/services/chart';

type TabProps = {
  code: any;
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  `

export default function TabNotes({ code }: TabProps) {
  const Date = useSearchParams()?.get('date');
  const [note, setNote] = useState<any[]>([]);
  const [datenote, setdateNote] = useState<any[]>([]);

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
          setNote(notecode);
          const datenote: any[] = [];
          notecode.forEach((item: any) => {
            if (item.settingDate == null) {
              return;
            } else {
              const itemdate = item.settingDate.split(' ');
              if (itemdate[0] == Date) {
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
  }, [code, Date]);

  return (
    <div>
      {code}에 해당하는 오답노트
	  	<StyledLink href={`/community/create`}>
      	<div>오답노트 작성하기</div>          
    	</StyledLink>
      <ul>
        {Date &&
          datenote.map((item: any) => (
              <StyledLink href={`/community/${item.id}`}>
                <p>{item.title} id : {item.id}</p> 
              </StyledLink>
          ))}
        {!Date &&
          note.map((item: any) => (
              <StyledLink href={`/community/${item.id}`}>
                <p>{item.title} id : {item.id}</p> 
              </StyledLink>
          ))}
      </ul>
    </div>
  );
}
