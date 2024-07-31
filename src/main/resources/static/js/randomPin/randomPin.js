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
            inst.dpDiv.css({ marginLeft: sidebarWidth }); // 사이드바 너비만큼 왼쪽으로 이동
        }
    });
});

// 핀 선택시 코스 생성 창 나오기
document.addEventListener('DOMContentLoaded', () => {
    const chosenpinBtn = document.getElementById('course-btn');
    const makeCourse = document.getElementById('makeCourse');

    chosenpinBtn.addEventListener('click', () => {
        const isExpanded = chosenpinBtn.getAttribute('aria-expanded') === 'true';
        chosenpinBtn.setAttribute('aria-expanded', !isExpanded);
        makeCourse.classList.toggle('show', !isExpanded);
    });
});

// 색상 버튼 클릭 시 테두리 추가
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.color-button');

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
});

// 메모 입력 함수
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('memo-active').addEventListener('change', function() {
        document.getElementById('memo-text').disabled = !this.checked;
    });
});

// 확인 버튼 클릭 시 코스 생성
$('.finishButton').click(function() {
    const selectedDate = $('#testDatepicker').val();
    const memoActive = $('#memo-active').is(':checked');
    const selectedMemo = memoActive ? $('#memo-text').val() : '';
    const selectedColor = $('.color-button.selected').css('background-color');

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
    } else {
        alert('날짜와 색상은 필수 선택 항목입니다.');
    }
});

// 닫기 버튼 -> 코스 생성 창 닫기
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close_icon');

    closeBtn.addEventListener('click', () => {
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
    // Enter 키의 keyCode는 13입니다.
    if (event.keyCode === 13) {
        event.preventDefault(); // 기본 엔터 키 동작(폼 제출)을 막습니다.
        searchPlaces1();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.querySelector('.modal-content input[type="text"]');
    const inputPlace = document.getElementById('inputPlace');

    if (searchBtn) {
        searchBtn.addEventListener('click', searchPlacesFromInput);
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchPlaces1();
            }
        });
    }

    if (inputPlace) {
        inputPlace.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchPlacesFromInput();
            }
        });
    }
});



function searchPlaces1() {
    const modalInput = document.querySelector('.modal-content input[type="text"]').value.trim();
    const inputPlace = document.getElementById('inputPlace');

    if (!modalInput) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    if (inputPlace) {
        inputPlace.value = modalInput;
    }

    document.getElementById('loading-spinner').style.display = 'flex';
    document.getElementById('modal-cont').style.display = 'none';

    setTimeout(function () {
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('modal-cont').style.display = 'none';
        document.getElementById('courseDetail').style.display = "block";
        // 검색 결과가 표시될 때 토글 버튼을 보이게 설정
        $('.sidebar-toggle').show();
        $('.sidebar-toggle').css({'margin-left': '0px'});
    }, 3000);



    // setTimeout(function () {
    //     ps.keywordSearch(modalInput, placesSearchCB, { radius: 500 });
    // }, 3000);

    // console.log(JSON.stringify({ "keyword": modalInput }));
    $.ajax({
        method : "GET",
        url : "/randomPlaces",
        async : true,
        dataType: "json",
        data : { "keyword": modalInput },
        success : function(result){
            // console.log(result);

            displayPlaces(result);
        },
        error : function(request, status, error){
            console.log(error);
        }
    });
}

function searchPlacesFromInput() {
    const inputPlaceValue = document.getElementById('inputPlace').value.trim();

    if (!inputPlaceValue) {
        alert('키워드를 입력해주세요!');
        return false;
    }


    document.getElementById('loading-spinner').style.display = 'flex';
    document.getElementById('modal-cont').style.display = 'none';
    document.getElementById('courseDetail').style.display = "none";
    $('.sidebar-toggle').hide();


    setTimeout(function () {
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('modal-cont').style.display = 'none';
        document.getElementById('courseDetail').style.display = "block";
        $('.sidebar-toggle').show();
        $('.sidebar-toggle').css({'margin-left': '0px'});
    }, 3000);


    // console.log(JSON.stringify({ "keyword": inputPlaceValue }));
    $.ajax({
        method : "GET",
        url : "/randomPlaces",
        async : true,
        dataType: "json",
        data : { "keyword": inputPlaceValue },
        success : function(result){
            // console.log(result);

            displayPlaces(result);
        },
        error : function(request, status, error){
            console.log(error);
        }
    });

    // setTimeout(function () {
    //     ps.keywordSearch(inputPlaceValue, placesSearchCB, { radius: 500 });
    // }, 3000);
}

