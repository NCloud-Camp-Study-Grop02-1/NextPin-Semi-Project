package com.nextpin.app.service.impl;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dao.CsvDataRestoreDao;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.ExcelManageRestService;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ExcelManageRestServiceImpl implements ExcelManageRestService {

    private Logger logger = (Logger) LoggerFactory.getLogger(ExcelManageRestServiceImpl.class);
    private CsvDataRestoreDao csvDataRestoreDao;

    @Autowired
    public ExcelManageRestServiceImpl(CsvDataRestoreDao csvDataRestoreDao) {
        this.csvDataRestoreDao = csvDataRestoreDao;
    }

    public void readCsv(MultipartFile file){

        List<KakaoMapDto> csvDataList = new ArrayList<KakaoMapDto>();


        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        logger.debug("파일 확장자 명 : " + fileExtension);
//        logger.debug("file.getContentType() : " + file.getContentType());
//        BufferedReader br = null;
        int j = 0;
        if(null != fileExtension && fileExtension.equals("csv")) {
//            String line;
//            InputStream is = file.getInputStream();
//            br = new BufferedReader(new InputStreamReader(is, "UTF-8"));

            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
                CSVReader csvReader = new CSVReader(reader);

                String[] first_line = csvReader.readNext();
                logger.debug("카레고리 리스트 : " + Arrays.toString(first_line));

                String[] nextRecord;
                int i = 1;
                while((nextRecord = csvReader.readNext()) != null){
                    logger.debug("csv 데이터 " + i + "번째 라인 : " + Arrays.toString(nextRecord));
                    KakaoMapDto rowData = new KakaoMapDto();

                    rowData.setCategoryName(nextRecord[0]);

                    if(nextRecord[1] == null || nextRecord[1].equals("")) {
                        j++;
                        continue;
                    }
                    rowData.setPlaceName(nextRecord[1]);

                    if(nextRecord[2] != "" && isNumberic(nextRecord[2])){
                        rowData.setScore(Double.parseDouble(nextRecord[2]));
                    } else {
                        rowData.setScore(0.0);
                    }
                    if(nextRecord[3] == null || nextRecord[3].equals("")){
                        j++;
                        continue;
                    }
                    rowData.setAddressName(nextRecord[3]);
                    rowData.setRoadAddressName(nextRecord[4]);
                    rowData.setBusinessHour(nextRecord[5]);
                    rowData.setPhone(nextRecord[6]);

                    csvDataList.add(rowData);
                    i++;
                }
            } catch (CsvValidationException | IOException csve) {
                logger.error(csve.getMessage());
            }
        }
        logger.debug("상호명 없는 데이터 건수 : " + j);
        logger.debug("data formatting after insert");
        csvDataRestoreDao.insertCrowlData(csvDataList);

    }

    public boolean isNumberic(String str){
        return str.matches("[+-]?\\d*(\\.\\d+)?");
    }
}
