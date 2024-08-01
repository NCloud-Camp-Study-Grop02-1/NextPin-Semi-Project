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

document.addEventListener('DOMContentLoaded', () => {
    const chosenpinBtn = document.getElementById('course-btn');
    const makeCourse = document.getElementById('makeCourse');

    chosenpinBtn.addEventListener('click', () => {
        const isExpanded = chosenpinBtn.getAttribute('aria-expanded') === 'true';
        chosenpinBtn.setAttribute('aria-expanded', !isExpanded);
        makeCourse.classList.toggle('show', !isExpanded);
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
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
        $('.sidebar-toggle').show();
        $('.sidebar-toggle').css({'margin-left': '0px'});
    }, 3000);

    $.ajax({
        method: "GET",
        url: "/randomPlaces",
        async: true,
        dataType: "json",
        data: { "keyword": modalInput },
        success: function(result) {
            displayPlaces(result);
        },
        error: function(request, status, error) {
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

    $.ajax({
        method: "GET",
        url: "/randomPlaces",
        async: true,
        dataType: "json",
        data: { "keyword": inputPlaceValue },
        success: function(result) {
            displayPlaces(result);
        },
        error: function(request, status, error) {
            console.log(error);
        }
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
            '<span>' + place.businessHour.split('·')[1] + '</span>';
    } else {
        itemStr += '</div>' +
            '<div class="businessHour">' +
            '<span>' + place.businessHour + '</span>' +
            '</div>';
    }

    itemStr += '  <span class="tel">' + place.phone + '</span>' +
        '</a>' +
        '</div>';

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

function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

window.onload = function(){
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

        if(isExpand) {
            $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
        } else {
            $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
        }
    });
}

// finish-button 클릭 이벤트 핸들러
document.querySelector(".finishButton").addEventListener("click", function(event) {
    // 데이터 매핑 로직
    var userId = 'sampleUserId';
    var nickname = 'sampleNickname';
    var courseName = '';
    var bookMark = 0;
    var heartCnt = 0;
    var isPublic = 1;
    var color = "";

    $('.color-button').each(function(index, item){
       if(item.classList.contains('selected')){
           console.log(item.style.backgroundColor)
           color = item.style.backgroundColor;
       }
    });

    $('.myCourse').each(function (item){
        if(item.classList.contains('selected')){
            courseName = item.options.value
        }
    });

    var courseData = {
        userId: userId,
        nickname: nickname,
        courseName: courseName,
        regDate: new Date().toISOString(),
        modifyDate: new Date().toISOString(),
        bookMark: bookMark,
        heartCnt: heartCnt,
        isPublic: isPublic,
        color: color
    };
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

        insertCourse(courseData);
    } else {
        alert('날짜와 색상은 필수 선택 항목입니다.');
    }

});

// 데이터 저장을 위한 함수
function insertCourse(courseData) {
    $.ajax({
        url: '/api/insertCourse', // 실제 Spring Boot 서버 URL로 변경
        type: 'POST',
        data: JSON.stringify(courseData),
        contentType: 'application/json',
        success: function(response) {
            console.log('Data inserted successfully:', response);
            alert('코스 저장이 성공되었습니다.');
        },
        error: function(error) {
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
