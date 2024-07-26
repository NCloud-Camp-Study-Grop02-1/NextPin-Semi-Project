$(function() {
    $("#testDatepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['일','월','화','수','목','금','토'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        showButtonPanel: true,
        showMonthAfterYear:true,
        dateFormat: "MM/dd",
        beforeShow: function(input, inst) {
            var sidebarWidth = $('#side-bar').outerWidth();
            inst.dpDiv.css({ marginLeft: sidebarWidth }); // 사이드바 너비만큼 왼쪽으로 이동
        }
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
        const selectedMemo = memoActive ? $('#memo-text').val() : '메모가 없습니다.';
        const selectedColor = $('.color-button.selected').css('background-color');

        $('#selectedDate').text(selectedDate);
        $('#selectedMemo').text(selectedMemo);
        $('#selectedColor').css('background-color', selectedColor);

        $('#makeCourse').removeClass('show');
        $('#newCoursePanel').removeClass('hidden');
});

// 핀 선택 시 색상 채우기
function toggleImage(button) {
    var img = button.querySelector('.icon_pin');
    var originalSrc = "../images/icons/locationPin-before_icon.png";
    var newSrc = "../images/icons/locationPin-after_icon.png";

    if (img.src.includes("locationPin-after_icon.png")) {
        img.src = originalSrc;
    } else {
        img.src = newSrc;
    }
}

// 핀 선택시 코스 생성 창 나오기
document.addEventListener('DOMContentLoaded', () => {
    const chosenpinBtn = document.getElementById('chosenPin');
    const makeCourse = document.getElementById('makeCourse');

    chosenpinBtn.addEventListener('click', () => {
        const isExpanded = chosenpinBtn.getAttribute('aria-expanded') === 'true';
        chosenpinBtn.setAttribute('aria-expanded', !isExpanded);
        makeCourse.classList.toggle('show', !isExpanded);
    });
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
$(document).ready(function() {
    // 확인 버튼 클릭 시 동작
    $('.finish-button').click(function() {
        var selectedDate = $('#testDatepicker').val();
        var selectedColor = $('.color-button.selected').css('background-color');

        if (selectedDate && selectedColor) {
            var memoText = '';
            if ($('#memo-active').is(':checked')) {
                memoText = $('#memo-text').val();
            }

            var generatedHTML = `
                <div class="generatedCourse">
                    <div class="coursebox">
                    <h3>코스 1</h3>
                    <p>${selectedDate}</p>
                    
                        <div class="generated-item" style="background-color: ${selectedColor};">
                            <h4>1일차</h4>
                            <h5>① 니뽕내뽕 강남역점</h5>
                            <p><img src="../../images/icons/edit-white_icon.png"> ${memoText}</p>
                        </div>
                     </div>
                </div>
            `;

            $('#generatedContent').html(generatedHTML);
            $('#generatedContent').show(); // #generatedContent 보이기

            // var content = document.querySelector('.content');
            // content.classList.toggle('hidden');
            // $('#content').hide(); // #content 숨기기
            // $('#generatedContent').hide(); // #content 숨기기
        } else {
            alert('날짜와 색상은 필수 선택 항목입니다.');
        }
    });

});

// 카카오맵
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

    var keyword = $('#inputPlace').val() === undefined ? "" : $('#inputPlace').val();

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    $("#inputPlace").val(keyword);
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
    console.log(data);
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
    // removeAllChildNods(listEl);

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
    // listEl.appendChild(fragment);
    // menuEl.scrollTop = 0;

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

    $('#searchBtn').on("click", function(){
        searchPlaces();
    });

    const sidebar = $('.storeDetail_wrap');
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

    $('#homeTab').on('click', function(){
        $('#homeTab').attr('aria-selected', true);
        $('#reviewTab').attr('aria-selected', false);
        $('#homeContents').css('display', 'flex');
        $('#reviewContents').css('display', 'none');
    });

    $('#reviewTab').on('click', function(){
        $('#reviewTab').attr('aria-selected', true);
        $('#homeTab').attr('aria-selected', false);
        $('#homeContents').css('display', 'none');
        $('#reviewContents').css('display', 'block');
    });
};