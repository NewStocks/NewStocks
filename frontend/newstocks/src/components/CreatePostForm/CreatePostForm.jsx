'use client';
import styles from './createpostform.module.css'
import { useEffect, useRef, useState } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import './toastui-editor-dark.css'

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { RiImageAddLine } from 'react-icons/ri'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default function CreatePostForm() {
  const editorRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {

    const editor = new Editor({
      el: document.querySelector('#editor'),
      height: '600px',
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      useCommandShortcut: false,
      hideModeSwitch: true,
      toolbarItems: [
        // 툴바 옵션 설정
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task'],
        // ['table', 'link'],
        // ['code', 'codeblock']
      ],
      plugins: [colorSyntax],
      theme: "dark"
    });

    editor.getMarkdown();

  }, [])

  const handleClick = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    if (editorRef.current) {
      console.log(editorRef.current)
      // console.log(editorRef.current.getInstance().getHTML());
      // // 입력창에 입력한 내용을 MarkDown 형태로 취득
      // console.log(editorRef.current.getInstance().getMarkdown());
    }
  };
  
  return (
    <div>
      <div className={styles["invest-container"]}>
        <div className={styles["invest-box"]}>
          <div className={styles["date-pick-box"]}>
            <div>매수</div>
            <DatePicker
              className={styles["datePicker"]}
              calendarClassName={styles["calenderWrapper"]}
              dayClassName={(d) => (d.getDate() === startDate?.getDate() ? styles.selectedDay : styles.unselectedDay)}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable
              placeholderText="날짜를 입력해주세요!"
            /> 
          </div>
          <div className={styles["option"]}><div>매수량</div><input type="text" id={styles["quantity"]} className={styles["stock-input-box"]}/></div>
          <div className={styles["option"]}><div>매수 가격</div><input type="text" className={styles["stock-input-box"]}/></div>
        </div>
        <div className={styles["invest-box"]}>
          <div className={styles["date-pick-box"]}>
            <div>매도</div>
            <DatePicker
              className={styles["datePicker"]}
              calendarClassName={styles["calenderWrapper"]}
              dayClassName={(d) => (d.getDate() === endDate?.getDate() ? styles.selectedDay : styles.unselectedDay)}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              isClearable
              placeholderText="날짜를 입력해주세요!"
            />
          </div> 
          <div className={styles["option"]}><div>매도량</div><input type="text" id={styles["quantity"]} className={styles["stock-input-box"]}/></div>
          <div className={styles["option"]}><div>매도 가격</div><input type="text" className={styles["stock-input-box"]}/></div>
        </div>
      </div>

      <div className={styles["title-input-box"]}>
        <input type="text" placeholder="제목을 입력하세요"/>
      </div>

      <div className={styles["image-add-container"]}>
        <button className={styles["image-add-button"]}>
          <div className={styles["image-title"]}><RiImageAddLine size="22"/><p>이미지 추가</p></div>
          <AiOutlinePlusCircle size="22"/>
        </button>
        <input type="text" placeholder="image 드래그앤 드롭으로 삽입"/>
      </div>

      <div id="editor" ref={editorRef}></div>

      <button onClick={handleClick}>지금 작성한 내용 확인해보기</button>
    </div>
  ) 
}