package com.ohgood.newstocks.notice.service;

import com.ohgood.newstocks.global.service.AwsS3Service;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.notice.dto.NoticeDto;
import com.ohgood.newstocks.notice.dto.NoticeImageDto;
import com.ohgood.newstocks.notice.dto.NoticeInsertReqDto;
import com.ohgood.newstocks.notice.dto.NoticeInsertResDto;
import com.ohgood.newstocks.notice.dto.NoticeResDto;
import com.ohgood.newstocks.notice.dto.NoticeUpdateReqDto;
import com.ohgood.newstocks.notice.entity.Notice;
import com.ohgood.newstocks.notice.entity.NoticeImage;
import com.ohgood.newstocks.notice.mapper.NoticeImageMapper;
import com.ohgood.newstocks.notice.mapper.NoticeMapper;
import com.ohgood.newstocks.notice.repository.NoticeImageRepository;
import com.ohgood.newstocks.notice.repository.NoticeRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeImageRepository noticeImageRepository;
    private final AwsS3Service awsS3Service;
    private final MemberRepository memberRepository;

    @Transactional
    public NoticeInsertResDto insertNotice(NoticeInsertReqDto noticeInsertReqDto, Long memberId) {
        checkMemberAdmin(memberId, "insert");
        Notice notice = NoticeMapper.INSTANCE.noticeReqDtoToEntity(noticeInsertReqDto);
        noticeRepository.save(notice);
        return getNoticeInsertResDto(noticeInsertReqDto, notice);
    }

    private NoticeInsertResDto getNoticeInsertResDto(NoticeInsertReqDto noticeInsertReqDto,
        Notice notice) {
        List<NoticeImageDto> noticeImageDtoList = new ArrayList<>();
        List<NoticeImage> noticeImageList = notice.getNoticeImageList();
        //기존 리스트에서 삭제되지 않은 애들만
        for (NoticeImage noticeImage : noticeImageList) {
            if (noticeImage.getDeleted()) {
                continue;
            }
            noticeImageDtoList.add(NoticeImageMapper.INSTANCE.entityToNoticeImageDto(noticeImage));
        }
        if (noticeInsertReqDto.getMultipartFileList() != null) {
            for (MultipartFile multipartFile : noticeInsertReqDto.getMultipartFileList()) {
                String url = awsS3Service.uploadFile("/notice", multipartFile);
                NoticeImage noticeImage = noticeImageRepository.save(
                    NoticeImage.builder().url(url).notice(notice).build());
                NoticeImageDto noticeImageDto = NoticeImageMapper.INSTANCE.entityToNoticeImageDto(
                    noticeImage);
                noticeImageDtoList.add(noticeImageDto);
                noticeImageList.add(noticeImage);
            }
        }
        NoticeInsertResDto noticeInsertResDto = NoticeMapper.INSTANCE.entityToNoticeInsertResDto(
            notice);
        noticeInsertResDto.setNoticeImageDtoList(noticeImageDtoList);
        return noticeInsertResDto;
    }

    @Transactional
    public NoticeInsertResDto updateNotice(NoticeUpdateReqDto noticeUpdateReqDto, Long id,
        Long memberId) {
        checkMemberAdmin(memberId, "update");
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new ArithmeticException("수정하려는 공지사항이 없습니다."));
        notice.updateNotice(noticeUpdateReqDto);
        return getNoticeUpdateResDto(noticeUpdateReqDto, notice);
    }

    private NoticeInsertResDto getNoticeUpdateResDto(NoticeUpdateReqDto noticeUpdateReqDto,
        Notice notice) {
        if (noticeUpdateReqDto.getDeletedImageIdList() != null) {
            HashSet<Long> deletedImageIdList = new HashSet<>(
                noticeUpdateReqDto.getDeletedImageIdList());
            for (NoticeImage noticeImage : notice.getNoticeImageList()) {
                if (deletedImageIdList.contains(noticeImage.getId())) {
                    noticeImage.delete();
                    noticeImageRepository.save(noticeImage);
                }
            }
        }
        return getNoticeInsertResDto(
            NoticeMapper.INSTANCE.noticeUpdateReqDtoToNoticeInsertResDto(noticeUpdateReqDto),
            notice);
    }

    public NoticeResDto findAllNotice() {
        List<Notice> noticeList = noticeRepository.findByDeletedFalse();
        List<NoticeDto> noticeDtoList = new ArrayList<>();
        for (Notice notice : noticeList) {
            NoticeDto noticeDto = NoticeMapper.INSTANCE.entityToNoticeDto(notice);
            noticeDto.setNoticeImageDtoList(notice);
            noticeDtoList.add(noticeDto);
        }
        return NoticeResDto.builder().noticeDtoList(noticeDtoList).build();
    }

    public NoticeResDto findDetailNoticeById(Long id) {
        Notice notice = noticeRepository.findByIdAndDeletedFalse(id)
            .orElseThrow(() -> new ArithmeticException("해당하는 공지사항이 없습니다."));
        List<NoticeDto> noticeDtoList = new ArrayList<>();
        NoticeDto noticeDto = NoticeMapper.INSTANCE.entityToNoticeDto(notice);
        noticeDto.setNoticeImageDtoList(notice);
        noticeDtoList.add(noticeDto);
        return NoticeResDto.builder().noticeDtoList(noticeDtoList).build();
    }

    @Transactional
    public String deleteNotice(Long id, Long memberId) {
        checkMemberAdmin(memberId, "delete");
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new ArithmeticException("삭제하려는 공지사항이 존재하지 않습니다."));
        notice.delete();
        return "deleted successfully";
    }

    private boolean checkUserAdmin(Member member) {
        // 관리자 권한 추가 생각하여 함수로 분리
        return member.getSocialId().equals("admin");
    }

    private void checkMemberAdmin(Long memberId, String type) {
        Member member = memberRepository.findByIdAndDeletedFalse(memberId)
            .orElseThrow(() -> new ArithmeticException("해당하는 회원이 없습니다."));
        if (!checkUserAdmin(member)) {
            switch (type) {
                case "insert" -> {
                    log.debug("글을 입력할 권한이 없습니다.");
                    throw new ArithmeticException("글을 입력할 권한이 없습니다.");
                }
                case "update" -> {
                    log.debug("글을 수정할 권한이 없습니다.");
                    throw new ArithmeticException("글을 수정할 권한이 없습니다.");
                }
                case "delete" -> {
                    log.debug("글을 삭제할 권한이 없습니다.");
                    throw new ArithmeticException("글을 삭제할 권한이 없습니다.");
                }
                default -> {
                    log.debug("잘못된 요청입니다.");
                    throw new ArithmeticException("잘못된 요청입니다.");
                }
            }
        }
    }
}