// function placesSearchCB(data, status) {
//     document.getElementById('loading-spinner').style.display = 'none';
//     document.getElementById('modal-cont').style.display = 'none';
//
//     if (status === kakao.maps.services.Status.OK) {
//         shuffleArray(data);
//         var selectedData = data.slice(0, 4);
//         displayPlaces(selectedData);
//     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//         alert('검색 결과가 존재하지 않습니다.');
//     } else if (status === kakao.maps.services.Status.ERROR) {
//         alert('검색 결과 중 오류가 발생했습니다.');
//     }
// }

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }

function displayPlaces(places, category) {
    var menuEl = document.getElementById('courseDetail'),
        listEl = document.getElementById('placesList'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);
    var linePath = [];
    removeMarker();
    removePolyline();

    for (var i = 0; i < places.length; i++) {
        console.log(places[i]);
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i, places[i].categoryGroupCode),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        bounds.extend(placePosition);
        linePath.push(placePosition);

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

    listEl.appendChild(fragment);
    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#0056b3', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(map);
    polylines.push(polyline);

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, place) {
    // console.log(place);
    let itemHref = "/courseHomeReview2?id=" + place["id"];
    let el = document.createElement('li'),
        itemStr = '<a href="'+ itemHref +'" style="text-decoration-line: none; color:black; text-align: left">' +
            '<div class="head_item clickArea" style="display: flex; justify-content: left;">' +
            '   <h5 class="place_name">' + place.placeName + '</h5>' +
            '   <span class="category clickable" style="padding-left:3%; color:#949494;">' + place.categoryName + '</span>' +
            '</div>';

    itemStr += '<div class="review_score">' +
        '   <span class="reviewScore" style="color:red;"> ★  ' + place.score + '</span>' +
        '</div>';

    itemStr += '<div class="info_item"><div class="addr">';

    if (place.addressName) {
        itemStr += '    <p class="addressName">' + place.addressName + '</p>';
    } else {
        itemStr += '    <p class="roadAdressName">' + place.roadAddressName + '</p>';
    }

    if(place.businessHour && place.businessHour.split('·')[1] !== undefined){
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
            '</div>';
    }

    itemStr += '  <span class="tel">' + place.phone + '</span>' +
        '</a>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}


function addMarker(position, idx, category) {
    // console.log(position);
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

    // 마커 이미지를 새롭게 정의합니다.
    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        new kakao.maps.Size(36, 37),
        { offset: new kakao.maps.Point(13, 37) }
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



// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

window.onload = function(){
    //사이드 네브바 열고 닫는 기능 구현
    const sidebar = $('.course_detail');
    const sidebarToggle = $('.sidebar-toggle');
    let isExpand = false;

    // 처음에는 토글 버튼을 숨김
    sidebarToggle.hide(); // 처음에 숨기기

    sidebarToggle.on('click', () => {
        isExpand = !isExpand;
        sidebar.toggleClass('collapsed');
        $('.map_wrap').toggleClass('expanded');
        sidebar.toggle('open');

        //고정된 사이드바로 인해 사이드 토글바 위치 조정을 위해 추가한 코드
        //아래 코드를 추가해야 사이드바 너비만큼 사이드 토글바가 이동
        if (sidebar.hasClass('collapsed')) {
            sidebarToggle.css({'margin-left': '-490px'}); // 사이드 네브바가 닫힐 때 마진 추가
        } else {
            sidebarToggle.css({'margin-left': '0px'}); // 사이드 네브바가 열릴 때 마진 제거
        }

        if(isExpand) {
            $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
            return;
        } else {
            $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
        }
    });
}