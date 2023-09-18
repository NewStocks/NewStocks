'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


type TabProps = {
  code: any;
};

export default function TabNotes({ code }: TabProps) {

	useEffect(() => {
    const fetchData = () => {
      axios({
        method: 'get',
        url: `http://localhost:8200/review-note/30`,
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
		<div>
			{code}에 해당하는 오답노트
		</div>
  
  )
}