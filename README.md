# 📌 주식 피드백을 도와주는 웹 서비스 NEWStocks
![image](https://github.com/HongEat-Team/HongEat-Backend/assets/76719828/f43c64bd-4bef-4e80-924d-eda798a27baf)

## 📌 **프로젝트 상세 내용**

### 프로젝트 개요

- 주식 차트에 내가 작성한 오답노트와 그 날 뉴스를 띄워 간편하게 주식 피드백을 할 수 있는 서비스

### 프로젝트 기간

- 개발 기간 : 2023.08 - 2023.10 (7주)

### 기술 스택

- 프레임워크: Spring boot (Java), Next.js (TypeScript)
- 서버: MySQL, Docker, EC2, RDS, S3, Gitlab, Jenkins
- 라이브러리 및 기타 솔루션
    - BackEnd
        - JWT, Json, Lombok, MapStruct
        - Jpa, Spring-security
    - Frontend
        - 상태관리: recoil
        - 차트: TradingView Lightweight Charts
        - 에디터: TOAST UI editor
        - 스타일링: Chakra UI, styled components, react-icons
    - AI
        - 뉴스 군집화: DBSCAN
        - 감성분석: BERT, Huggingface
            - 한국어뉴스: snunlp/KR-FinBert-SC
            - 영어뉴스: ProsusAI/finbert
        - 채팅: ChatGPT API, Langchain, FAISS, BeautifulSoup
- 협업툴: Gitlab, Jira, Notion, Mattermost
  
### 프로젝트 기능 소개

- 회원 관리
    - OAuth를 사용하여 간편 로그인 제공
    - 회원 정보 수정 및 탈퇴 기능 제공
    - 오답노트 기반으로 투자 수익 확인 가능
    - 관심종목 추가, 삭제 가능
- 오답노트
    - 본인의 매수/매도 가격을 기록하고, 피드백 할 수 있게 함
    - Enum Type을 사용하여 오답노트 종류를 설정하고, 그에 맞는 정보를 보여줌
    - @NotNull 어노테이션을 사용하여 데이터 무결성 검증
    - 이미지를 첨부하거나, 관련 뉴스 링크를 첨부할 수 있도록 함
- 뉴스
    - 크롤링을 통해 주식 종목에 맞는 뉴스 정보 수집
    - Google Bert를 사용하여 뉴스 제목 긍/부정 판단 가능
    - 같은 키워드를 사용한 뉴스끼리 군집화하여 중복 기사 제거, 많이 나온 토픽을 기준으로 뉴스 중요도 정보 제공
    - 날짜, 종목에 맞는 뉴스 조회 가능
    - 해당 주식 종목과 관련이 있는 해외 주식 종목의 뉴스를 보여줌
- 차트
    - pykrx 라이브러리를 사용하여 주식 정보 수집
    - 검색한 주식의 일일 차트 정보 조회 가능
    - 차트 날짜에 맞는 뉴스 및 오답노트를 보여줌
- 커뮤니티
    - 오답노트에 비공개 여부를 설정하여 다른 사람과 공유할 수 있도록 함
    - 다른 사람을 팔로우하여 피드에 팔로우 한 사람들의 오답노트를 볼 수 있도록 함
    - 댓글 기능을 통해 오답노트에 대한 피드백을 할 수 있도록 함
    - 추천 기능을 통해 실시간 인기 오답노트를 확인할 수 있도록 함
    - 스크랩 기능을 통해 나중에 다시 보고 싶은 오답노트를 저장할 수 있도록 함
- 밸류체인
    - 국내 종목과 관련있는 해외 기업들의 정보와 최근 주가 그래프를 보여줌

### 서비스 주요기능 상세보기 

(1) 랜딩페이지

- 서비스 랜딩페이지 화면
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/94188cb5-1d91-414e-9072-746184cb2df4"  width="892" height="502"/>
  
- 주식 종목 검색
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/a9997ffd-2259-47e5-b996-831857104008"  width="892" height="502"/>

(2) 주식 차트

- 주식 종목차트 조회 및 즐겨찾기
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/11934404-969d-458f-9ecc-848931a2701d"  width="892" height="502"/>
  
- 주식 관련 뉴스 조회
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/2ab2ee3b-e479-4030-9c6f-39c7dafc0cb1"  width="892" height="502"/>
    
- Value Chain 조회
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/d573e4ca-9cec-44eb-b1f0-23d7f6c6a3c6"  width="892" height="502"/>   

(3) 오답노트

- 오답노트 작성
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/ae6bee21-cbeb-4f73-8020-7815c98a1e78"  width="892" height="502"/>
      
- 전체노트 조회
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/d4a79bef-bdef-4b76-8a57-62e1a313ab00"  width="892" height="502"/>       

(4) 회원 관리 및 기타

- 로그인
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/0591a850-e052-48dd-bff4-577efe7e989b"  width="892" height="502"/>
   
- 마이페이지
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/affc7d57-ed74-4b1c-ada9-e5fd5f8e1248"  width="892" height="502"/>
  
- 검색엔진 최적화
  
  <img src="https://github.com/NewStocks/NewStocks/assets/62351890/118f8356-ad12-4222-b273-c21d2b104ea1"  width="892" height="502"/>   

## 📌 프로젝트 구성도
![Newstocks_프로젝트_구성도](https://github.com/NewStocks/NewStocks/assets/76719828/179d7a4e-48e3-4a3d-a283-2bec8118f1b3)


## 📌 ERD
![Nestocks_ERD](https://github.com/NewStocks/NewStocks/assets/76719828/f29abc2a-b686-4156-9cd2-7db94f440db5)


## 💻 Developers

<table>
    <tr align="center">
        <td><B>Backend</B></td>
        <td><B>Backend</B></td>
        <td><B>Backend</B></td>
        <td><B>Frontend</B></td>
        <td><B>Frontend</B></td>
        <td><B>Frontend</B></td>
    </tr>
    <tr align="center">
        <td><B>오성락</B></td>
        <td><B>김민석</B></td>
        <td><B>오준석</B></td>
        <td><B>서동훈</B></td>
        <td><B>박재은</B></td>
        <td><B>팽지우</B></td>
    </tr>
    <tr align="center">
        <td width="150">
            <img src="https://github.com/OhSeongRak.png?size=100">
            <br>
            <a href="https://github.com/OhSeongRak"><I>OhSeongRak</I></a>
        </td>
        <td width="150">
            <img src="https://github.com/pxxnxx.png?size=100">
            <br>
            <a href="https://github.com/pxxnxx"><I>pxxnxx</I></a>
        </td>
        <td width="150">
            <img src="https://github.com/joonsuk12.png?size=100">
            <br>
            <a href="https://github.com/joonsuk12"><I>joonsuk12</I></a>
        </td>
        <td width="150">
            <img src="https://github.com/gns9541.png?size=100">
            <br>
            <a href="https://github.com/gns9541"><I>gns9541</I></a>
        </td>
        <td width="150">
            <img src="https://github.com/JPark11.png?size=100">
            <br>
            <a href="https://github.com/JPark11"><I>Jpark11</I></a>
        </td>
        <td width="150">
            <img src="https://github.com/JiwooPaeng.png?size=100">
            <br>
            <a href="https://github.com/JiwooPaeng"><I>JiwooPaeng</I></a>
        </td>
    </tr>
</table>
