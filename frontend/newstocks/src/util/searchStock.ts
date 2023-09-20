import { Stock } from "@/types/stock";

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const ch2pattern = (ch: string) => {
  const offset = 44032;
  
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    // 종성이 있으면 문자 그대로를 찾는다.
    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }

    // 한글 자음

    interface Con2Syl {
      [key: string]: number;
      ㄱ: number;
      ㄲ: number;
      ㄴ: number;
      ㄷ: number;
      ㄸ: number;
      ㄹ: number;
      ㅁ: number;
      ㅂ: number;
      ㅃ: number;
      ㅅ: number;
    }

    if (/[ㄱ-ㅎ]/.test(ch)) {
      const con2syl: Con2Syl = {
        'ㄱ': '가'.charCodeAt(0),
        'ㄲ': '까'.charCodeAt(0),
        'ㄴ': '나'.charCodeAt(0),
        'ㄷ': '다'.charCodeAt(0),
        'ㄸ': '따'.charCodeAt(0),
        'ㄹ': '라'.charCodeAt(0),
        'ㅁ': '마'.charCodeAt(0),
        'ㅂ': '바'.charCodeAt(0),
        'ㅃ': '빠'.charCodeAt(0),
        'ㅅ': '사'.charCodeAt(0),
      };
      const begin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 ) * 588 + con2syl['ㅅ'] );
      const end = begin + 587;
      return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }

    return escapeRegExp(ch);
}

const patternMatcher = (input: string): [RegExp, RegExp[]] => {

  const subpatterns = input.split('').map(ch2pattern)
  const pattern = subpatterns.map(pattern => '('+pattern+')').join('.*?');
  const subpatternList = subpatterns.map(pattern => new RegExp(pattern)); 
  
  return [new RegExp(pattern), subpatternList];

}

export const searchStock = (input: string, stockList: Stock[]) => {

  const [regex, subpatterns] = patternMatcher(input); 
  const result = stockList.filter((stock) => {
    return regex.test(stock.stockName);
  })

  const resultWithSort = result.map((stock) => {
    let lastIndex = 0;
    let sortSum = ""; 
  
    for (let i=0; i < subpatterns.length; i++) {
      const match = stock.stockName.match(subpatterns[i]);
      let idx = 0; 
      if (match && match.index !== undefined) {
        idx = match.index;
        sortSum = sortSum + idx.toString(); 
        lastIndex = idx + 1;  
      }
    }

    const sortIndex = parseInt(sortSum)
    return {stock, sortIndex}

  }).sort((a, b) => {
    return a.sortIndex - b.sortIndex
  })

  

  return resultWithSort.map((result) => result.stock)
}