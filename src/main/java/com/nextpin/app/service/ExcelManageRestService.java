package com.nextpin.app.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExcelManageRestService {
    public void kakaoMapCsvDataStore(MultipartFile file) throws IOException;

    public void kakaoMapReviewCsvDataStore(MultipartFile file) throws IOException;
}
