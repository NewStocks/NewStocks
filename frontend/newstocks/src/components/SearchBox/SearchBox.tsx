"use client";

import { useState, useEffect, useRef } from "react";

import AutocompleteBox from "./AutocompleteBox/AutocompleteBox";

import { searchStock } from "@/utils/searchStock";
import { getAllStocks } from "@/services/search";
import { Stock } from "@/types/stock";

import styles from "./SearchBox.module.css";
import { BiSearch, BiX } from "react-icons/bi";

type Props = {
  searchFunc: Function;
};

export default function SearchBox({searchFunc}: Props) {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [inputText, setInputText] = useState("");
  const [showAutoBox, setShowAutoBox] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [searchList, setSearchList] = useState<Stock[]>([]);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await getAllStocks();
        const stockData = response.data.stockDtoList;
        setAllStocks(stockData);
      } catch (e) {
        // console.error(e);
      }
    }

    getData();
  }, []);

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
    // eslint-disable-next-line
  }, [selectedItem, searchList, showAutoBox]);

  // input 창 입력 텍스트 없을 경우 autocomplete box 숨기고, 있으면 나타내기. 그리고 입력text에 따른 autocomplete 결과 업데이트
  useEffect(() => {
    if (inputText.trim() !== "") {
      setShowAutoBox(true);
      const autocompleteResults = searchStock(inputText, allStocks);
      setSearchList(autocompleteResults.slice(0, 20));
      if (autocompleteResults.length > 0) {
        setSelectedItem(0);
      } else {
        setSelectedItem(null);
      }
    } else {
      setShowAutoBox(false);
    }
    // eslint-disable-next-line
  }, [inputText]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedItem]);

  // input 창 입력 텍스트 있을 때 focus가 돌아오면 autocomplete box 나타내기
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (inputText.trim() !== "") {
      setShowAutoBox(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleItemHover = (selectedItem: number) => {
    setSelectedItem(selectedItem);
  };

  const handleItemClick = (selectedItem: number) => {
    setShowAutoBox(false);
    setInputText("");
    searchFunc(searchList[selectedItem]);
  };

  const handleEraseClick = () => {
    setInputText("");
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header-search"]}>
          <div className={styles["search-icon"]}>
            <BiSearch size="22" />
          </div>
          <input
            type="text"
            placeholder="종목명 / 종목코드 검색"
            ref={inputRef}
            value={inputText}
            onClick={handleInputClick}
            onChange={handleInputChange}
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
