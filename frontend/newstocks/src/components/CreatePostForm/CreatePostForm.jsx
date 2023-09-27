"use client";
import styles from "./createpostform.module.css";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Editor from "@toast-ui/editor";
// import { Editor } from '@toast-ui/react-editor';
import "@toast-ui/editor/dist/toastui-editor.css";
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import "./toastui-editor-dark.css";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RiImageAddLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";

import ImagePreview from "./ImagePreview/ImagePreview";
import SearchBox from "@/components/SearchBox/SearchBox";

import { Checkbox } from "@chakra-ui/react";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default function CreatePostForm({ type }) {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [imageList, setimageList] = useState([]);
  const [checkPrivate, setCheckPrivate] = useState(false);

  const changeImageList = (url, file) => {
    setimageList([...imageList, { url, file }]);
  };

  const handleImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.border = "2px dashed #ccc"; // 테두리 스타일 복원
    if (imageList.length > 4) {
      alert("이미지는 최대 5장 첨부 가능합니다!");
    } else {
      const file = e.dataTransfer.files[0]; // 드롭된 파일 가져오기
      const url = window.URL.createObjectURL(file);
      if (file) {
        changeImageList(url, file);
      }
    }
  };

  const imageInput = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");

    fileInput.click();

    fileInput.addEventListener("change", function (e) {
      e.preventDefault();
      if (imageList.length > 4) {
        alert("이미지는 최대 5장 첨부 가능합니다!");
      } else {
        const file = fileInput.files[0];
        const url = window.URL.createObjectURL(file);
        if (file) {
          changeImageList(url, file);
        }
      }
    });
  };

  // const MyComponent = () => (
  //   <Editor
  //     initialValue="hello react editor world!"
  //     previewStyle="vertical"
  //     height="600px"
  //     initialEditType="markdown"
  //     useCommandShortcut={true}
  //   />
  // );

  let editor = null;

  useEffect(() => {
    editor = new Editor({
      el: document.querySelector("#editor"),
      height: "600px",
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      useCommandShortcut: false,
      hideModeSwitch: true,
      toolbarItems: [
        // 툴바 옵션 설정
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task"],
        // ['table', 'link'],
        // ['code', 'codeblock']
      ],
      plugins: [colorSyntax],
      theme: "dark",
    });
  }, []);

  const handleClick = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    // console.log(editorRef.current.getInstance().getHTML());
    // // 입력창에 입력한 내용을 MarkDown 형태로 취득
    // console.log(editorRef.current.getInstance().getMarkdown());
    // imageList.map(image => {
    //   window.URL.revokeObjectURL(image.url)
    // })
    // console.log(editorRef.current.getInstance().getHTML())
    console.log(checkPrivate);
    console.log(imageList);
    console.log(startDate, endDate);
    console.log(editor.getHTML());
  };

  const deleteImage = (indexToRemove) => {
    // imageList.splice(index, 1)
    setimageList(imageList.filter((image, idx) => idx !== indexToRemove));
  };

  useEffect(() => {
    /* 이미지 드래그 앤 드롭 첨부 */
      if (document.getElementById('dropzone')) {
        const dropzone = document.getElementById('dropzone');
    
      if (dropzone) {
          // 드래그 앤 드롭 영역에 드래그되었을 때 이벤트 처리
          dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.style.border = '2px dashed #000'; // 드래그 중에는 테두리 스타일 변경
          });
    
          // 드롭 영역에서 떼어질 때 이벤트 처리
          dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();  
            dropzone.style.border = '2px dashed #ccc'; // 드래그가 끝나면 테두리 스타일 복원
          });
    
          // 이미지 파일이 드롭되었을 때 이벤트 처리
          dropzone.addEventListener('drop', handleImage);
      }} 
    return () => {
      const dropzone = document.getElementById('dropzone');
      dropzone?.removeEventListener('drop', handleImage);
    }
  // eslint-disable-next-line 
  }, [imageList])

  return (
    <div>
      <div className={styles["top-menu"]}>
        <p>오답노트 {type == "create" ? "작성" : "수정"}</p>
        <div>
          <div className={styles["check-privacy"]}>
            {checkPrivate ? (
              <BiSolidLock className={styles["privacy-icon"]} size="21" />
            ) : (
              <BiSolidLockOpen className={styles["privacy-icon"]} size="21" />
            )}
            <Checkbox
              colorScheme="red"
              onChange={(e) => setCheckPrivate(e.target.checked)}
            >
              <span>비밀글 설정</span>
            </Checkbox>
          </div>
          <button className={styles["submit-button"]}>✍ 게시하기</button>
        </div>
      </div>

      <div className={styles["stock-selected-box"]}>
        {/* <input type="text" placeholder="🔍종목검색" /> */}
        <SearchBox />
      </div>

      <div className={styles["invest-container"]}>
        <div className={styles["invest-box"]}>
          <div className={styles["date-pick-box"]}>
            <div>매수</div>
            <DatePicker
              className={styles["datePicker"]}
              calendarClassName={styles["calenderWrapper"]}
              dayClassName={(d) =>
                d.getDate() === startDate?.getDate()
                  ? styles.selectedDay
                  : styles.unselectedDay
              }
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable
              placeholderText="날짜를 입력해주세요!"
            />
          </div>
          <div className={styles["option"]}>
            <div>매수량</div>
            <input
              type="text"
              id={styles["quantity"]}
              className={styles["stock-input-box"]}
            />
          </div>
          <div className={styles["option"]}>
            <div>매수 가격</div>
            <input type="text" className={styles["stock-input-box"]} />
          </div>
        </div>
        <div className={styles["invest-box"]}>
          <div className={styles["date-pick-box"]}>
            <div>매도</div>
            <DatePicker
              className={styles["datePicker"]}
              calendarClassName={styles["calenderWrapper"]}
              dayClassName={(d) =>
                d.getDate() === endDate?.getDate()
                  ? styles.selectedDay
                  : styles.unselectedDay
              }
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              isClearable
              placeholderText="날짜를 입력해주세요!"
            />
          </div>
          <div className={styles["option"]}>
            <div>매도량</div>
            <input
              type="text"
              id={styles["quantity"]}
              className={styles["stock-input-box"]}
            />
          </div>
          <div className={styles["option"]}>
            <div>매도 가격</div>
            <input type="text" className={styles["stock-input-box"]} />
          </div>
        </div>
      </div>

      <div className={styles["title-input-box"]}>
        <input type="text" placeholder="제목을 입력하세요" ref={titleRef} />
      </div>

      <div className={styles["image-add-container"]}>
        <button className={styles["image-add-button"]} onClick={imageInput}>
          <div className={styles["image-title"]}>
            <RiImageAddLine size="22" />
            <p>이미지 추가</p>
          </div>
          <AiOutlinePlusCircle size="22" />
        </button>

        <div className={styles["dropzone"]} id="dropzone" onClick={imageInput}>
          <div>
            <RiImageAddLine size="32" />
          </div>
          <p>10mb 이하 jpeg, jpg, png 첨부</p>
        </div>
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          id="fileInput"
          style={{ display: "none" }}
        ></input>
      </div>

      {imageList.length >= 1 && (
        <>
          <div className={styles["image-list"]}>
            {imageList.map((image, index) => {
              return (
                <ImagePreview
                  key={index}
                  index={index}
                  url={image.url}
                  deleteImage={deleteImage}
                />
              );
            })}
            <div className={styles["length"]}>{imageList.length} / 5</div>
          </div>
        </>
      )}

      <div id="editor"></div>

      {/* <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        useCommandShortcut={false}
        initialEditType= 'wysiwyg'
        hideModeSwitch={true}
        toolbarItems={[
        // 툴바 옵션 설정
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task'],
        // ['table', 'link'],
        // ['code', 'codeblock']
        ]}
        plugins={[colorSyntax]}
        theme='dark'
        ref={editorRef}
      /> */}

      <button onClick={handleClick}>지금 작성한 내용 확인해보기</button>
    </div>
  );
}
