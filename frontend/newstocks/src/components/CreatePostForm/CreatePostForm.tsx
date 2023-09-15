'use client';
import styles from './createpostform.module.css'
import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export default function CreatePostForm() {
  const editorRef = useRef();

  const handleClick = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef.current?.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    console.log(editorRef.current?.getInstance().getMarkdown());
  };

  return (
    <div>
      <Editor
        previewStyle="vertical" // 미리보기 스타일 지정
        height="600px" // 에디터 창 높이
        initialEditType="hello react editor world!" // 초기 입력모드 설정(디폴트 markdown)
        useCommandShortcut={true}
        ref={editorRef}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
        plugins={[colorSyntax]}
      ></Editor>
      <button onClick={handleClick}>지금 작성한 내용 확인해보기</button>
    </div>
  ) 
}