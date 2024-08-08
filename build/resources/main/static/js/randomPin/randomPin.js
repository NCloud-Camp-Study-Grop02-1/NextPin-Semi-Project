$(function() {
    $("#testDatepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['일','월','화','수','목','금','토'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        showButtonPanel: true,
        showMonthAfterYear:true,
        dateFormat:"yy-mm-dd",
        beforeShow: function(input, inst) {


            var sidebarWidth = $('#side-bar').outerWidth();
            inst.dpDiv.css({ marginLeft: sidebarWidth });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const chosenpinBtn = document.getElementById('course-btn');
    const makeCourse = document.getElementById('makeCourse');
    const buttons = document.querySelectorAll('.color-button');
    fetchUserInfo();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
            } else {
                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            }
        });
    });

    chosenpinBtn.addEventListener('click', () => {
        console.log(chosenpinBtn.getAttribute('aria-expanded'));
        const isExpanded = chosenpinBtn.getAttribute('aria-expanded') === 'true';
        console.log(isExpanded);
        chosenpinBtn.setAttribute('aria-expanded', !isExpanded);
        makeCourse.classList.toggle('show', !isExpanded);
    });

    document.getElementById('memo-active').addEventListener('change', function() {
        document.getElementById('memo-text').disabled = !this.checked;
    });
});

// $('.finishButton').click(function() {
//     const selectedDate = $('#testDatepicker').val();
//     const memoActive = $('#memo-active').is(':checked');
//     const selectedMemo = memoActive ? $('#memo-text').val() : '';
//     const selectedColor = $('.color-button.selected').css('background-color');
//
//     if (selectedDate && selectedColor) {
//         var memoText = '';
//         if ($('#memo-active').is(':checked')) {
//             memoText = $('#memo-text').val();
//         }
//         $('#selectedDate').text(selectedDate);
//         $('#selectedMemo').text(selectedMemo);
//         $('#selectedColor').css('background-color', selectedColor);
//
//         $('#makeCourse').removeClass('show');
//         $('#newCoursePanel').removeClass('hidden');
//     } else {
//         alert('날짜와 색상은 필수 선택 항목입니다.');
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close_icon');

    closeBtn.addEventListener('click', () => {
        console.log(closeBtn.getAttribute('aria-expanded'));
        const isExpanded = closeBtn.getAttribute('aria-expanded') === 'true';
        closeBtn.setAttribute('aria-expanded', !isExpanded);
        $('#makeCourse').removeClass('show');
        $('#newCoursePanel').addClass('hidden');
    });
});

document.getElementById('loading-spinner').addEventListener('click', function (e) {
    var modal = document.getElementById('modal-cont');
    if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
});

var placeData = [];
var markers = [];
var polylines = [];

var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 10
    };

var map = new kakao.maps.Map(mapContainer, mapOption);
var ps = new kakao.maps.services.Places();
var infowindow = new kakao.maps.InfoWindow({zIndex: 1});

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchPlaces1();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.querySelector('.modal-content input[type="text"]');
    const inputPlace = document.getElementById('inputPlace');
    let isSearching = false; // 상태 변수

    function handleSearch(callback, searchType) {
        if (!isSearching) {
            isSearching = true;
            console.log(`Starting ${searchType} search...`);
            callback().finally(() => {
                isSearching = false;
                console.log(`Completed ${searchType} search.`);
            });
        } else {
            console.log(`Search already in progress.`);
        }
    }

    function startInputSearch() {
        console.log("Button clicked, starting search from input...");
        handleSearch(searchPlacesFromInput, 'input');
    }

    function handleInputEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log("Enter pressed in input, starting search from input...");
            handleSearch(searchPlacesFromInput, 'input');
        }
    }

    function handleModalEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log("Enter pressed in modal input, starting search from modal...");
            handleSearch(searchPlaces1, 'modal');
        }
    }

    if (searchBtn) {
        searchBtn.removeEventListener('click', startInputSearch); // 기존 리스너 제거
        searchBtn.addEventListener('click', startInputSearch);
    }

    if (inputPlace) {
        inputPlace.removeEventListener('keydown', handleInputEnter); // 기존 리스너 제거
        inputPlace.addEventListener('keydown', handleInputEnter);
    }

    if (searchInput) {
        searchInput.removeEventListener('keydown', handleModalEnter); // 기존 리스너 제거
        searchInput.addEventListener('keydown', handleModalEnter);
    }
});

