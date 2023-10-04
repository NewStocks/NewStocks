package com.ohgood.newstocks.global.entity;

public class CommonUtils {

    private static final String FILE_EXTENSION_SEPARATOR = ".";

    public static String buildFileName(String originalFileName) {
        int fileExtensionIndex = originalFileName.lastIndexOf(FILE_EXTENSION_SEPARATOR); //파일 확장자 구분선
        String fileExtension = originalFileName.substring(fileExtensionIndex); //파일 확장자
        String fileName = originalFileName.substring(0, fileExtensionIndex); // 파일 이름
        String now = String.valueOf(System.currentTimeMillis()); // 파일 업로드 시간

        return fileName + "_" + now + fileExtension;
    }
}