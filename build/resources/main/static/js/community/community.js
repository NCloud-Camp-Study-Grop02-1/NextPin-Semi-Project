// 카맵 API
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

    var keyword = $('#inputPlace').val() === undefined ? "강남 고깃집" : $('#inputPlace').val();

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    $("#keyword").val(keyword);
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
//         displayPlaces(data);
//         printResult(placeData);
//
//         // 페이지 번호를 표출합니다
//         displayPagination(pagination);
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
// let i = 0;
// function printResult(data) {

    // console.log(++i + "번째 실행");
    // console.log(data);
    // console.log("print placeData : " + placeData);
// }

// 검색 결과 목록과 마커를 표출하는 함수입니다
// function displayPlaces(places) {
//
//     var listEl = document.getElementById('placesList'),
//         menuEl = document.getElementById('menu_wrap'),
//         fragment = document.createDocumentFragment(),
//         bounds = new kakao.maps.LatLngBounds(),
//         listStr = '';
//
//     // 검색 결과 목록에 추가된 항목들을 제거합니다
//     removeAllChildNods(listEl);
//
//     // 지도에 표시되고 있는 마커를 제거합니다
//     removeMarker();
//
//     for ( var i=0; i<places.length; i++ ) {
//
//         // 마커를 생성하고 지도에 표시합니다
//         var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//             marker = addMarker(placePosition, i);
//             // itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
//
//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         bounds.extend(placePosition);
//
//         // 마커와 검색결과 항목에 mouseover 했을때
//         // 해당 장소에 인포윈도우에 장소명을 표시합니다
//         // mouseout 했을 때는 인포윈도우를 닫습니다
//         (function(marker, title) {
//             kakao.maps.event.addListener(marker, 'mouseover', function() {
//                 displayInfowindow(marker, title);
//             });
//
//             kakao.maps.event.addListener(marker, 'mouseout', function() {
//                 infowindow.close();
//             });
//
//             itemEl.onmouseover =  function () {
//                 displayInfowindow(marker, title);
//             };
//
//             itemEl.onmouseout =  function () {
//                 infowindow.close();
//             };
//         })(marker, places[i].place_name);
//
//         fragment.appendChild(itemEl);
//     }
//
//     // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//     listEl.appendChild(fragment);
//     menuEl.scrollTop = 0;
//
//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
// }

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
            '<div class="info">' +
            '   <h5>' + places.location + '</h5>';

    // if (places.road_address_name) {
    //     itemStr += '    <span>' + places.road_address_name + '</span>' +
    //         '   <span class="jibun gray">' +  places.address_name  + '</span>';
    // } else {
    //     itemStr += '    <span>' +  places.address_name  + '</span>';
    // }
    //
    // itemStr += '  <span class="tel">' + places.phone  + '</span>' +
    //     '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position) {
    var imageSrc = '../images/icons/course_icon.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
    let imageSize = new kakao.maps.Size(32, 40),  // 마커 이미지의 크기
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

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
// function displayPagination(pagination) {
//     var paginationEl = document.getElementById('pagination'),
//         fragment = document.createDocumentFragment(),
//         i;
//
//     // 기존에 추가된 페이지번호를 삭제합니다
//     while (paginationEl.hasChildNodes()) {
//         paginationEl.removeChild (paginationEl.lastChild);
//     }
//
//     for (i=1; i<=pagination.last; i++) {
//         var el = document.createElement('a');
//         el.href = "#";
//         el.innerHTML = i;
//
//         if (i===pagination.current) {
//             el.className = 'on';
//         } else {
//             el.onclick = (function(i) {
//                 return function() {
//                     pagination.gotoPage(i);
//                 }
//             })(i);
//         }
//
//         fragment.appendChild(el);
//     }
//     paginationEl.appendChild(fragment);
// }

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

document.getElementById('searchInput').addEventListener('input', filterItems);
window.onload = function(){
    searchPlaces();
    // printResult();
};

function filterItems() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    // .mypin-content 내의 항목을 필터링
    const courseItems = document.querySelectorAll('.ranking li');
    courseItems.forEach(item => {
        let value = '';
        if(item.querySelector('input') !== undefined && item.querySelector('input') !== null) {
            value = item.querySelector('input').value.toLowerCase();
        }
        if (value.includes(searchValue)) {
            item.style.display = 'block'; // 부모 li 요소를 표시
        } else {
            item.style.display = 'none'; // 부모 li 요소를 숨김
        }
    });

}

