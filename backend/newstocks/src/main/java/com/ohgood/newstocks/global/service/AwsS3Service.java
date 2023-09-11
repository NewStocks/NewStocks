package com.ohgood.newstocks.global.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ohgood.newstocks.global.entity.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName; //버킷 이름

    public String uploadFile(String dir, MultipartFile multipartFile) {

        String path = bucketName + dir;

        validateFileExists(multipartFile); //파일이 있는지 확인하는 메서드

        String fileName = CommonUtils.buildFileName(Objects.requireNonNull(multipartFile.getOriginalFilename())); //fileName

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        try (InputStream inputStream = multipartFile.getInputStream()) {

            amazonS3Client.putObject(new PutObjectRequest(path, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (Exception e) {
            log.error("Can not upload image, ", e);
            throw new ArithmeticException("cannot upload image");
        }
        return amazonS3Client.getUrl(path, fileName).toString();
    }

    private void validateFileExists(MultipartFile multipartFile) {
        if(multipartFile.isEmpty()) {
            throw new ArithmeticException("file is empty");
        }
    }
}