function searchPlaces1() {
    const chosenpinBtn = document.getElementById('course-btn');
    chosenpinBtn.setAttribute('aria-expanded', 'false');
    const modalInput = document.querySelector('.modal-content input[type="text"]').value.trim();
    const inputPlace = document.getElementById('inputPlace');

    if (!modalInput) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // if (inputPlace) {
    //     inputPlace.value = modalInput;
    // }

    document.getElementById('loading-spinner').style.display = 'flex';
    document.getElementById('modal-cont').style.display = 'none';


    $.ajax({
        method: "GET",
        url: "/randomPlaces",
        async: true,
        dataType: "json",
        data: { "keyword": modalInput },
        success: function(result) {
            displayPlaces(result);
            saveData(result);
            setTimeout(function () {
                document.getElementById('loading-spinner').style.display = 'none';
                document.getElementById('modal-cont').style.display = 'none';
                document.getElementById('courseDetail').style.display = "block";
                $('.sidebar-toggle').show();
                $('.sidebar-toggle').css({'margin-left': '0px'});
            }, 3000);

        },
        error: function(request, status, error) {
            console.log(error);
        }
    });

    return new Promise((resolve) => {
        console.log("Searching places in modal...");
        setTimeout(() => {
            console.log("Modal search completed");
            resolve();
        }, 500); // Simulate 500ms search delay
    });
}

function searchPlacesFromInput() {
    const chosenpinBtn = document.getElementById('course-btn');
    chosenpinBtn.setAttribute('aria-expanded', 'false');
    const inputPlaceValue = document.getElementById('inputPlace').value.trim();

    if (!inputPlaceValue) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    document.getElementById('loading-spinner').style.display = 'flex';
    document.getElementById('modal-cont').style.display = 'none';
    document.getElementById('courseDetail').style.display = "none";
    $('.sidebar-toggle').hide();


    $.ajax({
        method: "GET",
        url: "/randomPlaces",
        async: true,
        dataType: "json",
        data: { "keyword": inputPlaceValue },
        success: function(result) {
            displayPlaces(result);
            saveData(result);
            setTimeout(function () {
                document.getElementById('loading-spinner').style.display = 'none';
                document.getElementById('modal-cont').style.display = 'none';
                document.getElementById('courseDetail').style.display = "block";
                $('.sidebar-toggle').show();
                $('.sidebar-toggle').css({'margin-left': '0px'});
            }, 3000);
            $('#makeCourse').removeClass('show');
            $('')
            $("#newCourseName").val(''); // 코스 이름 초기화
            $("#testDatepicker").val(''); // 날짜 초기화
            $("#memo-active").prop("checked", false); // 체크박스 초기화
            $("#memo-text").val(''); // 텍스트 초기화
            $(".color-button").each(function() { // 모든 선택된 색상 버튼 초기화
            $(this).removeClass("selected");

            });

            // course_close_btn 버튼 클릭
            $("#course_close_btn").click();

        },
        error: function(request, status, error) {
            console.log(error);
        }
    });

    return new Promise((resolve) => {
        console.log("Searching places from input...");
        setTimeout(() => {
            console.log("Input search completed");
            resolve();
        }, 500); // Simulate 500ms search delay
    });
}

function displayPlaces(places) {
    var menuEl = document.getElementById('courseDetail'),
        listEl = document.getElementById('placesList'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    removeAllChildNods(listEl);
    var linePath = [];
    removeMarker();
    removePolyline();

    for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i, places[i].categoryGroupCode),
            itemEl = getListItem(places[i]);

        if (!itemEl) {
            console.error(`Failed to create list item for place: ${places[i].id}`);
            continue;
        }

        bounds.extend(placePosition);
        linePath.push(placePosition);

        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover = function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
                infowindow.close();
            };
        })(marker, places[i].placeName);

        fragment.appendChild(itemEl);
    }

    listEl.appendChild(fragment);
    var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#0056b3',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
});

    polyline.setMap(map);
    polylines.push(polyline);
    map.setBounds(bounds);
}

