package com.nextpin.app.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExcelManageRestService {
    public void readExcelAndRestore(MultipartFile file) throws IOException;
}
