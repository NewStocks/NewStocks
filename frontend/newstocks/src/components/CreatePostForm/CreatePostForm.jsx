'use client';
import styles from './createpostform.module.css'
import { useEffect, useRef } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import './toastui-editor-dark.css'

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export default function CreatePostForm() {
  const editorRef = useRef();

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
      <div>
        <div>
          <div>매수</div>
          <div className={styles["option"]}><div>매수량</div><input type="text" id={styles["quantity"]} className={styles["stock-input-box"]}/></div>
          <div className={styles["option"]}><div>매수 가격</div><input type="text" className={styles["stock-input-box"]}/></div>
        </div>
        <div>
          <div>매도</div>
          <div className={styles["option"]}><div>매도량</div><input type="text" id={styles["quantity"]} className={styles["stock-input-box"]}/></div>
          <div className={styles["option"]}><div>매도 가격</div><input type="text" className={styles["stock-input-box"]}/></div>
        </div>
      </div>

      <div id="editor" ref={editorRef}></div>

      <button onClick={handleClick}>지금 작성한 내용 확인해보기</button>
    </div>
  ) 
}