function getListItem(place) {
    if (!place || !place.id) {
        console.error("Place or place.id is undefined");
        return null;
    }

    console.log(place);
    let itemHref = "/courseHomeReview2?id=" + place.id;
    let el = document.createElement('li'),
        itemStr = '<a href="'+ itemHref +'" style="text-decoration-line: none; color:black; text-align: left">' +
            '<div class="head_item clickArea" style="display: flex; justify-content: left;">' +
            '   <h5 class="place_name">' + place.placeName + '</h5>' +
            '</div>';

    if (place.categoryGroupCode === 'food') {
        itemStr += '<label id="course_food_label" style="margin-right: 3%; width: 100px; text-align: center; padding-left: 0; border-radius: 15px; border: 2px solid #FFC061; background-color: #FFC061;  margin-bottom: 10px;">' +
            '           <img src="../images/icons/foodPlace_icon.png" alt="맛집 이미지"/> #맛집' +
            '       </label>';
    } else if(place.categoryGroupCode === 'cafe'){
        itemStr += '<label id="course_cafe_label" style="margin-right: 3%; width: 100px; text-align: center; padding-left: 0; border-radius: 15px; border: 2px solid #FAB7B7; background-color: #FAB7B7; margin-bottom: 10px;">' +
            '            <img src="../images/icons/cafePlace_icon.png" alt="카페 이미지"/> #카페' +
            '        </label>';
    } else if(place.categoryGroupCode === 'tour'){
        itemStr += '<label id="course_tour_label" style="margin-right: 3%; width: 100px; text-align: center; padding-left: 0; border-radius: 15px; border: 2px solid #96E781; background-color: #96E781; margin-bottom: 10px;">' +
            '               <img src="../images/icons/tourPlace_icon.png" alt="관광지 이미지"/> #관광지' +
            '        </label>';
    } else if(place.categoryGroupCode === 'hotel'){
        itemStr += '<label id="course_rest_label" style="margin-right: 3%; width: 100px; text-align: center; padding-left: 0; border-radius: 15px; border: 2px solid #D7AFFF; background-color: #D7AFFF; margin-bottom: 10px;">' +
            '                <img src="../images/icons/lodgingPlace_icon.png" alt="숙소 이미지"> #숙소' +
            '       </label>';
    }

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
    itemStr += ' <div class="division-line" style="border-top: 0.1rem solid #E1E1E1; margin: 2rem"></div> '

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function addMarker(position, idx, category) {
    let imageSrc = '../images/icons/food_map_icon.png'; // 기본 마커 이미지 url
    if (category === 'food') {
        imageSrc = '../images/icons/food_map_icon.png';
    } else if (category === 'cafe') {
        imageSrc = '../images/icons/cafe_map_icon.png';
    } else if (category === 'tour') {
        imageSrc = '../images/icons/tour_map_icon.png';
    } else if (category === 'hotel') {
        imageSrc = '../images/icons/hotel_map_icon.png';
    }

    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        new kakao.maps.Size(36, 37),
        {offset: new kakao.maps.Point(13, 37)}
    );

    var marker = new kakao.maps.Marker({
        position: position,
        image: markerImage
    });

    marker.setMap(map);
    markers.push(marker);
    return marker;
}

function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function removePolyline() {
    for (var i = 0; i < polylines.length; i++) {
        polylines[i].setMap(null);
    }
    polylines = [];
}

function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
}

function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

window.onload = function () {
    const sidebar = $('.course_detail');
    const sidebarToggle = $('.sidebar-toggle');
    let isExpand = false;

    sidebarToggle.hide();

    sidebarToggle.on('click', () => {
        isExpand = !isExpand;
        sidebar.toggleClass('collapsed');
        $('.map_wrap').toggleClass('expanded');
        sidebar.toggle('open');

        if (sidebar.hasClass('collapsed')) {
            sidebarToggle.css({'margin-left': '-490px'});
        } else {
            sidebarToggle.css({'margin-left': '0px'});
        }

        if (isExpand) {
            $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
        } else {
            $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
        }
    });
}
// 데이터 매핑 로직
var userId;
var nickname;

// 사용자 정보 가져오기 함수
function fetchUserInfo() {
    $.ajax({
        url: '/info',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.isLoggedIn) {
                userId = response.userId; // 필요에 따라 userId를 세션에서 추가로 가져오도록 백엔드 수정 필요
                nickname = response.nickname;
                console.log("User ID: ", userId);
                console.log("Nickname: ", nickname);
            } else {
                location.href = '/login';
                alert("로그인이 필요합니다.");
            }
        },
        error: function(error) {
            console.log("Error fetching user info: ", error);
        }
    });
}


var bookMark = 1;
var heartCnt = 0;
var openClose = 1;
var color = "";
var placeName = [];
var xLoc = [];
var yLoc = [];

function saveData(data){
    placeName = [];
    xLoc = [];
    yLoc = [];
    // console.log("data : " + JSON.stringify(data));

    for(idx in data){
        placeName.push(data[idx].placeName);
        xLoc.push(data[idx].x);
        yLoc.push(data[idx].y);
    }

    console.log("placeName : " + JSON.stringify(placeName));
    console.log("xLoc : " + JSON.stringify(xLoc));
    console.log("yLoc : " + JSON.stringify(yLoc));
}

