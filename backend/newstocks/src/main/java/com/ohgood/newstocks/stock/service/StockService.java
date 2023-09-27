package com.ohgood.newstocks.stock.service;

import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.service.NewsService;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import com.ohgood.newstocks.stock.dto.ChartDto;
import com.ohgood.newstocks.stock.dto.ChartResDto;
import com.ohgood.newstocks.stock.dto.ChartSeriesDto;
import com.ohgood.newstocks.stock.dto.DataDto;
import com.ohgood.newstocks.stock.dto.FavoriteStockDto;
import com.ohgood.newstocks.stock.dto.FavoriteStockReqDto;
import com.ohgood.newstocks.stock.dto.StockDto;
import com.ohgood.newstocks.stock.dto.StockResDto;
import com.ohgood.newstocks.stock.dto.StockSearchDto;
import com.ohgood.newstocks.stock.dto.ValueChainResDto;
import com.ohgood.newstocks.stock.entity.Chart;
import com.ohgood.newstocks.stock.entity.FavoriteStock;
import com.ohgood.newstocks.stock.entity.Stock;
import com.ohgood.newstocks.stock.entity.StockValueChain;
import com.ohgood.newstocks.stock.entity.ValueChain;
import com.ohgood.newstocks.stock.mapper.ChartMapper;
import com.ohgood.newstocks.stock.mapper.FavoriteStockMapper;
import com.ohgood.newstocks.stock.mapper.StockMapper;
import com.ohgood.newstocks.stock.mapper.ValueChainMapper;
import com.ohgood.newstocks.stock.repository.ChartRepository;
import com.ohgood.newstocks.stock.repository.FavoriteStockRepository;
import com.ohgood.newstocks.stock.repository.StockRepository;
import com.ohgood.newstocks.stock.repository.StockValueChainRepository;
import com.ohgood.newstocks.stock.repository.ValueChainRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockService {

    private final ChartRepository chartRepository;
    private final StockRepository stockRepository;
    private final NewsService newsService;
    private final ReviewNoteRepository reviewNoteRepository;
    private final FavoriteStockRepository favoriteStockRepository;
    private final MemberRepository memberRepository;
    private final ValueChainRepository valueChainRepository;
    private final StockValueChainRepository stockValueChainRepository;


    public ChartResDto findChartSeriesByStockId(String stockId) {
        List<ChartSeriesDto> chartSeriesDtoList = new ArrayList<>();
        String[] names = {"주식정보", "뉴스정보", "오답노트 정보"};
        String[] types = {"candlestick", "scatter", "scatter"};
        for (int branch = 0; branch < 3; branch++) {
            chartSeriesDtoList.add(ChartSeriesDto.builder().name(names[branch]).type(types[branch])
                .data(findAllDataByStockId(branch, stockId)).build());
        }
        return ChartResDto.builder().name(stockId).series(chartSeriesDtoList).build();
    }

    public List<DataDto> findAllDataByStockId(int branch, String stockId) {
        return switch (branch) {
            case 0 -> findAllChartDataByStockId(stockId);
            case 1 -> findAllNewsDataByStockId(stockId);
            default -> findAllReviewNoteDataByStockId(stockId);
        };
    }

    private List<DataDto> findAllChartDataByStockId(String stockId) {
        List<DataDto> chartDataDtoList = new ArrayList<>();
        List<ChartDto> chartDtoList = findAllChartDto(stockId);
        for (ChartDto chartDto : chartDtoList) {
            chartDataDtoList.add(ChartMapper.INSTANCE.chartDtoToDataDto(chartDto));
        }
        return chartDataDtoList;
    }

    public List<ChartDto> findAllChartDto(String stockId) {
        List<Chart> chartList = chartRepository.findAllChartByStockIdOrderByDate(stockId);
        List<ChartDto> chartDtoList = new ArrayList<>();
        for (Chart chart : chartList) {
            chartDtoList.add(ChartMapper.INSTANCE.entityToChartDto(chart));
        }
        return chartDtoList;
    }

    private List<DataDto> findAllReviewNoteDataByStockId(String stockId) {
        List<DataDto> reviewNoteDataDtoList = new ArrayList<>();
        List<ReviewNoteDto> reviewNoteDtoList = findAllReviewNoteDto(stockId);

        for (ReviewNoteDto reviewNoteDto : reviewNoteDtoList) {
            reviewNoteDataDtoList.add(
                ReviewNoteMapper.INSTANCE.reviewNoteDtoToDataDto(reviewNoteDto));
        }
        return reviewNoteDataDtoList;
    }

    public List<ReviewNoteDto> findAllReviewNoteDto(String stockId) {
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findReviewNotesByStockId(stockId);
        List<ReviewNoteDto> reviewNoteDtoList = new ArrayList<>();
        for (ReviewNote reviewNote : reviewNoteList) {
            reviewNoteDtoList.add(ReviewNoteMapper.INSTANCE.entityToReviewNoteDto(reviewNote));
        }
        return reviewNoteDtoList;
    }

    private List<DataDto> findAllNewsDataByStockId(String stockId) {
        List<DataDto> newsDataDtoList = new ArrayList<>();
        List<NewsDto> NewsDtoList = newsService.findAllNewsDtoByStockId(stockId);
        for (NewsDto newsDto : NewsDtoList) {
            newsDataDtoList.add(NewsMapper.INSTANCE.NewsDtoToDataDto(newsDto));
        }
        return newsDataDtoList;
    }

    public StockResDto findStockInfoByStockId(String stockId) {
        System.out.println("findStockInfo");
        Stock stock = stockRepository.findById(stockId)
            .orElseThrow(() -> new BadRequestException("관련 주식 정보가 존재하지 않습니다."));
        return StockMapper.INSTANCE.entityToStockResDto(stock);
    }

    public StockSearchDto findAllStockForSearch() {
        List<Stock> stockList = stockRepository.findAll();
        List<StockDto> stockDtoList = new ArrayList<>();
        for (Stock stock : stockList) {
            stockDtoList.add(StockMapper.INSTANCE.entityToStockDto(stock));
        }
        return StockSearchDto.builder().stockDtoList(stockDtoList).build();
    }

    @Transactional
    public String insertFavoriteStock(FavoriteStockReqDto favoriteStockReqDto, Long memberId) {
        FavoriteStockDto favoriteStockDto = FavoriteStockMapper.INSTANCE.FavoriteStockReqDtoToFavoriteStockDto(
            favoriteStockReqDto);
        if (favoriteStockRepository.findByStockIdAndMemberId(favoriteStockDto.getStockId(),
            memberId).isPresent()) {
            throw new BadRequestException("같은 종목을 중복해 추가할 수 없습니다.");
        }
        favoriteStockDto.setMember(memberRepository.findById(memberId)
            .orElseThrow(() -> new BadRequestException("잘못된 요청입니다.")));
        favoriteStockRepository.save(FavoriteStockMapper.INSTANCE.FavoriteStockDtoToEntity(
            favoriteStockDto));
        return "success";
    }

    @Transactional
    public String deleteFavoriteStock(FavoriteStockReqDto favoriteStockReqDto, Long memberId) {
        FavoriteStock favoriteStock = favoriteStockRepository.findByStockIdAndMemberId(
                favoriteStockReqDto.getStockId(), memberId)
            .orElseThrow(() -> new BadRequestException("지우려는 관심 종목이 없습니다."));
        favoriteStockRepository.delete(favoriteStock);
        return "success";
    }

    public List<FavoriteStockDto> findAllFavoriteStockByMemberId(Long memberId) {
        List<FavoriteStockDto> favoriteStockDtoList = new ArrayList<>();
        List<FavoriteStock> favoriteStockList = favoriteStockRepository.findByMemberId(memberId);
        for (FavoriteStock favoriteStock : favoriteStockList) {
            favoriteStockDtoList.add(
                FavoriteStockMapper.INSTANCE.entityToFavoriteStockDto(favoriteStock));
        }
        return favoriteStockDtoList;
    }

    public List<ValueChainResDto> findAllValueChainByStockId(String stockId) {
        //그러면 얘는 stockValueChain의 컬럼을 기반으로 valuechain엔티티를 가져와야겠네
        //주식을 찾고 ->stockvaluechainList를 찾고->거기서 각기의 컬럼에 따라서 벨류체인을 찾아서 넣으면 되겠네
        Stock stock = stockRepository.findById(stockId)
            .orElseThrow(() -> new BadRequestException("벨류체인 항목을 찾고자 하는 종목코드가 존재하지 않습니다."));

        List<ValueChain> valueChainList = new ArrayList<>();
        List<ValueChainResDto> valueChainResDtoList = new ArrayList<>();
        List<StockValueChain> stockValueChainList = stock.getStockValueChainList();
        for (StockValueChain stockValueChain : stockValueChainList) {
            valueChainList.add(stockValueChain.getValueChain());
        }
        for (ValueChain valueChain : valueChainList) {
            valueChainResDtoList.add(
                ValueChainMapper.INSTANCE.valueChainToValueChainResDto(valueChain));
        }
        return valueChainResDtoList;
    }

    public String saveValueChain(String stockId, String valueChainId, String valueChainName) {
        System.out.println(stockId + " " + valueChainId + " " + valueChainName);
        try {
            ValueChain valueChain = valueChainRepository.save(
                ValueChain.builder().id(valueChainId)
                    .valueChainName(valueChainName).build());
            stockValueChainRepository.save(StockValueChain.builder().stock(
                    stockRepository.findById(stockId)
                        .orElseThrow(() -> new BadRequestException("관련짓고자 하는 국내 주식이 존재하지 않습니다.")))
                .valueChain(valueChain).build());
            return "success";
        } catch (Exception e) {
            // 예외가 발생하면 예외 메시지를 문자열로 반환
            return "실패: " + e.getMessage();
        }

    }
}