// 프로필 사진을 클릭하면 해당 유저의 페이지로 이동 (추후 수정 예정)
// function goToProfile(button) {
//     let profileName = button.querySelector('span').textContent; // 프로필 버튼 내 span 요소의 텍스트 가져오기
//     alert(profileName + '의 페이지로 이동'); // alert 창에 메시지 표시
// }

// 유저들의 코스 하트 누르기
function toggleHeart(button) {
    const heartImage = button.querySelector('img');
    const heartCount = button.querySelector('span');
    const isLiked = heartImage.src.includes('after');

    if (isLiked) {
        heartImage.src = '../images/icons/heart-before_icon.png';
        heartCount.textContent = parseInt(heartCount.textContent) - 1;
    } else {
        heartImage.src = '../images/icons/heart-after_icon.png';
        heartCount.textContent = parseInt(heartCount.textContent) + 1;
    }
}

// // 초기 로드 시 실행
// document.addEventListener('DOMContentLoaded', function() {
//     const courseDetails = document.querySelector('.course-details');
//     courseDetails.style.display = 'none'; // 초기에 숨김 처리
// });

// 코스 버튼 클릭 시 course-details 토글
// function toggleCourseDetails(button) {
//     const rankingItem = button.closest('.collapse');
//     const courseDetails = rankingItem.nextElementSibling;
//     if (courseDetails.style.display === 'none' || courseDetails.style.display === '') {
//         courseDetails.style.display = 'block';
//     } else {
//         courseDetails.style.display = 'none';
//     }
// }


// 저장버튼 누르면 아이콘 색 채워지기
// function toggleSave(button) {
//     const saveImage = button.querySelector('img');
//     const isSaved = saveImage.src.includes('after');
//
//     if (isSaved) {
//         saveImage.src = 'images/icons/save-before-icon.png';
//     } else {
//         saveImage.src = 'images/icons/save-after-icon.png';
//     }
// }

var paths = [];
// 코스명 선택 시 핀 꽂는 기능
function drawPinCourse(courseData){
    // console.log(courseData);
    let courseId = '',
        bounds = new kakao.maps.LatLngBounds();
    if(undefined !== courseData){
        courseId = courseData[0].courseId;
    }

    // for(let i =0; i < courseData.length; i++){
    //     console.log(i + " : " + JSON.stringify(courseData[i]));
    // }
    removeMarker();

    for(let i = 0; i < courseData.length; i++){

        var placePosition = new kakao.maps.LatLng(courseData[i].y, courseData[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, courseData[i]);

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
        })(marker, courseData[i].location);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }

}
window.onload = function(){
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
    const sidebar = $('.community_section');
    const sidebarToggle = $('.sidebar-toggle');
    let isExpand = false;

    sidebarToggle.on('click', () => {
        isExpand = !isExpand;
        sidebar.toggle('open');

        if(isExpand) {
            $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
            sidebarToggle.css({'margin-left': '1rem'});
            return;
        }

        $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
        sidebarToggle.css({'margin-left': '0'});
        // sidebarContainer.classList.toggle('open');
        // sidebarArrowContainer.classList.toggle('open');
    });

    // 유저가 클릭한 일차 글자 색상 변경
    // 모든 'day' 클래스를 가진 요소들을 선택
    const dayElements = document.querySelectorAll('.day');

    // 각 요소에 대해 클릭 이벤트 리스너 추가
    dayElements.forEach(function(dayElement) {
        dayElement.addEventListener('click', function() {
            // 클릭된 요소가 이미 active 클래스가 있는지 확인
            const isActive = this.classList.contains('active');

            // 모든 day 요소에서 active 클래스 제거
            dayElements.forEach(function(el) {
                el.classList.remove('active');
            });

            // 클릭된 요소에 active 클래스 추가/제거
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });
    //각 목록에 지정한 10가지 색상 중 랜덤한 값이 들어가게 만들기.
    // 1. 10가지 색상 배열 만들기
    const colors=['#FFC061','#D4ADFB','#97E285','#fd7f7f','#1A70D6','#7BD0FF','#C8C8C8','#BADCE3','#AFA18E','#ECCCCF'];

    // 2. 모든 .card 클래스 요소 선택하기(일차별 색상)
    const cards = document.querySelectorAll('.card');
    // 3. 각 .card 요소 내부의 모든 ul 태그 선택하기
    cards.forEach(card => {
        const uls = card.querySelectorAll('ul');
        // 4. 각 ul 태그에 랜덤으로 선택된 색상 적용하기
        uls.forEach(ul => {
            ul.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        });
    });

};
