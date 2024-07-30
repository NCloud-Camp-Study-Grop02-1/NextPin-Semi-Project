package com.nextpin.app.controller;

import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/places")
    public List<KakaoMapDto> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    @GetMapping("/randomPlaces")
    public List<KakaoMapDto> getPlacesByKeyword(@RequestParam(value = "keyword") String keyword) {
        return placeService.getPlacesByKeyword(keyword);
    }
}

