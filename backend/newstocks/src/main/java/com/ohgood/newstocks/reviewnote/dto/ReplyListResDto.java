package com.ohgood.newstocks.reviewnote.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ReplyListResDto {

    private int replyCount = 0;
    private List<ReplyResDto> replyResDtoList = new ArrayList<>();

    public ReplyListResDto replyResDtoListToReplyListResDto(List<ReplyResDto> replyResDtoList) {
        if (replyResDtoList.isEmpty())
            return this;
        this.replyCount = replyResDtoList.get(0).getReviewNote().getReplyCount();
        this.replyResDtoList = replyResDtoList;
        return this;
    }
}
