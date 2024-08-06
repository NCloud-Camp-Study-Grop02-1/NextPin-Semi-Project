$(function() {
    $("#testDatepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['일','월','화','수','목','금','토'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        showButtonPanel: true,
        showMonthAfterYear:true,
        dateFormat: "yy/mm/dd",
        beforeShow: function(input, inst) {
            var sidebarWidth = $('#side-bar').outerWidth();
            inst.dpDiv.css({ marginLeft: sidebarWidth }); // 사이드바 너비만큼 왼쪽으로 이동
        }
    });
<<<<<<< HEAD
=======

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
>>>>>>> origin/backend/Yubin
});

// 핀 선택시 코스 생성 창 나오기
document.addEventListener('DOMContentLoaded', () => {
    const chosenpinBtn = document.getElementById('chosenPin');
    const makeCourse = document.getElementById('makeCourse');

    chosenpinBtn.addEventListener('click', () => {
        const img = chosenpinBtn.querySelector('img');
        if (img.src.includes("locationPin-before_icon.png")) {
            const isExpanded = chosenpinBtn.getAttribute('aria-expanded') === 'true';
            chosenpinBtn.setAttribute('aria-expanded', !isExpanded);
            makeCourse.classList.toggle('show', !isExpanded);
            $('#newCoursePanel').addClass('hidden');
            $('#sub_panel').css('display', 'block'); // sub_panel을 보이게 함
        } else {
            $('#sub_panel').css('display', 'none'); // sub_panel을 숨김
        }
    });
});

$(document).ready(function() {
    $('#confirmButton').click(function() {
        const selectedDate = $('#testDatepicker').val();
        const memoActive = $('#memo-active').is(':checked');
        const selectedMemo = memoActive ? $('#memo-text').val() : '';
        const selectedColor = $('.color-button.selected').css('background-color');
        const placeName = $('#locationTitle').text();
        const courseName = $('#myCourse option:selected').text(); // 선택된 코스의 텍스트 값 가져오기

        console.log("Selected Course Name: ", courseName); // 디버깅용 로그

        if (selectedDate && selectedColor && placeName) {
            $.ajax({
                type: 'POST',
                url: '/createOrUpdateCourse',
                contentType: 'application/json',
                data: JSON.stringify({
                    courseName: courseName,
                    userId: "song",
                    nickname: "오레오",
                    color: selectedColor,
                    courseDetail: {
                        location: placeName,
                        visitDate: selectedDate,
                        memo: selectedMemo
                    }
                }),
                success: function(response) {
                    if (response.status === 'error') {
                        alert(response.message);
                        return;
                    }

                    // 장소 저장 후, 기존 코스를 불러옴
                    fetchExistingCourses(courseName, selectedColor);
                },
                error: function(xhr, status, error) {
                    alert('코스 생성에 실패하였습니다. 다시 시도해주세요.');
                }
            });
        } else {
            alert('날짜와 색상은 필수 선택 항목입니다.');
        }
    });

    // 코스 이름 선택 창
    const myCourseSelect = document.getElementById('myCourse');
    const dayCourseH3 = document.querySelector('.dayCourse h3');

    myCourseSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value === 'newCourse') {
            dayCourseH3.textContent = '새 코스';
        } else {
            dayCourseH3.textContent = selectedOption.text;
        }
    });

    // 삭제 확인 창 요소
    const deleteConfirmationDialog = $('#deleteConfirmationDialog');
    const overlay = $('#overlay');
    const confirmDeleteButton = $('#confirmDeleteButton');
    const cancelDeleteButton = $('#cancelDeleteButton');

    // chosenPin 클릭 이벤트 핸들러
    $('#chosenPin').click(function() {
        const img = $(this).find('img');
        const placeName = $('#locationTitle').text();
        const courseName = $('#myCourse option:selected').text();

        if (img.attr('src') === '../images/icons/locationPin-after_icon.png') {
            // 확인 창 및 배경 표시
            overlay.show();
            deleteConfirmationDialog.show();
            $('#sub_panel').css('display', 'none'); // sub_panel을 항상 숨김

            // 삭제 버튼 클릭 이벤트 핸들러
            confirmDeleteButton.off('click').on('click', function() {
                // 장소 삭제 요청
                $.ajax({
                    type: 'POST',
                    url: '/deleteCourseDetail',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        courseName: courseName,
                        userId: "song", // 사용자 ID를 동적으로 설정해야 할 수도 있음
                        location: placeName
                    }),
                    success: function(response) {
                        if (response.status === 'error') {
                            alert(response.message);
                            return;
                        }

                        alert('장소가 성공적으로 삭제되었습니다.');
                        img.attr('src', '../images/icons/locationPin-before_icon.png');
                        $('#new-panel').hide();
                        $('#sub_panel').hide();
                        deleteConfirmationDialog.hide();
                        overlay.hide();
                    },
                    error: function(xhr, status, error) {
                        alert('장소 삭제에 실패하였습니다. 다시 시도해주세요.');
                        deleteConfirmationDialog.hide();
                        overlay.hide();
                    }
                });
            });

            // 취소 버튼 클릭 이벤트 핸들러
            cancelDeleteButton.off('click').on('click', function() {
                deleteConfirmationDialog.hide();
                overlay.hide();
            });
        } else if (img.attr('src') === '../images/icons/locationPin-before_icon.png') {
            img.attr('src', '../images/icons/locationPin-after_icon.png');
            $('#new-panel').show(); // new_panel을 보이게 함
            $('#sub_panel').css('display', 'none'); // sub_panel을 숨김
        }
    });

    // 처음에 img 태그의 src가 "locationPin-before_icon.png" 일 경우 알림창 숨기기
    if ($('#chosenPin img').attr('src') === '../images/icons/locationPin-before_icon.png') {
        deleteConfirmationDialog.hide();
        overlay.hide();
    }
});

