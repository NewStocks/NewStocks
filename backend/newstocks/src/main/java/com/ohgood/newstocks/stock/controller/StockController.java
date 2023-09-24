package com.ohgood.newstocks.stock.controller;

import com.ohgood.newstocks.auth.jwt.service.JwtService;
import com.ohgood.newstocks.stock.dto.ChartResDto;
import com.ohgood.newstocks.stock.dto.FavoriteStockReqDto;
import com.ohgood.newstocks.stock.dto.StockResDto;
import com.ohgood.newstocks.stock.dto.StockSearchDto;
import com.ohgood.newstocks.stock.dto.ValueChainDto;
import com.ohgood.newstocks.stock.dto.ValueChainResDto;
import com.ohgood.newstocks.stock.service.StockService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// TODO: 이거 나중에 데이터 다 넣고 나서 RestController로 다시 되돌려 놔야함
//@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/stock")
public class StockController {

    private final StockService stockService;
    private final JwtService jwtService;

    @GetMapping("/find-chart/{stock-id}")
    public ResponseEntity<ChartResDto> findChartSeriesByStockId(
        @PathVariable("stock-id") String stockId) {
        return new ResponseEntity<>(stockService.findChartSeriesByStockId(stockId), HttpStatus.OK);
    }

    @GetMapping("/find-stock-info/{stock-id}")
    public ResponseEntity<StockResDto> findStockInfoByStockId(
        @PathVariable("stock-id") String stockId) {
        return new ResponseEntity<>(stockService.findStockInfoByStockId(stockId), HttpStatus.OK);
    }

    @GetMapping("/find-all-stock-for-search")
    public ResponseEntity<StockSearchDto> findAllStockForSearch() {
        return new ResponseEntity<>(stockService.findAllStockForSearch(), HttpStatus.OK);
    }

    /*
    TODO : 주식 종목 즐겨찾기 등록, 즐겨찾기 리스트 조회, 삭제, 그리고 Authentication 처리
     */
    @PostMapping("/insert-favorite-stock")
    public ResponseEntity<String> insertFavoriteStock(
        @RequestBody FavoriteStockReqDto favoriteStockReqDto) {
//        , @RequestHeader("access-token") String id) {
//        System.out.println(id);
//        Long memberId = Long.parseLong(id);
        System.out.println(favoriteStockReqDto.toString());
        return new ResponseEntity<>(stockService.insertFavoriteStock(favoriteStockReqDto, 1L),
            HttpStatus.OK);
    }

    @DeleteMapping("/delete-favorite-stock")
    public ResponseEntity<String> deleteFavoriteStock(
        @RequestBody FavoriteStockReqDto favoriteStockReqDto) {
//        @RequestHeader("access-token") Long id) {
        return new ResponseEntity<>(stockService.deleteFavoriteStock(favoriteStockReqDto, 1L),
            HttpStatus.OK);
    }

    @GetMapping("/find-all-value-chains-of-stock/{stock_id}")
    public ResponseEntity<List<ValueChainResDto>> findAllValueChainsByStockId(
        @PathVariable("stock_id") String stockId) {
        return new ResponseEntity<>(stockService.findAllValueChainByStockId(stockId),
            HttpStatus.OK);
    }

    //데이터 삽입용 임시페이지
    @GetMapping("/value-chain-insert")
    public String showInsertPage() {
        // /value-chain-insert 경로로 요청이 들어오면 insert 페이지를 표시
        return "insertpage";
    }

    @PostMapping("/save-value-chain")
    public String saveValueChain(
        @RequestParam("stock_id") String stockId,
        @RequestParam("value_chain_id") String valueChainId,
        @RequestParam("value_chain_name") String valueChainName,
        Model model) {

        String isSuccess = stockService.saveValueChain(stockId, valueChainId, valueChainName);
        model.addAttribute("message", isSuccess);

        return "insertpage";
    }
}
