// 장소 검색 시 해당 장소 화면에 띄우기
function searchAndDisplay() {
    let searchText = document.getElementById('searchInput').value.trim(); // 검색창의 입력값 가져오기
    let searchResultElement = document.getElementById('searchResult');

    if (searchText !== '') {
        let message = searchText + '<span class="highlight-text"> 주변</span>';
        searchResultElement.innerHTML = message;
    } else {
        searchResultElement.textContent = '검색어를 입력해주세요.'; // 검색어가 없는 경우 메시지 출력
    }
}

// 초기 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    const banners = document.querySelector('.banners');
    banners.style.display = 'none'; // 초기에 숨김 처리

    // 각 배너 버튼에 클릭 이벤트 리스너 추가
    const bannerButtons = document.querySelectorAll('.banner');
    bannerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 배너 이미지를 원래 상태로 되돌리기
            bannerButtons.forEach(btn => {
                const img = btn.querySelector('img');
                const src = img.src;
                if (src.includes('_after.png')) {
                    img.src = src.replace('_after.png', '.png');
                }
            });

            // 클릭한 배너 이미지 토글
            const img = this.querySelector('img');
            const src = img.src;
            if (src.includes('_after.png')) {
                img.src = src.replace('_after.png', '.png');
            } else {
                img.src = src.replace('.png', '_after.png');
            }
        });
    });

    // Kakao Map 초기화 및 검색 함수
    var placeData = [];
    var markers = [];

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    var ps = new kakao.maps.services.Places();
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    searchPlaces();
});

// 배너 클릭 시 banners 토글
function toggleBanners() {
    const banners = document.querySelector('.banners');
    banners.classList.toggle('active');
}
// 장소 검색 시 배너 보이기
function toggleBanners(button) {
    const banners = document.querySelector('.banners');
    const isVisible = banners.style.display === 'flex';

    if (isVisible) {
        banners.style.display = 'none';
    } else {
        banners.style.display = 'flex';
    }
}

// 배너 클릭 시 배너 색 채우기
function toggleBannerfill(button) {
    const filledImage = button.querySelector('img');
    const isfilled = filledImage.src.includes('after');

    if (isfilled) {
        filledImage.src = 'images/icon_save_before.png';
    } else {
        saveImage.src = 'images/icon_save_after.png';
    }
}

// 장소 검색 시 배너 보이기
function toggleList(button) {
    const list = document.querySelector('.bg_white');
    const isVisible2 = bg_white.style.display === 'flex';

    if (isVisible2) {
        bg_white.style.display = 'none';
    } else {
        bg_white.style.display = 'flex';
    }
}



function searchPlaces() {
    var keyword = $('#searchInput').val() === undefined ? "" : $('#searchInput').val();

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    $("#searchInput").val(keyword);
    ps.keywordSearch(keyword, placesSearchCB, { radius : 500 });
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        if (data.length > 0) {
            for (let idx in data) {
                placeData.push(data[idx]);
            }
        }

        displayPlaces(data);
        printResult(placeData);
        displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
    }
}

function displayPlaces(places) {
    var listEl = document.getElementById('placesList'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();

    removeAllChildNods(listEl);
    removeMarker();

    for ( var i=0; i<places.length; i++ ) {
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

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

    listEl.appendChild(fragment);
    map.setBounds(bounds);
}

function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }
    markers = [];
}

function addMarker(position, idx) {


    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
        imageSize = new kakao.maps.Size(36, 37),
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691),
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10),
            offset: new kakao.maps.Point(13, 37)
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position,
            image: markerImage
        });

    marker.setMap(map);
    markers.push(marker);

    return marker;
}