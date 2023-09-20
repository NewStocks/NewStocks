'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import axios from 'axios';


type TabProps = {
  code: any;
	// id: any
};

export default function TabNotes({ code }: TabProps) {
	const Date = useSearchParams()?.get('date')
	// console.log(Date)
	const [note, setNote] = useState<any[]>([])
	const [datenote, setdateNote] = useState<any[]>([])

	useEffect(() => {
    const fetchData = () => {
      axios({
        method: 'get',
        url: `http://localhost:8200/review-note/find-all`,
      })
        .then((res) => {
          // console.log(res.data)
					const notecode:any[] = []
					res.data.forEach((item:any) => {
						if (item.stockDto.id == code) {
							notecode.push(item)
						}
					});
					setNote(notecode)
					const datenote:any[]=[]
					console.log(notecode)
					notecode.forEach((item:any) => {
						if (item.settingDate == null) {
							return
						} else {
							const itemdate = item.settingDate.split(' ');
						if (itemdate[0] == Date) {
							datenote.push(item)
							// console.log(itemdate)
						}
						}
						
					}) 
					// setdateNote
					setdateNote(datenote)
					// console.log(notecode[0].settingDate)
				})
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();

  }, [code, Date]);

	

  // console.log(note)

  return (
		<div>
			{code}에 해당하는 오답노트
			<div>오답노트 작성하기</div>
			<ul>
				{Date && datenote.map((item: any) => (
						<li key={item.id}>{item.title} id : {item.id}</li>
					))}
				
        {!Date && note.map((item: any) => (
          <li key={item.id}>{item.title} id : {item.id}</li>
        ))}
      </ul>

		</div>
  
  )
}