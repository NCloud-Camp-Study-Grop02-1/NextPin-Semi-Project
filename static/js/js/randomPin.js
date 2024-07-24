    document.getElementById('random-icon').addEventListener('click', function (e) {
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
            searchPlaces();
        }
    }



    function searchPlaces() {
        var keyword = document.querySelector('.modal-content input[type="text"]').value;
        // console.log(document.querySelector("#menu_wrap"));


        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        // Show the loading spinner and hide the modal content
        document.getElementById('loading-spinner').style.display = 'flex';
        document.getElementById('modal-cont').style.display = 'none';

        setTimeout(function () {
            document.querySelector("#courseDetail").style.display = "block";
            document.querySelector("#inputPlace").value = keyword;
        }, 3000); // Adjust the delay time as needed (in milliseconds)

        // Perform the search after a delay
        setTimeout(function () {
            ps.keywordSearch(keyword, placesSearchCB, { radius: 500 });
        }, 3000); // Adjust the delay time as needed (in milliseconds)


    }

    function placesSearchCB(data, status, pagination) {
        // Hide the loading spinner after the search completes
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('modal-cont').style.display = 'none';

        if (status === kakao.maps.services.Status.OK) {
            // Shuffle the array
            shuffleArray(data);

            // Select the first 4 elements
            var selectedData = data.slice(0, 4);
            console.log(selectedData);
            displayPlaces(selectedData);
            displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
        }
    }

    function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
    }

    function displayPlaces(places) {
        var bounds = new kakao.maps.LatLngBounds(),
            listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('courseDetail'),
            fragment = document.createDocumentFragment();

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);
        var linePath = [];
        removeMarker();
        removePolyline();

        for (var i = 0; i < places.length; i++) {
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
            bounds.extend(placePosition);
            linePath.push(placePosition);

            (function (marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });
            })(marker, places[i].place_name);

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

    function addMarker(position, idx, title) {
        var markerImage = new kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
            new kakao.maps.Size(36, 37),
            { spriteSize: new kakao.maps.Size(36, 691), spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), offset: new kakao.maps.Point(13, 37) }
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

    function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i === pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function (i) {
                    return function () {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }