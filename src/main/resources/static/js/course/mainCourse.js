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
function searchPlaces() {

    var keyword = $('#inputPlace1').val() === undefined ? "" : $('#inputPlace1').val();


    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }


    $("#inputPlace1").val(keyword);

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    // ps.keywordSearch( keyword, placesSearchCB);
    ps.keywordSearch(keyword, placesSearchCB
        , {
            radius : 500                  // 반경범위 미터 단위(0m ~ 20000m)
            // ,location: new kakao.maps.LatLng(37.566826, 126.9786567)
        }
    );
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
        displayPlaces(data);
        printResult(placeData);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

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
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('courseDetail'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
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
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    // for(key in places){
    //     let rowData = {};
    //     rowData.key = key;
    //     rowData.value = places[key]
    //     console.log("지도 데이터1 : " + JSON.stringify(placeData));
    //     console.log("지도 데이터 개수: " + placeData.length);
    //     placeData.push(rowData);
    // }
    // console.log("지도 데이터 : " + JSON.stringify(placeData));
    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
            '<a href="courseHomeReview2">' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>';
        // +
        // '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone  + '</span>' +
        '</a>'  +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
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
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
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
    $("#dataChk").on("click", function(){
        $.ajax({
            method : "POST",
            headers : {
                'content-type':'application/json'
            },
            url : "/kakaoData",
            async : true,
            dataType: "json",
            data : JSON.stringify(placeData),
            success : function(result){
                console.log("ajax : result : " + result);
            },
            error : function(request, status, error){
                console.log(error);
            }
        });
    });

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
                $('#course_caffe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#fff');
            }
        }
        // 카페 선택시
        else if($(this).attr('id') === 'course_caffe'){
            if($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_caffe_label').css('background', '#FAB7B7');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#fff');
            }
        }
        // 관광지 선택시
        else if($(this).attr('id') === 'course_tour'){
            if($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_caffe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#96E781');
                $('#course_rest_label').css('background', '#fff');
            }
        }
        // 숙소 선택시
        else if($(this).attr('id') === 'course_rest'){
            if($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_caffe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#D7AFFF');
            }
        }
        // console.log(this);
    });

    $('#searchBtn1').on("click", function(){
        searchPlaces();
    });

    const sidebar = $('.course_detail');
    const sidebarToggle = $('.sidebar-toggle');
    let isExpand = false;

    sidebarToggle.on('click', () => {
        isExpand = !isExpand;
        sidebar.toggle('open');

        if(isExpand) {
            $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
            return;
        }

        $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
        // sidebarContainer.classList.toggle('open');
        // sidebarArrowContainer.classList.toggle('open');
    });
};

//-------------------------------------------------------------
// 카페 마커가 표시될 좌표 배열입니다
var caffePositions = [
    new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
    new kakao.maps.LatLng(37.499427948430814, 127.02794423197847),
    new kakao.maps.LatLng(37.498553760499505, 127.02882598822454),
    new kakao.maps.LatLng(37.497625593121384, 127.02935713582038),
    new kakao.maps.LatLng(37.49646391248451, 127.02675574250912),
    new kakao.maps.LatLng(37.49629291770947, 127.02587362608637),
    new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)
];

// 맛집 마커가 표시될 좌표 배열입니다
var foodPositions = [
    new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
    new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
    new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
    new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
    new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
    new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
    new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
];

// 관광지 마커가 표시될 좌표 배열입니다
var tourPositions = [
    new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
    new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
    new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
    new kakao.maps.LatLng(37.49893267508434, 127.02673400572665)
];

// 숙소 마커가 표시될 좌표 배열입니다
var restPositions = [
    new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
    new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
    new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)
];

var markerImageSrc = 'images/icons/Merged_map_icon.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
caffeMarkers = [], // 카페 마커 객체를 가지고 있을 배열입니다
foodMarkers = [], // 맛집 마커 객체를 가지고 있을 배열입니다
tourMarkers = []; // 관광지 마커 객체를 가지고 있을 배열입니다
restMarkers = []; // 숙소 마커 객체를 가지고 있을 배열입니다


createCaffeMarkers(); // 커피숍 마커를 생성하고 커피숍 마커 배열에 추가합니다
createFoodMarkers(); // 맛집 마커를 생성하고 편의점 마커 배열에 추가합니다
createTourMarkers(); // 관광지 마커를 생성하고 주차장 마커 배열에 추가합니다
createRestMarkers(); // 숙소 마커를 생성하고 주차장 마커 배열에 추가합니다

changeMarker('caffe'); // 지도에 카페 마커가 보이도록 설정합니다


// 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image
    });

    return marker;
}

