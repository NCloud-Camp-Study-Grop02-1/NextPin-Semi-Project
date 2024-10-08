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
    // 'searchKeywords={"keyword" : keyword, "keyword2" : keyword2, "category" : category}'
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
// function placesSearchCB(data, status, pagination) {
//     // console.log("placesSearchCB data : " + JSON.stringify(data));
//     if (status === kakao.maps.services.Status.OK) {
//         // console.log(data);
//         if(undefined !== data) {
//             if (data.length > 0) {
//                 for (let idx in data) {
//                     placeData.push(data[idx]);
//                 }
//             }
//         }
//
//         // console.log(placeData);
//         // 정상적으로 검색이 완료됐으면
//         // 검색 목록과 마커를 표출합니다
//         displayPlaces(data, category);
//         printResult(placeData);
//
//         // 페이지 번호를 표출합니다
//         // displayPagination(pagination);
//
//     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//
//         alert('검색 결과가 존재하지 않습니다.');
//         return;
//
//     } else if (status === kakao.maps.services.Status.ERROR) {
//
//         alert('검색 결과 중 오류가 발생했습니다.');
//         return;
//
//     }
// }
let i = 0;
function printResult(data) {

    // console.log(++i + "번째 실행");
    // console.log(data);
    // console.log("print placeData : " + placeData);
}

var positionLine;
var paths = [];
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

        paths.push(placePosition);
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
    // 생성된 마커목록들의 좌표를 선으로 나타날 객체 Polyline 생성
    // positionLine = new kakao.maps.Polyline({
    //     map: map,       // 선을 표시할 지도입니다
    //     path: paths,    // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
    //     strokeWeight: 3, // 선의 두께입니다
    //     strokeColor: '#db4040', // 선의 색깔입니다
    //     strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
    //     strokeStyle: 'solid' // 선의 스타일입니다
    // });


    // for(let j = 0; j < paths.length; j++){
    //     displayCircleDot(paths[j], 0);
    // }
    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

