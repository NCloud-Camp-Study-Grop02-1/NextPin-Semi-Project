var placeData = [];
// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
// searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces(category) {

    var keyword = $('#inputPlace1').val() === undefined ? "" : $('#inputPlace1').val();

    var keyword2 = $('#inputPlace2').val() === undefined ? "" : $('#inputPlace2').val();

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    $("#inputPlace2").val(keyword2);



    let searchKeywords = {"keyword" : keyword, "keyword2" : keyword2, "category" : category};

    // console.log(JSON.stringify(searchKeywords));

    $.ajax({
        method : "POST",
        headers : {
            'content-type':'application/json'
        },
        url : "/searchPlaces",
        async : true,
        dataType: "json",
        data : JSON.stringify(searchKeywords),
        success : function(result){
            console.log(result["data"][0]);
            // console.log(result["data"][0]);
            // console.log("ajax : result : " + JSON.stringify(result));
            displayPlaces(result["data"], category);
            // displayPagination(result["pageNum"], result["amount"], result["cnt"]);
            displayPagination(result, JSON.stringify(searchKeywords));
        },
        error : function(request, status, error){
            console.log(error);
        }
    });
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    // ps.keywordSearch( keyword, placesSearchCB);
    // ps.keywordSearch(keyword, placesSearchCB
    //     , {
    //         radius : 500                  // 반경범위 미터 단위(0m ~ 20000m)
    //         // ,location: new kakao.maps.LatLng(37.566826, 126.9786567)
    //     }
    // );
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    // console.log("placesSearchCB data : " + JSON.stringify(data));
    if (status === kakao.maps.services.Status.OK) {
        // console.log(data);
        if(undefined !== data) {
            if (data.length > 0) {
                for (let idx in data) {
                    placeData.push(data[idx]);
                }
            }
        }

        // console.log(placeData);
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data, category);
        printResult(placeData);

        // 페이지 번호를 표출합니다
        // displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}