// 커피 마커를 생성하고 커피 마커 배열에 추가하는 함수입니다
function createCaffeMarkers() {

    for (var i = 0; i < caffePositions.length; i++) {

        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 0),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(caffePositions[i], markerImage);

        // 생성된 마커를 커피 마커 배열에 추가합니다
        caffeMarkers.push(marker);
    }
}

// 카페 마커들의 지도 표시 여부를 설정하는 함수입니다
function setCaffeMarkers(map) {
    for (var i = 0; i < caffeMarkers.length; i++) {
        caffeMarkers[i].setMap(map);
    }
}

// 맛집 마커를 생성하고 맛집 마커 배열에 추가하는 함수입니다
function createFoodMarkers() {
    for (var i = 0; i < foodPositions.length; i++) {

        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 36),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(foodPositions[i], markerImage);

        // 생성된 마커를 맛집 마커 배열에 추가합니다
        foodMarkers.push(marker);
    }
}

// 맛집 마커들의 지도 표시 여부를 설정하는 함수입니다
function setFoodMarkers(map) {
    for (var i = 0; i < foodMarkers.length; i++) {
        foodMarkers[i].setMap(map);
    }
}

// 관광지 마커를 생성하고 관광지 마커 배열에 추가하는 함수입니다
function createTourMarkers() {
    for (var i = 0; i < tourPositions.length; i++) {

        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 72),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(tourPositions[i], markerImage);

        // 생성된 마커를 관광지 마커 배열에 추가합니다
        tourMarkers.push(marker);
    }
}

// 관광지 마커들의 지도 표시 여부를 설정하는 함수입니다
function setTourMarkers(map) {
    for (var i = 0; i < tourMarkers.length; i++) {
        tourMarkers[i].setMap(map);
    }
}

// 숙소 마커를 생성하고 숙소 마커 배열에 추가하는 함수입니다
function createRestMarkers() {
    for (var i = 0; i < restPositions.length; i++) {

        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 72),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(restPositions[i], markerImage);

        // 생성된 마커를 숙소 마커 배열에 추가합니다
        restMarkers.push(marker);
    }
}

// 숙소 마커들의 지도 표시 여부를 설정하는 함수입니다
function setRestMarkers(map) {
    for (var i = 0; i < restMarkers.length; i++) {
        restMarkers[i].setMap(map);
    }
}

// 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
function changeMarker(type){

    var coaffeMenu = document.getElementById('course_caffe_label');
    var foodMenu = document.getElementById('course_food_label');
    var tourMenu = document.getElementById('course_tour_label');
    var restMenu = document.getElementById('course_rest_label');

    // 카페 카테고리가 클릭됐을 때
    if (type === 'caffe') {

        // 카페 카테고리를 선택된 스타일로 변경하고
        course_caffe_label.className = 'menu_selected';

        // 맛집, 관광지, 숙소 카테고리는 선택되지 않은 스타일로 바꿉니다
        course_food_label.className = '';
        course_tour_label.className = '';
        course_rest_label.className = '';

        // 카페 마커들만 지도에 표시하도록 설정합니다
        setCaffeMarkers(map);
        setFoodMarkers(null);
        setTourMarkers(null);
        setRestMarkers(null);

    } else if (type === 'food') { // 맛집 카테고리가 클릭됐을 때

        // 맛집 카테고리를 선택된 스타일로 변경하고
        course_caffe_label.className.className = '';
        course_food_label.className = 'menu_selected';
        course_tour_label.className = '';
        course_rest_label.className = '';

        // 맛집 마커들만 지도에 표시하도록 설정합니다
        setCaffeMarkers(null);
        setFoodMarkers(map);
        setTourMarkers(null);
        setRestMarkers(null);

    } else if (type === 'tour') { // 관광지 카테고리가 클릭됐을 때

        // 관광지 카테고리를 선택된 스타일로 변경하고
        course_caffe_label.className.className = '';
        course_food_label.className = '';
        course_tour_label.className = 'menu_selected';
        course_rest_label.className = '';

        // 관광지 마커들만 지도에 표시하도록 설정합니다
        setCaffeMarkers(null);
        setFoodMarkers(null);
        setTourMarkers(map);
        setRestMarkers(null);

    } else if (type === 'rest') { // 숙소 카테고리가 클릭됐을 때

        // 숙소 카테고리를 선택된 스타일로 변경하고
        course_caffe_label.className.className = '';
        course_food_label.className = '';
        course_tour_label.className = '';
        course_rest_label.className = 'menu_selected';

        // 숙소 마커들만 지도에 표시하도록 설정합니다
        setCaffeMarkers(null);
        setFoodMarkers(null);
        setTourMarkers(null);
        setRestMarkers(map);
    }
}