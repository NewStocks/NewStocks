package com.ohgood.newstocks.reviewnote.dto;

import com.ohgood.newstocks.reviewnote.entity.NoteType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class ReviewNoteUpdateReqDto {

    private Long id;
    private String title;
    private Integer buyPrice;
    private Integer sellPrice;
    private Integer sellQuantity;
    private Integer buyQuantity;
    private String content;
    private LocalDateTime buyDate;
    private LocalDateTime sellDate;
    private LocalDateTime settingDate;
    private NoteType type;
    //    private Boolean display;
    private Boolean privacy;
//    private String stockId;
    private List<Long> newsIdList;
    private List<String> linkList;

    // 기존 이미지 아이디 1, 2 에서 1 삭제한 경우 2만 담아서 옴
    private List<Long> deletedImageIdList;
    // 새로 추가된 이미지 전송 1, 2 에서 1 삭제 후 3 추가 => 3만 담아서 옴
    private List<MultipartFile> multipartFileList;

    public ReviewNoteUpdateReqDto(Long id, String title, Integer buyPrice, Integer sellPrice,
        Integer sellQuantity, Integer buyQuantity, String content, LocalDateTime buyDate,
        LocalDateTime sellDate, LocalDateTime settingDate, NoteType type, Boolean privacy,
        List<Long> newsIdList, List<String> linkList, List<Long> deletedImageIdList,
        List<MultipartFile> multipartFileList) {
        this.id = id;
        this.title = title;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.sellQuantity = sellQuantity;
        this.buyQuantity = buyQuantity;
        this.content = content;
        this.buyDate = buyDate;
        this.sellDate = sellDate;
        this.settingDate = settingDate;
        this.type = type;
        this.privacy = privacy;
//        this.stockId = stockId;
        this.newsIdList = newsIdList;
        this.linkList = linkList;
        this.deletedImageIdList = deletedImageIdList;
        this.multipartFileList = multipartFileList;
    }
}
