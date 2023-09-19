"use client";

import { useSearchParams, useRouter } from "next/navigation";
import AutocompleteBox from "./AutocompleteBox/AutocompleteBox";

import styles from "./SearchBox.module.css";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [showAutoBox, setShowAutoBox] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [searchList, setSearchList] = useState([
    {
      stockName: "카카오",
      stockId: "035720",
      stockMarket: "코스피",
      stockImageUrl:
        "https://file.alphasquare.co.kr/media/images/stock_logo/kr/035720.png",
    },
    {
      stockName: "삼성전자",
      stockId: "005930",
      stockMarket: "코스피",
      stockImageUrl:
        "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png",
    },
    {
      stockName: "삼성전자",
      stockId: "0059301",
      stockMarket: "코스피",
      stockImageUrl:
        "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png",
    },
    {
      stockName: "삼성전자",
      stockId: "0059302",
      stockMarket: "코스피",
      stockImageUrl:
        "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png",
    },
    {
      stockName: "삼성전자",
      stockId: "0059303",
      stockMarket: "코스피",
      stockImageUrl:
        "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png",
    },
    {
      stockName: "삼성전자",
      stockId: "0059304",
      stockMarket: "코스피",
      stockImageUrl:
        "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png",
    },
  ]);

  // input 창 바깥 클릭 시 autocomplete box 숨기기
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowAutoBox(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // keyboard로 이동
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem && showAutoBox) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          if (selectedItem === 0) {
            setSelectedItem(searchList.length-1)
          } else {
            setSelectedItem((selectedItem - 1));
          }
        } else if (e.key === "ArrowDown") {
          setSelectedItem((selectedItem + 1) % searchList.length);
        } else if (e.key === "Enter") {
          handleItemClick(selectedItem);
        } else if (e.key === "Escape") {
          setShowAutoBox(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, searchList]);

  // input 창 입력 텍스트 없을 경우 autocomplete box 숨기고, 있으면 나타내기
  useEffect(() => {
    if (inputText.trim() !== "") {
      setShowAutoBox(true);
    } else {
      setShowAutoBox(false);
    }
  }, [inputText]);

  // input 창 입력 텍스트 있을 때 focus가 돌아오면 autocomplete box 나타내기
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (inputText.trim() !== "") {
      setShowAutoBox(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (searchList) {
      setSelectedItem(0);
    }
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (selectedItem) {
      const tabName = searchParams?.get("tab");
      router.push(`/${searchList[selectedItem].stockId}?tab=${tabName}`);
    }
  };

  const handleItemHover = (selectedItem: number) => {
    console.log(selectedItem);
    setSelectedItem(selectedItem);
  };

  const handleItemClick = (selectedItem: number) => {
    const tabName = searchParams?.get("tab");
    router.push(`/${searchList[selectedItem].stockId}?tab=${tabName}`);
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header-search"]}>
          <div>
            <BiSearch size="22" />
          </div>
          <input
            type="text"
            placeholder="종목명 또는 종목코드 검색"
            ref={inputRef}
            value={inputText}
            onClick={handleInputClick}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSearch(e);
              }
            }}
          />
        </div>
        {showAutoBox && (
          <AutocompleteBox
            stockSearchList={searchList}
            selectedItem={selectedItem}
            handleItemHover={handleItemHover}
            handleItemClick={handleItemClick}
          />
        )}
      </div>
    </>
  );
}
