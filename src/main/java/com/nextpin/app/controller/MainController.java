package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.KakaoMapDataRestore;
import com.nextpin.app.service.CourseService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class MainController {

    private Logger logger = (Logger) LoggerFactory.getLogger(MainController.class);
    //    private final OctoparseData octoparseData;
    private final KakaoMapDataRestore kakaoMapDataRestore;
    private final CourseService courseService;

    @Autowired
    public MainController(KakaoMapDataRestore kakaoMapDataRestore, CourseService courseService) {
        this.kakaoMapDataRestore = kakaoMapDataRestore;
        this.courseService = courseService;
    }

    private static String GEOCODE_URL="http://dapi.kakao.com/v2/local/search/address.json?query=";
    private static String GEOCODE_USER_INFO="59983c9ff638093a8ad90f998ac94743";

    @GetMapping("/")
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");

        logger.debug("index페이지 이동");
        return mav;
    }

    @GetMapping("/main")
    public ModelAndView main() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("main");

        logger.debug("main페이지 이동");
        return mav;
    }

    @GetMapping("/getData")
    public void getData() {
        logger.debug("getData 실행");
//        octoparseData.getData();
    }

    @PostMapping("/kakaoData")
    @ResponseBody
    public void kakaoData(@RequestBody List<KakaoMapDto> data){
        logger.debug("ajax 받은 데이터 : " + data.toString());
        logger.debug("ajax 받은 데이터 개수 : " + data.size());
//        kakaoMapDataRestore.restore(data);
//        kakaoMapDataRestore.testRestore(data.get(0));
    }

    @GetMapping("/conversionProcessing")
    public void conversionProcessing(){
        List<KakaoMapDto> addressList = courseService.getAddressDatas();
//        logger.debug("addressList : " + addressList.toString());
        List<String> cannotFindAddressList = new ArrayList<>();
        List<KakaoMapDto> kakaoMapDtoList = new ArrayList<>();

        URL obj;
        for(int i = 0; i <addressList.size(); i++){
            try{
                String address = URLEncoder.encode(addressList.get(i).getAddressName(), "UTF-8");
//            System.out.println(address);
                obj = new URL(GEOCODE_URL+address);

                HttpURLConnection con = (HttpURLConnection)obj.openConnection();

                con.setRequestMethod("GET");
                con.setRequestProperty("Authorization",  "KakaoAK " + GEOCODE_USER_INFO);
                con.setRequestProperty("content-type", "application/json; charset=utf-8");
                con.setDoOutput(true);
                con.setUseCaches(false);
                con.setDefaultUseCaches(false);

                Charset charset = Charset.forName("UTF-8");
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), charset));

                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

//            logger.debug("응답 데이터 : " + response.toString());
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject) parser.parse(response.toString());

//                logger.debug("json 응답 키 -> documents : " + jsonObject.get("documents").toString());
                List<Map<String, Object>> rowData = (List<Map<String, Object>>) jsonObject.get("documents");
//                logger.debug("rowData address_name : " + rowData.get(0).get("address_name"));
//                logger.debug("rowData x : " + rowData.get(0).get("x"));
//                logger.debug("rowData y : " + rowData.get(0).get("y"));
//                logger.debug("--------------------------------------------------------------");
                if(rowData.size() == 0){
                    cannotFindAddressList.add(addressList.get(i).getAddressName());
                    continue;
                }
                KakaoMapDto kakaoMapDto = new KakaoMapDto();
                kakaoMapDto.setId(addressList.get(i).getId());
                kakaoMapDto.setAddressName(addressList.get(i).getAddressName());
                kakaoMapDto.setX(Double.parseDouble(rowData.get(0).get("x").toString()));
                kakaoMapDto.setY(Double.parseDouble(rowData.get(0).get("y").toString()));

                kakaoMapDtoList.add(kakaoMapDto);
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }
        kakaoMapDataRestore.updateAddressConversion(kakaoMapDtoList);
        logger.debug("못 찾은 주소 리스트 : " + cannotFindAddressList.toString());
        logger.debug("못 찾은 주소 개수 : " + cannotFindAddressList.size());

    }
}