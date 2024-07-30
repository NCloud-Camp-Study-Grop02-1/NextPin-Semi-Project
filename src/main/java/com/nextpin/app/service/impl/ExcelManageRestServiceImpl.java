package com.nextpin.app.service.impl;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dao.CsvDataRestoreDao;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.ExcelManageRestService;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelManageRestServiceImpl implements ExcelManageRestService {

    private Logger logger = (Logger) LoggerFactory.getLogger(ExcelManageRestServiceImpl.class);
    private CsvDataRestoreDao csvDataRestoreDao;

    @Autowired
    public ExcelManageRestServiceImpl(CsvDataRestoreDao csvDataRestoreDao) {
        this.csvDataRestoreDao = csvDataRestoreDao;
    }

    public void readExcelAndRestore(MultipartFile file){

        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());

        logger.debug("파일 확장자 명 : " + fileExtension);
        BufferedReader br = null;
        List<KakaoMapDto> csvList = new ArrayList<>();
//        int num = 1;
        try {
            if(null != fileExtension && fileExtension.equals("csv")) {
                String line;
                InputStream is = file.getInputStream();
                br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                String category = br.readLine();
                logger.debug("카테고리 리스트 : " + category);

                while((line = br.readLine()) != null){
                    logger.debug(line);
                    String[] dataList = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)",-1);
                    KakaoMapDto kakaoMapDto = new KakaoMapDto();
                    kakaoMapDto.setCategoryName(dataList[0]);

                    if(null != dataList[1] && !dataList[1].equals("")) {
                        kakaoMapDto.setPlaceName(dataList[1]);
                    }
                    if(isDouble(dataList[2])) {
                        kakaoMapDto.setScore(Double.parseDouble(dataList[2]));
                    }

                    if(null != dataList[3] && !dataList[3].equals("")) {
                        kakaoMapDto.setAddressName(dataList[3]);
                    }

                    kakaoMapDto.setRoadAddressName(dataList[4]);
                    kakaoMapDto.setBusinessHour(dataList[5]);
                    kakaoMapDto.setPhone(dataList[6]);
                    kakaoMapDto.setPlaceUrl(dataList[7]);
                    csvList.add(kakaoMapDto);
//                    logger.debug(num + "번째 데이터 : " + kakaoMapDto.toString());
//                    num++;
                }
            }
        } catch(IOException ioe){
            logger.error(ioe.getMessage());
        }

        csvDataRestoreDao.mergeCsvData(csvList);
    }

    public boolean isDouble(String strValue){
        try {
            Double.parseDouble(strValue);
            return true;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
}