// finish-button 클릭 이벤트 핸들러
document.querySelector("#finish-button").addEventListener("click", function (event) {

    const selectedDate = $('#testDatepicker').val();
    const memoActive = $('#memo-active').is(':checked');
    const selectedMemo = memoActive ? $('#memo-text').val() : '';
    const selectedColor = $('.color-button.selected').css('background-color');

    $('.color-button').each(function (index, item) {
        if (item.classList.contains('selected')) {
            console.log(item.style.backgroundColor);
            color = item.style.backgroundColor;
        }
    });

    // 사용자가 입력한 새 코스 이름 가져오기
    const newCourseName = $('#newCourseName').val();
    if (newCourseName) {
        courseName = newCourseName;
    } else {
        courseName = $("#myCourse").val();
    }

    console.log(courseName);
    // $('.myCourse').each(function (item){
    //     if(item.classList.contains('selected')){
    //         courseName = item.options.value
    //     }
    // });

    var courseData = {
        userId: userId,
        nickname: nickname,
        courseName: courseName,
        // regDate: new Date().toISOString(),
        // modifyDate: new Date().toISOString(),
        bookMark: bookMark,
        heartCnt: heartCnt,
        openClose: openClose,
        color: color
    };


    var courseDetailData = [];

    for(let i = 0; i < placeName.length; i++){
        let tempData = {
            userId: userId,
            location: placeName[i],
            x: xLoc[i],
            y: yLoc[i], // 실제 y 좌표로 변경
            visitDate: selectedDate,
            memo: selectedMemo
        }
        courseDetailData.push(tempData);
    }
    // [{
    //             userId: userId,
    //             location: placeName,
    //             x: xLoc, // 실제 x 좌표로 변경
    //             y: yLoc, // 실제 y 좌표로 변경
    //             visitDate: selectedDate,
    //             memo: selectedMemo
    //     }, {
    //             userId: userId,
    //             location: placeName,
    //             x: 0, // 실제 x 좌표로 변경
    //             y: 0, // 실제 y 좌표로 변경
    //             visitDate: selectedDate,
    //             memo: selectedMemo
    //     }, {
    //             userId: userId,
    //             location: placeName,
    //             x: 0, // 실제 x 좌표로 변경
    //             y: 0, // 실제 y 좌표로 변경
    //             visitDate: selectedDate,
    //             memo: selectedMemo
    //     }, {
    //             userId: userId,
    //             location: placeName,
    //             x: 0, // 실제 x 좌표로 변경
    //             y: 0, // 실제 y 좌표로 변경
    //             visitDate: selectedDate,
    //             memo: selectedMemo
    //     }];


    if (selectedDate && selectedColor) {
        var memoText = '';
        if ($('#memo-active').is(':checked')) {
            memoText = $('#memo-text').val();
        }

        $('#selectedDate').text(selectedDate);
        $('#selectedMemo').text(selectedMemo);
        $('#selectedColor').css('background-color', selectedColor);

        $('#makeCourse').removeClass('show');
        $('#newCoursePanel').removeClass('hidden');

        insertCourse(courseData, courseDetailData);
    } else {
        alert('날짜와 색상은 필수 선택 항목입니다.');
    }

});

// 데이터 저장을 위한 함수
function insertCourse(courseData, courseDetailData) {
    $.ajax({
        url: '/insertCourse', // 실제 Spring Boot 서버 URL로 변경
        type: 'POST',
        data: JSON.stringify({"courseData" : courseData, "courseDetailData" : courseDetailData}),

        contentType: 'application/json',
        success: function (response) {
            console.log('Data inserted successfully:', response);
            alert('코스 저장이 성공되었습니다.');

            $('#courseName').text(courseName);
            $('#placeName').text(placeName);

            // placeName 리스트를 <br> 태그로 변환하여 placeList에 저장
            let placeListForDisplay = '';
            for (let i in placeName) {
                placeListForDisplay += placeName[i] + '<br>';
            }

            // placeList를 #placeName 요소에 설정
            document.getElementById('placeName').innerHTML = placeListForDisplay;

            // placeName 리스트를 \n으로 변환하여 저장할 때 사용할 placeList 생성
            let placeListForStorage = '';
            for (let i in placeName) {
                placeListForStorage += placeName[i] + '\n';
            }


            placeName = [];
            xLoc = [];
            yLoc = [];

        },
        error: function (error) {
            console.error('Error inserting data:', error);
            alert('코스 저장이 실패되었습니다.')
        }
    });
}


// document.querySelector(".finishButton").addEventListener("click", function(event) {
//     var courseData = {
//         userId: 'sampleUserId',
//         nickname: 'sampleNickname',
//         courseName: 'sampleCourseName',
//         regDate: new Date().toISOString(),
//         modifyDate: new Date().toISOString(),
//         bookMark: 0,
//         heartCnt: 0,
//         openClose: 1
//     };
//     insertCourse(courseData);
// });