let i = 0;
function printResult(data) {

    console.log(++i + "번째 실행");
    // console.log(data);
    // console.log("print placeData : " + placeData);
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places, category) {

    var menuEl = document.getElementById('courseDetail'),
        listEl = document.getElementById('placesList'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    let placeListEl = $('#placesList');
    // 기존에 추가된 페이지번호를 삭제합니다
    while (placeListEl.children().length > 0) {
        placeListEl.empty();
    }

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    // removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for ( var i=0; i < places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i, category),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].placeName);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, place) {


    // console.log("place : " + JSON.stringify(place));
    let itemHref = "/courseHomeReview2?id=" + place["id"];
    let el = document.createElement('li'),
        itemStr = '<a href='+ itemHref +' style="text-decoration-line: none; color:black; text-align: left">' +
                         '<div class="head_item clickArea" style="display: flex; justify-content: left;">' +
                         '   <h5 class="place_name">' + place.placeName + '</h5>' +
                         '   <span class="category clickable" style="padding-left:3%; color:#949494;">' + place.categoryName + '</span>' +
                         '</div>';

        itemStr += '<div class="review_score">' +
                   '   <span className="reviewScore" style="color:red;"> ★  ' + place.score + '</span>' +
                   '</div>'

    itemStr += '<div class="info_item"><div class="addr">'

    if (place.addressName) {
        itemStr += '    <p class="addressName">' + place.addressName + '</p>';
    } else {
        itemStr += '    <p class="roadAdressName">' +  place.roadAddressName  + '</p>';
    }

    if(place.businessHour.split('·')[1] !== undefined){
        itemStr += '</div>' +
            '<div class="businessHour">' +
            '<span>' + place.businessHour.split('·')[0] + '</span>' +
            '</div>' +
            '<div class="businessHour">' +
            '<span>' + place.businessHour.split('·')[1] + '</span>' +
            '</div>';
    } else {
        itemStr += '</div>' +
            '<div class="businessHour">' +
            '<span>' + place.businessHour + '</span>' +
            '</div>'
    }

    itemStr += '  <span class="tel">' + place.phone  + '</span>' +
        '</a>'  +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, category) {

<<<<<<< HEAD
    console.log("marker image 설정전 카테고리 확인 : " + category);
    var imageSrc = '', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
=======
    // console.log("marker image 설정전 카테고리 확인 : " + category);
    let imageSrc = '../images/icons/food_map_icon.png'; // 마커 이미지 url
        if(category === 'food'){
            imageSrc = '../images/icons/food_map_icon.png';
        } else if(category === 'cafe'){
            imageSrc = '../images/icons/cafe_map_icon.png';
        } else if(category === 'tour'){
            imageSrc = '../images/icons/tour_map_icon.png';
        } else if(category === 'hotel'){
            imageSrc = '../images/icons/hotel_map_icon.png';
        }


    let imageSize = new kakao.maps.Size(32, 32),  // 마커 이미지의 크기
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
>>>>>>> backend/jangho
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pageParams, searchKeywords) {
    var paginationEl = document.getElementsByClassName('pagination')[0];
    // fragment = document.createDocumentFragment(),
    i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    /*
    * pageNum : 현재 페이지
    * amount : 페이지 당 데이터 개수
    * cnt : 총 데이터 개수
    * */
    // console.log("pageNum : " + pageParams["pageNum"] + ", amount : " + pageParams["amount"] + ", cnt : " + pageParams["cnt"]);
    var totalPage = (pageParams["cnt"] / pageParams["amount"]) + 1;

    var pageSet = Math.ceil( pageParams["pageNum"] / 5);
    var startNum = (pageSet - 1) * 5 + 1;
    var endNum = pageSet * 5;
    searchKeywords["startNum"] = startNum;
    searchKeywords["endNum"] = endNum;
    console.log("pageSet : " + pageSet + ", startNum : " + startNum + ", endNum : " + endNum + ", totalPage : " + totalPage);
    var prevEl = document.createElement('li');

    if(startNum > 5){
        prevEl.classList.add('page-item');

        let prevA = document.createElement('a');
        prevA.classList.add('page-link');

        let prevValue = (startNum - 1).toString();
        prevA.setAttribute('id', prevValue);
        prevA.setAttribute('aria-label', 'Previous');
        prevA.setAttribute('onclick', "pageActiveFunc(this, " + searchKeywords + ")");
        prevA.innerText = '<';
        prevEl.appendChild(prevA);
    }
    paginationEl.appendChild(prevEl);

    if(totalPage > endNum){
        for(i = startNum; i <= endNum; i++){
            if(i == pageParams["pageNum"]){
                let pageEl = document.createElement('li');
                pageEl.classList.add('page-item');
                pageEl.classList.add('active');

                let pageA = document.createElement('a');
                pageA.classList.add('page-link');
                pageA.setAttribute('id', i);
                pageA.setAttribute('onclick', "pageActiveFunc(this, " + searchKeywords + ")");
                pageA.innerText = i;

                pageEl.appendChild(pageA);
                paginationEl.appendChild(pageEl);
            } else {
                let pageEl = document.createElement('li');
                pageEl.classList.add('page-item');

                let pageA = document.createElement('a');
                pageA.classList.add('page-link');
                pageA.setAttribute('id', i);
                pageA.setAttribute('onclick', "pageActiveFunc(this, " + searchKeywords + ")");
                pageA.innerText = i;

                pageEl.appendChild(pageA);
                paginationEl.appendChild(pageEl);
            }
        }
    } else {
        for(i = startNum; i <= totalPage; i++){
            if(i == pageParams["pageNum"]){
                let pageEl = document.createElement('li');
                pageEl.classList.add('page-item');
                pageEl.classList.add('active');

                let pageA = document.createElement('a');
                pageA.classList.add('page-link');
                pageA.setAttribute('id', i);
                pageA.setAttribute('onclick', "pageActiveFunc(this, " + searchKeywords + ")");
                pageA.innerText = i;

                pageEl.appendChild(pageA);
                paginationEl.appendChild(pageEl);
            } else {

                let pageEl = document.createElement('li');
                pageEl.classList.add('page-item');

                let pageA = document.createElement('a');
                pageA.classList.add('page-link');
                pageA.setAttribute('id', i);
                pageA.setAttribute('onclick', "pageActiveFunc(this, " + searchKeywords + ")");
                pageA.innerText = i;

                pageEl.appendChild(pageA);
                paginationEl.appendChild(pageEl);
            }
        }
    }

    var nextEl = document.createElement('li');
    if(totalPage > 5 && endNum < totalPage){
        nextEl.classList.add('page-item');

        let nextA = document.createElement('a');
        nextA.classList.add('page-link');

        let nextValue = (endNum + 1).toString();
        nextA.setAttribute('id', nextValue);
        nextA.setAttribute('aria-label', 'Next');
        nextA.setAttribute('onclick', "pageActiveFunc(this, " + searchKeywords + ")");
        nextA.innerText = '>';
        nextEl.appendChild(nextA);
    }
    paginationEl.appendChild(nextEl);
}

function pageActiveFunc(pageInfo, searchKeywords){
    $('.pagination li').removeClass('active');

    let placeListEl = $('#placesList');
    // 기존에 추가된 페이지번호를 삭제합니다
    while (placeListEl.children().length > 0) {
        placeListEl.empty();
    }

    let pageNum = pageInfo.getAttribute('id');
    searchKeywords["pageNum"] = pageNum;

    // console.log("pageActiveFunc params : " + JSON.stringify(searchKeywords));
    $.ajax({
        method : "POST",
        headers : {
            'content-type':'application/json'
        },
        url : "/searchPlaces",
        async : true,
        dataType: "json",
        data : JSON.stringify(searchKeywords),
        success : function(result){
            // console.log(result["data"][0]);
            // console.log("ajax : result : " + JSON.stringify(result));
            displayPlaces(result["data"], searchKeywords["category"]);
            // displayPagination(result["pageNum"], result["amount"], result["cnt"]);
            displayPagination(result, JSON.stringify(searchKeywords));
        },
        error : function(request, status, error){
            console.log(error);
        }
    });

    // console.log(pageInfo);
    // $('.pagination ' + pageNum).addClass('active');
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

window.onload = function(){
    searchPlaces();
    // printResult();
    var category = 'food';

    $('#addSearchBtn').on('click', e => {
        $('#inputPlace2').show();
        $('#searchBtn2').show();
    });

    $('#removeSearchBtn').on('click', e => {
        $('#inputPlace2').hide();
        $('#searchBtn2').hide();
    });

    $("input[name=courseType][value=course_food]").prop("checked", true);
    $('#course_food_label').css('background', '#FFC061');
    $("input[name=courseType]").on("click",function(){
        // 맛집 선택시
        if($(this).attr('id') === 'course_food'){
            if($(this).is(':checked')) {
                $('#course_food_label').css('background', '#FFC061');
                $('#course_cafe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#fff');
                category = 'food';
                searchPlaces(category);
            }
        }
        // 카페 선택시
        else if($(this).attr('id') === 'course_cafe'){
            if($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_cafe_label').css('background', '#FAB7B7');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#fff');
                category = 'cafe';
                searchPlaces(category);
            }
        }
        // 관광지 선택시
        else if($(this).attr('id') === 'course_tour'){
            if($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_cafe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#96E781');
                $('#course_rest_label').css('background', '#fff');
                category = 'tour';
                searchPlaces(category);
            }
        }
        // 숙소 선택시
        else if($(this).attr('id') === 'course_rest'){
            if($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_cafe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#D7AFFF');
                category = 'hotel';
                searchPlaces(category);
            }
        }
        // console.log(this);
    });

    $("#inputPlace1").on("keyup", function(key){
        if(key.keyCode == 13){
            searchPlaces(category);
        }
    });

    $('#searchBtn1').on("click", function(){
        searchPlaces(category);
    });

    $("#inputPlace2").on("keyup", function(key){
        if(key.keyCode == 13){
            searchPlaces(category);
        }
    });

    $('#searchBtn2').on("click", function(){
        searchPlaces(category);
    });

    //사이드 네브바 열고 닫는 기능 구현
    const sidebar = $('.course_detail');
    const sidebarToggle = $('.sidebar-toggle');
    let isExpand = false;

    // 사이드바 고정으로 인해 사이드바 너비만큼 다른 요소 조정함(김션이 수정)
    sidebarToggle.on('click', () => {
        isExpand = !isExpand;
        sidebar.toggleClass('collapsed');
        $('.map_wrap').toggleClass('expanded');
        sidebar.toggle('open');

        //고정된 사이드바로 인해 사이드 토글바 위치 조정을 위해 추가한 코드
        //아래 코드를 추가해야 사이드바 너비만큼 사이드 토글바가 이동
        if (sidebar.hasClass('collapsed')) {
            sidebarToggle.css({'margin-left': '7.5rem'}); // 사이드 네브바가 닫힐 때 마진 추가
        } else {
            sidebarToggle.css({'margin-left': '0'}); // 사이드 네브바가 열릴 때 마진 제거
        }

        if(isExpand) {
            $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
            return;
        } else {
            $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
        }
    });
};