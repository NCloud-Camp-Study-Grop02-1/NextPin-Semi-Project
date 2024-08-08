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
});

// 사용자 정보 가져오기 함수
document.addEventListener('DOMContentLoaded', function() {
    function fetchUserInfo() {
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
                    alert("로그인이 필요합니다.");
                }
            },
            error: function (error) {
                console.log("Error fetching user info: ", error);
            }
        });
    }
    // 사용자 정보 가져오기 함수 호출
    fetchUserInfo();
})

$(document).ready(function() {
    // Confirm 버튼 클릭 시 코스 생성 또는 업데이트
    $('#confirmButton').click(function() {
        const selectedDate = $('#testDatepicker').val();
        const memoActive = $('#memo-active').is(':checked');
        const selectedMemo = memoActive ? $('#memo-text').val() : '';
        const selectedColor = $('.color-button.selected').css('background-color');
        const placeName = $('#locationTitle').text();
        const courseName = $('#myCourse option:selected').text();
        const coordinateX = $('#coordinateX').text();
        const coordinateY = $('#coordinateY').text();

        console.log("Selected Course Name: ", courseName);

        if (selectedDate && selectedColor && placeName) {
            $.ajax({
                type: 'POST',
                url: '/createOrUpdateCourse',
                contentType: 'application/json',
                data: JSON.stringify({
                    courseName: courseName,
                    userId: userId, // 전역 변수 사용
                    nickname: nickname, // 전역 변수 사용
                    color: selectedColor,
                    courseDetail: {
                        location: placeName,
                        visitDate: selectedDate,
                        memo: selectedMemo,
                        x: parseFloat(coordinateX),
                        y: parseFloat(coordinateY)
                    }
                }),
                success: function(response) {
                    if (response.status === 'error') {
                        alert(response.message);
                        return;
                    }

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

    // 닫기 버튼 클릭 시 코스 생성 창 닫기
    $('#close_icon').click(function() {
        $('#makeCourse').removeClass('show');
        $('#newCoursePanel').addClass('hidden');
    });

    // 페이지 로드 시 사용자 코스 목록 불러오기
    $.ajax({
        type: 'GET',
        url: '/getCoursesByUserId',
        success: function(courseNames) {
            console.log("Fetched courses: ", courseNames);
            populateCourseSelect(courseNames);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching courses:", status, error);
            alert('코스 정보를 가져오는 데 실패하였습니다.');
        }
    });
});

// 코스 선택 드롭다운에 코스 추가
function populateCourseSelect(courses) {
    const myCourseSelect = $('#myCourse');
    const dayCourseH3 = $('.dayCourse h3');
    const newCourseInput = $('<input type="text" class="newCourseName" id="newCourseName" placeholder="새로운 코스 이름을 입력하세요.">');

    myCourseSelect.empty();
    myCourseSelect.append('<option value="newCourse">새 코스</option>');
    myCourseSelect.after(newCourseInput);

    courses.forEach(course => {
        myCourseSelect.append(`<option value="${course}">${course}</option>`);
    });

    // Initially show the input field and hide it if a non-newCourse option is selected
    newCourseInput.show();

    myCourseSelect.on('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value === 'newCourse') {
            newCourseInput.show();
            dayCourseH3.text('새 코스');
        } else {
            newCourseInput.hide();
            dayCourseH3.text(selectedOption.text);
        }
    });

    newCourseInput.on('input', function() {
        dayCourseH3.text($(this).val() || '새 코스');
    });

    newCourseInput.on('blur', function() {
        if ($(this).val().trim() !== '') {
            addNewCourse($(this).val().trim());
        }
    });
}

function addNewCourse(newCourseName) {
    const myCourseSelect = $('#myCourse');
    let courseName = newCourseName;
    let suffix = 0;
    const options = Array.from(myCourseSelect[0].options).map(option => option.text);

    while (options.includes(courseName)) {
        suffix++;
        courseName = `${newCourseName}(${suffix})`;
    }

    const newOption = $('<option>', {
        value: courseName,
        text: courseName
    });

    myCourseSelect.append(newOption);
    myCourseSelect.val(courseName);
    $('#newCourseName').hide().val('');
    $('.dayCourse h3').text(courseName);
}

// 기존 코스에 장소 입력 후, 기존 코스 불러오기
function fetchExistingCourses(courseName, selectedColor) {
    $.ajax({
        type: 'GET',
        url: '/getCourseDetails',
        data: { courseName: courseName },
        success: function(response) {
            if (response.status === 'success') {
                console.log("Fetched course details: ", response.courseList); // 추가된 로그
                $('.dayCourse').css('border-color', selectedColor);
                $('#newCoursePanel h3').text(courseName);
                updateCourseList(response.courseList, selectedColor);
                $('#makeCourse').removeClass('show');
                $('#newCoursePanel').removeClass('hidden');
            } else {
                alert(response.message);
            }
        },
        error: function(xhr, status, error) {
            alert('기존 코스를 불러오는 데 실패하였습니다. 다시 시도해주세요.');
        }
    });
}

// 코스 리스트 업데이트
function updateCourseList(courseList, selectedColor) {
    const courseListContainer = $('#selectedColor');
    courseListContainer.empty();

    if (!Array.isArray(courseList) || courseList.length === 0) {
        console.error("Invalid courseList:", courseList);
        return;
    }

    const groupedByDate = courseList.reduce((acc, course) => {
        const date = new Date(course.visitDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\./g, '').replace(/\s/g, '/'); // 'yyyy/mm/dd' 형식으로 변환
        if (!acc[date]) acc[date] = [];
        acc[date].push(course);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));

    sortedDates.forEach((date, index) => {
        const dayTitle = `<p><strong style="border: 2px solid white; border-radius: 5px; padding: 5px 8px;">${index + 1}일차</strong>&nbsp;&nbsp;${date}</p>`;
        let dayBox = `<div class="courseDayBox" style="background-color: ${selectedColor};">${dayTitle}`;

        groupedByDate[date].forEach(course => {
            let courseInfo = `<div class="courseListItem"><p><strong>${course.location}</strong></p>`;
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

// 핀 선택시 코스 생성 창 나오기
document.addEventListener('DOMContentLoaded', () => {
    const chosenpinBtn = document.getElementById('chosenPin');
    const makeCourse = document.getElementById('makeCourse');


    chosenpinBtn.addEventListener('click', () => {
        const isExpanded = chosenpinBtn.getAttribute('aria-expanded') === 'true';
        chosenpinBtn.setAttribute('aria-expanded', !isExpanded);
        makeCourse.classList.toggle('show', !isExpanded);
        $('#newCoursePanel').addClass('hidden');
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

// // 코스 이름 선택 창
// document.addEventListener('DOMContentLoaded', function() {
//     const myCourseSelect = document.getElementById('myCourse');
//     const dayCourseH3 = document.querySelector('.dayCourse h3');
//
//     myCourseSelect.addEventListener('change', function() {
//         const selectedOption = this.options[this.selectedIndex];
//         if (selectedOption.value === 'newCourse') {
//             dayCourseH3.textContent = '새 코스';
//         } else {
//             dayCourseH3.textContent = selectedOption.text;
//         }
//     });
// });

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
    // console.log(++i + "번째 실행");
    // console.log(data);
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

        console.log(JSON.stringify(places[i]));
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
        })(marker, places[i].placeName);

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
function addMarker(position, idx, title, category) {
    // console.log("marker image 설정전 카테고리 확인 : " + category);
    let imageSrc = '../images/icons/food_map_icon.png'; // 마커 이미지 url
    if (category === 'food') {
        imageSrc = '../images/icons/food_map_icon.png';
    } else if (category === 'cafe') {
        imageSrc = '../images/icons/cafe_map_icon.png';
    } else if (category === 'tour') {
        imageSrc = '../images/icons/tour_map_icon.png';
    } else if (category === 'hotel') {
        imageSrc = '../images/icons/hotel_map_icon.png';
    }

    let imageSize = new kakao.maps.Size(50, 50);  // 마커 이미지의 크기
    let imageOption = {offset: new kakao.maps.Point(16, 16)}; // 사용되지 않았던 변수
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption); // <- imageOption을 추가
    let marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
}

document.addEventListener('DOMContentLoaded', function () {
    // 좌표와 카테고리를 HTML에서 가져옵니다
    var coordinateX = parseFloat(document.getElementById('coordinateX').innerText);
    var coordinateY = parseFloat(document.getElementById('coordinateY').innerText);
    var category = document.getElementById('category').innerText;

    if (!isNaN(coordinateX) && !isNaN(coordinateY)) {
        var position = new kakao.maps.LatLng(coordinateY, coordinateX);
        var idx = 0; // 예제이므로 idx와 title은 하드코딩
        var title = document.getElementById('locationTitle').innerText;

        // 지도 중심을 마커 위치로 이동합니다
        map.setCenter(position);

        // 마커를 추가합니다
        var marker = addMarker(position, idx, title, category); // <- category 인수 추가

        (function(marker, title){
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        })(marker, title);
    }
});

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

    window.onload = function () {
        searchPlaces();
        printResult();

        $("input[name=courseType][value=course_food]").prop("checked", true);
        $('#course_food_label').css('background', '#FFC061');
        $("input[name=courseType]").on("click", function () {
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

        $('#searchBtn').on("click", function () {
            searchPlaces();
        });

        const sidebar = $('.storeDetail_courseMaker');
        const sidebarToggle = $('.sidebar-toggle');
        let isExpand = false;

        sidebarToggle.on('click', () => {
            isExpand = !isExpand;
            sidebar.toggle('open');

            if (isExpand) {
                $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
                return;
            }

            $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
            // sidebarContainer.classList.toggle('open');
            // sidebarArrowContainer.classList.toggle('open');
        });

        $('#homeTab').on('click', function () {
            $('#homeTab').attr('aria-selected', true);
            $('#reviewTab').attr('aria-selected', false);
            $('#homeContents').css('display', 'flex');
            $('#reviewContents').css('display', 'none');
        });

        $('#reviewTab').on('click', function () {
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

    $('#inputPlace').on("keypress", function (event) {
        if (event.which === 13) { // 13 is the key code for Enter
            event.preventDefault();
            performSearch();
        }
    });