function fetchExistingCourses(courseName, selectedColor) {
    $.ajax({
        type: 'GET',
        url: '/getCourseDetails', // 서버에서 코스 상세 정보를 가져오는 엔드포인트
        data: { courseName: courseName, userId: 'song' }, // 필요한 파라미터 전달
        success: function(response) {
            $('.dayCourse').css('border-color', selectedColor);

            // 코스 이름과 리스트 업데이트
            $('#newCoursePanel h3').text(courseName);
            updateCourseList(response.courseList, selectedColor);

            $('#makeCourse').removeClass('show');
            $('#newCoursePanel').removeClass('hidden');
        },
        error: function(xhr, status, error) {
            alert('기존 코스를 불러오는 데 실패하였습니다. 다시 시도해주세요.');
        }
    });
}

function updateCourseList(courseList, selectedColor) {
    const courseListContainer = $('#selectedColor');
    courseListContainer.empty();

    // visitDate를 기준으로 그룹화
    const groupedByDate = courseList.reduce((acc, course) => {
        const date = course.visitDate;
        if (!acc[date]) acc[date] = [];
        acc[date].push(course);
        return acc;
    }, {});

    // 그룹화된 데이터를 visitDate 오름차순으로 정렬
    const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));

    // 정렬된 날짜를 사용하여 courseListContainer 업데이트
    sortedDates.forEach((date, index) => {
        const dayTitle = `<p><strong style="border: 2px solid white; border-radius: 5px; padding: 5px 8px;">${index + 1}일차</strong>&nbsp;&nbsp;${date}</p>`;
        let dayBox = `<div class="courseDayBox" style="background-color: ${selectedColor};">${dayTitle}`;

        groupedByDate[date].forEach(course => {
            let courseInfo = `
                <div class="courseListItem">
                    <p><strong>${course.location}</strong></p>
            `;
            if (course.memo) {
                courseInfo += `<p class="courseMemo">&nbsp;&nbsp;&nbsp;ㄴ메모: ${course.memo}</p>`;
            }
            courseInfo += '</div>';
            dayBox += courseInfo;
        });

        dayBox += '</div>';
        courseListContainer.append(dayBox);
    });
}

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
    ps.keywordSearch(keyword, placesSearchCB, {
        radius: 500 // 반경범위 미터 단위(0m ~ 20000m)
        // ,location: new kakao.maps.LatLng(37.566826, 126.9786567)
    });
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        if (data) {
            if (data.length > 0) {
                for (let idx in data) {
                    placeData.push(data[idx]);
                }
            }
        }

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        printResult(placeData);

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
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('courseDetail'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {
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

            itemEl.onmouseover = function() {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function() {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    // listEl.appendChild(fragment);

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
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
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
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
        el.removeChild(el.lastChild);
    }
}

window.onload = function() {
    searchPlaces();
    // printResult();
    console.log($('#hiddenValue').text());

    let loadData = '';
    if($('#hiddenValue').text() !== undefined || $('#hiddenValue').text() !== ''){
        loadData = JSON.parse($('#hiddenValue').text());
    }

    console.log(loadData);

    // 데이터 채우기
    $('#locationTitle').text(loadData['data']['placeName']);
    $('#foodType').text(loadData['data']['categoryName']);
    $('#reviewScore').text('★ ' + loadData['data']['score']);

    $('#locationAddress').text(loadData['data']['addressName']);
    $('#streetNumber').text('지번 | ' + loadData['data']['roadAddressName']);

    let businessHour = loadData['data']['businessHour'].split('·')[0];
    let breakTime = loadData['data']['businessHour'].split('·')[1];
    $('#businessHour').text(businessHour);
    $('#breakTime').text(breakTime);

    $('#locationPhone').text(loadData['data']['phone']);

    $("input[name=courseType][value=course_food]").prop("checked", true);
    $('#course_food_label').css('background', '#FFC061');
    $("input[name=courseType]").on("click", function() {
        // 맛집 선택시
        if ($(this).attr('id') === 'course_food') {
            if ($(this).is(':checked')) {
                $('#course_food_label').css('background', '#FFC061');
                $('#course_caffe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#fff');
            }
        }
        // 카페 선택시
        else if ($(this).attr('id') === 'course_caffe') {
            if ($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_caffe_label').css('background', '#FAB7B7');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#fff');
            }
        }
        // 관광지 선택시
        else if ($(this).attr('id') === 'course_tour') {
            if ($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_caffe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#96E781');
                $('#course_rest_label').css('background', '#fff');
            }
        }
        // 숙소 선택시
        else if ($(this).attr('id') === 'course_rest') {
            if ($(this).is(':checked')) {
                $('#course_food_label').css('background', '#fff');
                $('#course_caffe_label').css('background', '#fff');
                $('#course_tour_label').css('background', '#fff');
                $('#course_rest_label').css('background', '#D7AFFF');
            }
        }
        // console.log(this);
    });

    $('#searchBtn').on("click", function() {
        searchPlaces();
    });

    const sidebar = $('.storeDetail_courseMaker');
    const sidebarToggle = $('.sidebar-toggle');
    let isExpand = false;

    sidebarToggle.on('click', () => {
        isExpand = !isExpand;
        sidebar.toggle('open');

        if (isExpand) {
            $('.sidebar-toggle img').css({ 'transform': 'rotate(180deg)' });
            return;
        }

        $('.sidebar-toggle img').css({ 'transform': 'rotate(0deg)' });
        // sidebarContainer.classList.toggle('open');
        // sidebarArrowContainer.classList.toggle('open');
    });

    $('#homeTab').on('click', function() {
        $('#homeTab').attr('aria-selected', true);
        $('#reviewTab').attr('aria-selected', false);
        $('#homeContents').css('display', 'flex');
        $('#reviewContents').css('display', 'none');
    });

    $('#reviewTab').on('click', function() {
        $('#reviewTab').attr('aria-selected', true);
        $('#homeTab').attr('aria-selected', false);
        $('#homeContents').css('display', 'none');
        $('#reviewContents').css('display', 'block');
    });
};

// 장소 검색 시 mainCourse 페이지로 넘어가게 하기
function performSearch() {
    var searchTerm = $('#inputPlace').val();
    localStorage.setItem('searchTerm', searchTerm);
    window.location.href = '/mainCourse';
}

$('#searchBtn').on("click", performSearch);

$('#inputPlace').on("keypress", function(event) {
    if (event.which === 13) { // 13 is the key code for Enter
        event.preventDefault();
        performSearch();
    }
});

// 핀 해제 시 장소 삭제 함수
function removeCourseDetail() {
    const placeName = $('#locationTitle').text();
    const courseName = $('#myCourse option:selected').text();

    $.ajax({
        type: 'POST',
        url: '/removeCourseDetail',
        contentType: 'application/json',
        data: JSON.stringify({
            courseName: courseName,
            userId: "song",
            location: placeName
        }),
        success: function(response) {
            if (response.status === 'success') {
                alert('장소가 성공적으로 삭제되었습니다.');
                fetchExistingCourses(courseName, $('.color-button.selected').css('background-color'));
            } else {
                alert(response.message);
            }
        },
        error: function(xhr, status, error) {
            alert('장소 삭제에 실패하였습니다. 다시 시도해주세요.');
        }
    });
}