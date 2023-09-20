"use client";

import { useSearchParams, useRouter } from "next/navigation";
import AutocompleteBox from "./AutocompleteBox/AutocompleteBox";

import styles from "./SearchBox.module.css";
import { BiSearch, BiX } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
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
      if (selectedItem !== null && showAutoBox) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          if (selectedItem === 0) {
            setSelectedItem(searchList.length - 1);
          } else {
            setSelectedItem(selectedItem - 1);
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedItem((selectedItem + 1) % searchList.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
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
  }, [selectedItem, searchList, showAutoBox]);

  // input 창 입력 텍스트 없을 경우 autocomplete box 숨기고, 있으면 나타내기
  useEffect(() => {
    if (inputText.trim() !== "") {
      setShowAutoBox(true);
    } else {
      setShowAutoBox(false);
    }
  }, [inputText]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [selectedItem]);

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
      setShowAutoBox(false);
      setInputText("");
      const tabName = searchParams?.get("tab");
      router.push(`/${searchList[selectedItem].stockId}?tab=${tabName}`);
    }
  };

  const handleItemHover = (selectedItem: number) => {
    setSelectedItem(selectedItem);
  };

  const handleItemClick = (selectedItem: number) => {
    setShowAutoBox(false);
    setInputText("");
    const tabName = searchParams?.get("tab");
    router.push(`/${searchList[selectedItem].stockId}?tab=${tabName}`);
  };

  const handleEraseClick = () => {
    setInputText("");
  }

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header-search"]}>
          <div className={styles["search-icon"]}>
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
          {inputText && (
            <div className={styles["erase-button"]} onClick={handleEraseClick}>
              <BiX size="22" />
            </div>
          )}
        </div>
        {showAutoBox && (
          <AutocompleteBox
            ref={scrollRef}
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
