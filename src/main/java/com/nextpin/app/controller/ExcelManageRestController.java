package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.service.ExcelManageRestService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
public class ExcelManageRestController {

    private Logger logger = (Logger) LoggerFactory.getLogger(ExcelManageRestController.class);
    private final ExcelManageRestService excelManageRestService;

    @Autowired
    public ExcelManageRestController(ExcelManageRestService excelManageRestService) {
        this.excelManageRestService = excelManageRestService;
    }

    @PostMapping("/uploadExcel")
    public String uploadExcel(@RequestParam("uploadFile") MultipartFile file, HttpServletResponse response) throws IOException {
        excelManageRestService.readExcelAndRestore(file);
        return "uploadProcessing";
    }
}