let imageIndex = 1;
// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, place) {

    // console.log("place : " + JSON.stringify(place));
    /*
    * place : {"id":7,"categoryGroupCode":"food","categoryGroupName":"맛집","categoryName":"육류,고기"
    *         ,"placeName":"삼원가든","score":0,"addressName":"서울 강남구 언주로 835"
    *         ,"roadAddressName":"신사동 623-5","businessHour":"매일 15:00 ~ 17:00","phone":"02-548-3030"
    *         ,"courseShare":null,"placeUrl":"https://place.map.kakao.com/19351143","x":127.03253030398
    *         ,"y":37.524930419988}
    * */
    let itemHref = "/courseHomeReview2?id=" + place["id"];
    let el = document.createElement('li')
    let itemStr = '<a href='+ itemHref +' style="text-decoration-line: none; color:black; text-align: left; width:300px;">' +
            '<div class="head_item clickArea" style="display: flex; justify-content: left;">' +
            '   <h5 class="place_name">' + place.placeName + '</h5>' +
            '</div>';

    itemStr += '<span class="category clickable" style="padding-left:3%; color:#949494;">' + place.categoryName + '</span>'
    itemStr += '<div class="review_score">' +
                   '<span className="reviewScore" style="color:red;"> ★  ' + place.score + '</span>' +
               '</div>'

    itemStr += '<div class="info_item">' +
                   '<div class="addr" style="display: flex">';
    itemStr +=         '<span class="location_image">' +
                           '<img class="icon_address" src="../images/icons/pin_icon.png" alt="주소"/>' +
                       '</span>';
    itemStr +=         '<span class="addressName" style="margin-left: 2%;">' + place.addressName + '</span>' +
                   '</div>';

    if (place.roadAddressName) {
        itemStr += '<span class="roadAdressName" style="margin-left: 10%;color: #8D8D8D;"> 지번 | ' +  place.roadAddressName  + '</span>';
    }
    if(place.businessHour !== undefined && place.businessHour !== ''){
        if(place.businessHour.split('·')[1] !== undefined){
            itemStr += '<div class="location_time">' +
                '<img class="icon_location" src="../images/icons/clock_icon.png" alt="시간" style="margin-right: 3%;"/>' +
                place.businessHour.split('·')[0]  +
                '</div>' +
                '<span style="margin-left: 8%;">' + place.businessHour.split('·')[1] + '</span>';
        } else {
            itemStr += '<div class="location_time">' +
                '<img class="icon_location" src="../images/icons/clock_icon.png" alt="시간" style="margin-right: 3%;"/>' +
                place.businessHour +
                '</div>';
        }
    }

    if(place.phone !== undefined && place.phone !== ''){
        itemStr +=  '<span class="location_phone">' +
                       '<img class="icon_location" src="../images/icons/phone_icon.png" alt="전화번호" style="margin-right: 2%;"/>' +
                            place.phone  +
                    '</span>';
    }
    itemStr += '</div></a>';

    el.innerHTML = itemStr;
    el.className = 'item';
    el.style.display = 'flex';

    let imgEl = document.createElement('img');

    imgEl.style.marginRight = '3%';
    if(place.categoryGroupCode === 'food'){
        imgEl.src = '../images/img/food/food' + imageIndex + '.jpg';
    } else if (place.categoryGroupCode === 'cafe'){
        imgEl.src = '../images/img/cafe/cafe' + imageIndex + '.jpg';
    } else if (place.categoryGroupCode === 'tour'){
        imgEl.src = '../images/img/tour/tour' + imageIndex + '.jpg';
    } else if (place.categoryGroupCode === 'hotel'){
        imgEl.src = '../images/img/hotel/hotel' + imageIndex + '.jpg';
    }
    el.prepend(imgEl);

    if(imageIndex == 15){
        imageIndex = 1;
    } else {
        imageIndex++;
    }
    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, category) {

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


    let imageSize = new kakao.maps.Size(40, 40),  // 마커 이미지의 크기
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
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

// 마커 지점에 대한 지점
function displayCircleDot(position, distance){


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
    var totalPage = (pageParams["cnt"] / pageParams["amount"]) + 1;
    var pageSet = Math.ceil( pageParams["pageNum"] / 5);
    var startNum = (pageSet - 1) * 5 + 1;
    var endNum = pageSet * 5;
    searchKeywords["startNum"] = startNum;
    searchKeywords["endNum"] = endNum;
    // console.log("cnt : " + pageParams["cnt"] + ", startNum : " + startNum + ", endNum : " + endNum + ", totalPage : " + totalPage);
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
        for(i = startNum; i < totalPage; i++){
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
    if(totalPage > 5 && Math.floor(pageParams["cnt"] / pageParams["amount"]) >= endNum){
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
// function removeAllChildNods(el) {
//     while (el.hasChildNodes()) {
//         el.removeChild (el.lastChild);
//     }
// }

window.onload = function(){
    searchPlaces();
    $.ajax({
        url: '/info',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.isLoggedIn) {
                sessionStorage.setItem("userId", response.userId);
                sessionStorage.setItem("nickname", response.nickname);
                userId = response.userId; // 필요에 따라 userId를 세션에서 추가로 가져오도록 백엔드 수정 필요
                nickname = response.nickname;
                console.log("User ID: ", userId);
                console.log("Nickname: ", nickname);
            } else {
                location.href = '/login';
                alert("로그인이 필요합니다.");
            }
        },
        error: function (error) {
            console.log("Error fetching user info: ", error);
        }
    });
    // printResult();
    var category = 'food';

    $('#addSearchBtn').on('click', e => {
        $('#inputPlace2').show();
        $('#searchBtn2').show();
    });

    $('#removeSearchBtn').on('click', e => {
        $('#inputPlace2').val('');
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

    // html에서 시작
    // 여기부터 검색 이벤트 실행됨 >> 자바스크립트 24번째 줄로 연결됨 > ajax에서 매핑 방식에 맞게 컨트롤러로 넘어감.

    // 컨트롤러는 ajax에서 호풀한것을 받아주는 역할
    // jsp,html 상관없이 컨트롤러부터는 흐름 똑같으니 강사님 강의 다시 듣기.. timeleaf쓰면 html을 jsp처럼도 사용 가능
    // @ResponseBody, @RequestBody 어노테이션 잘 씀용, ajax에서 string타입으로 받은 json을 map형식으로 받기 위해 쓰는 어노테이션
    // RequestBody로 받고 ResponseBody로 다시 보내주는 것임

    // 컨트롤러에서 받고 서비스 임플, 서비스 파일로 이동
    // 서비스는 파라미터 가꿔주는 역할
    // 여기서는 데이터 가공 처리정도만

    // dao로 이동. 여기서 본격적으로 db에 있는 것을 호출하는 역할. 데이터를 뽑아옴. mapper에 있는 쿼리문을 실행해서 원하는 데이터를 뽑아옴.

    // mapper는 쿼리문을 이용해서 실제 db에 연결
    // select문은 변수가 필요한 부분은 파라미터타입 지정해줘야 함.

    // dto는 내가 쓸 객체를 지정해주는 곳.
    // mybatis.config.xml에서 dto 변수명을 더 간단히 설정 가능
    // application.properties파일의 21-23줄 부분도 참고. 그 부분도 설정해야 함.

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