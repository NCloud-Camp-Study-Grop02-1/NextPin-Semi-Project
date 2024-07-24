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

    var keyword = $('#searchInput').val() === undefined ? "" : $('#searchInput').val();

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    $("#searchInput").val(keyword);
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
    console.log(data);
    console.log("print placeData : " + placeData);
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
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
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' +  places.address_name  + '</span>';
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





// 검색 입력 값에 따라 항목을 필터링하는 함수
function filterItems() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    // .mypin-content 내의 항목을 필터링
    const myPinItems = document.querySelectorAll('.mypin-content .container');
    myPinItems.forEach(item => {
        const value = item.querySelector('input').value.toLowerCase();
        if (value.includes(searchValue)) {
            item.parentElement.style.display = 'block'; // 부모 li 요소를 표시
        } else {
            item.parentElement.style.display = 'none'; // 부모 li 요소를 숨김
        }
    });

    // .like-content 내의 항목을 필터링
    const likeItems = document.querySelectorAll('.like-content .container');
    likeItems.forEach(item => {
        const value = item.querySelector('input').value.toLowerCase();
        if (value.includes(searchValue)) {
            item.parentElement.style.display = 'block'; // 부모 li 요소를 표시
        } else {
            item.parentElement.style.display = 'none'; // 부모 li 요소를 숨김
        }
    });
}

// 검색 입력 창에 이벤트 리스너 추가
document.getElementById('searchInput').addEventListener('input', filterItems);














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

    $('#searchBtn').on("click", function(){
        searchPlaces();
    });

    //사이드 네브바 열고 닫는 기능 구현
    const sidebar = $('.side-navbar');
    const sidebarToggle = $('.sidebar-toggle');
    let isExpand = false;

    sidebarToggle.on('click', () => {
        isExpand = !isExpand;
        sidebar.toggleClass('collapsed'); /* 여기 수정했당 */
        $('.map_wrap').toggleClass('expanded'); /* 여기 수정했당 */
        sidebar.toggle('open');

        if(isExpand) {
            $('.sidebar-toggle img').css({'transform': 'rotate(180deg)'});
            return;
        }

        $('.sidebar-toggle img').css({'transform': 'rotate(0deg)'});
        // sidebarContainer.classList.toggle('open');
        // sidebarArrowContainer.classList.toggle('open');
    });

    // 공개여부,컬러편집 모달 닫기 이벤트 리스너
    document.querySelector('.close-visibility-modal-btn').onclick = closeVisibilityModal;
    document.querySelector('.close-color-modal-btn').onclick = closeColorModal;

    // 미트볼 버튼 클릭 이벤트 등록
    const meatballButtons = document.querySelectorAll('.meatball-btn');
    meatballButtons.forEach(button => {
        button.addEventListener('click', function() {
            togglePopover(this);
        });
    });
    // 팝오버창 외부 클릭시 닫기
    // 외부 클릭 시 팝오버와 컬러 팔레트 닫기
    document.addEventListener('click', function(event) {
        var popovers = document.querySelectorAll('.popover-content');
        var colorPalette = document.getElementById('colorPalette');

        popovers.forEach(popover => {
            if (!popover.contains(event.target) && !event.target.closest('.meatball-btn')) {
                popover.style.display = 'none';
            }
        });

        if (colorPalette && !colorPalette.contains(event.target) && !event.target.closest('.popover-content')) {
            colorPalette.style.display = 'none';
        }
    });


    // 회원탈퇴 모달 열기
    document.getElementById('openModalLink').onclick = function(event) {
        event.preventDefault();
        document.getElementById('settingModalContainer').style.display = 'block';
    };
    // 모달 닫기
    document.querySelectorAll('.setting-close-btn').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        };
    });

    // 회원탈퇴 확인
    document.querySelector('.setting-yes-btn').onclick = function() {
        document.getElementById('settingModalContainer').style.display = 'none';
        document.getElementById('settingFarewellModal').style.display = 'block';
    };
    // 회원탈퇴 취소
    document.querySelector('.setting-no-btn').onclick = function() {
        document.getElementById('settingModalContainer').style.display = 'none';
    };

    // 모달 외부 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    };

};



//각 목록에 지정한 10가지 색상 중 랜덤한 값이 들어가게 만들기.
// 1. 10가지 색상 배열 만들기
const colors=['#FFC061','#D4ADFB','#97E285','#fd7f7f','#1A70D6','#7BD0FF','#C8C8C8','#BADCE3','#AFA18E','#ECCCCF'];

// 2. 모든 .card 클래스 요소 선택하기(일차별 색상)
const cards = document.querySelectorAll('.card');
// 2-1. 모든 .container 클래스 요소 선택(코스별 색상)
const containers = document.querySelectorAll('.container');

// 3. 각 .card 요소 내부의 모든 ul 태그 선택하기
cards.forEach(card => {
    const uls = card.querySelectorAll('ul');
    // 4. 각 ul 태그에 랜덤으로 선택된 색상 적용하기
    uls.forEach(ul => {
        ul.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    });
});

// 3-1. 각 .container 요소 내부의 모든 ul 태그 선택하기




// 프로필 자기소개 수정하는 기능
function profileEditDescription() {
    var p = document.getElementById('profile-description');
    var textarea = document.getElementById('profile-textarea');
    var editIcon = document.querySelector('.profile-edit-icon');

    if (textarea.style.display === 'none' || textarea.style.display === '') {
        textarea.value = p.textContent;
        p.style.display = 'none';
        textarea.style.display = 'inline-block';
        textarea.focus();
        editIcon.style.position = 'fixed';
        editIcon.src = '../images/icons/save-icon-gray.png'; // Save icon when editing
    } else {
        p.textContent = textarea.value;
        p.style.display = 'inline-block';
        textarea.style.display = 'none';
        editIcon.src = '../images/icons/edit-gray_icon.png'; // Edit icon when not editing
    }
}







// 미트볼 버튼 클릭 시 팝오버창 토글 함수
function togglePopover(element) {
    var popover = element.nextElementSibling;

    // 다른 팝오버 창 닫기
    document.querySelectorAll('.popover-content').forEach(p => {
        if (p !== popover) {
            p.style.display = 'none';
        }
    });

    if (popover.style.display === "none" || popover.style.display === "") {
        popover.style.display = "flex"; // flex로 설정
        popover.style.flexDirection = "column"; // column 방향 설정
    } else {
        popover.style.display = "none";
    }
}

// 공개여부 토글 함수
function toggleVisibility(element) {
    var li = element.closest('li');
    var rockIcon = li.querySelector('.rock-icon');
    var isHidden = rockIcon.style.visibility === 'hidden';


    if (isHidden) {
        rockIcon.style.visibility = 'visible';
    } else {
        rockIcon.style.visibility = 'hidden';
    }

    closePopover(); // 팝오버 창 닫기
    openVisibilityModal();
}

// 공개 여부 모달 열기 함수
function openVisibilityModal() {
    var modal = document.getElementById('visibilityModalContainer');
    modal.style.display = 'block';
}

// 공개 여부 모달 닫기 함수
function closeVisibilityModal() {
    var modal = document.getElementById('visibilityModalContainer');
    modal.style.display = 'none';
    closePopover(); // 팝오버 창 닫기
}



// 컬러 변경 기능
function editColor(element) {
    var popover = element.closest('.popover-content');
    var colorPalette = document.getElementById('colorPalette');
    var colorButtonText = element.textContent;
    var selectedContainer = element.closest('.container');

    // 컬러 팔레트의 기존 위치 초기화
    colorPalette.style.left = '';
    colorPalette.style.top = '';

    if (colorPalette.style.display === 'none' || colorPalette.style.display === '') {
        colorPalette.style.display = 'flex';

        // 팔레트를 팝오버 오른쪽에 위치시키기
        var rect = popover.getBoundingClientRect();
        colorPalette.style.position = 'absolute';
        colorPalette.style.left = `${rect.right + 10}px`;
        colorPalette.style.top = `${rect.top}px`;

        // "컬러편집" 버튼 텍스트를 "컬러저장"으로 변경
        element.textContent = "컬러저장";

        // 기존 이벤트 리스너 제거
        colorPalette.onclick = null;

        // 컬러 버튼 클릭 이벤트 설정
        colorPalette.onclick = function(event) {
            if (event.target.classList.contains('color-button')) {
                var selectedColor = event.target.style.backgroundColor;
                selectedContainer.style.backgroundColor = selectedColor;

                // 팔레트를 숨기고 모달 열기
                colorPalette.style.display = 'none';
                element.textContent = "컬러편집";

                closePopover(); // 팝오버 창 닫기

                openColorModal(); // 모달 열기
            }
        };
    } else {
        // 팔레트를 숨기고 모달 열기
        colorPalette.style.display = 'none';
        element.textContent = "컬러편집";

        closePopover(); // 팝오버 창 닫기

        openColorModal(); // 모달 열기
    }
}

// 컬러 편집 모달 열기 함수
function openColorModal() {
    var modal = document.getElementById('colorModalContainer');
    modal.style.display = 'block';
}

// 컬러 편집 모달 닫기 함수
function closeColorModal() {
    var modal = document.getElementById('colorModalContainer');
    modal.style.display = 'none';

    closePopover(); // 팝오버 창 닫기
}

// 팝오버 창 닫기 함수
function closePopover() {
    document.querySelectorAll('.popover-content').forEach(p => {
        p.style.display = 'none';
    });
}



// 각 코스 이름을 수정하는 기능
function editDescription(icon) {
    // icon 요소의 부모 요소(container)를 가져옵니다.
    var container = icon.closest('.container');

    // container 내의 pin-description, pin-textarea 요소를 가져옵니다.
    var input = container.querySelector('.pin-description');
    var textarea = container.querySelector('.pin-textarea');
    var nameEdit = container.querySelector('.popover-item-nameEdit');
    // pin-textarea 요소가 숨겨져 있다면 (즉, 편집 모드가 아닌 경우)
    if (textarea.style.display === 'none' || textarea.style.display === '') {
        // profile-textarea 요소의 값을 항상 profile-description 요소의 value 값으로 설정합니다.
        textarea.value = input.value;
        nameEdit.textContent = '이름저장';

        // pin-description 요소를 숨기고 pin-textarea 요소를 표시합니다.
        input.style.display = 'none';
        textarea.style.display = 'block';
        textarea.spellcheck = false; // 맞춤법 검사 비활성화

        // pin-textarea 요소에 포커스를 맞춥니다.
        textarea.focus();

        // edit-icon 요소의 이미지를 "save-icon.png"로 변경합니다.
        icon.src = 'images/icons/save-icon-white.png';
    }
    // 그렇지 않다면 (즉, 편집 모드인 경우)
    else {
        // pin-description 요소의 value 값을 pin-textarea 요소의 값으로 설정합니다.
        input.value = textarea.value;
        nameEdit.textContent = '이름편집';

        // pin-description 요소를 표시하고 pin-textarea 요소를 숨깁니다.
        input.style.display = 'block';
        textarea.style.display = 'none';
        textarea.style.borderColor = 'transparent';
        textarea.style.color = 'white'

        // edit-icon 요소의 이미지를 "edit-icon.png"로 변경합니다.
        icon.src = 'images/icons/edit-white_icon.png';
    }
}



//관심있는 코스에서 저장 버튼을 누르면 캘린더가 뜨고 지정한 날짜에 저장할 수 있는 기능
let isSaved = false;
let currentIcon;

function toggleSaveState(icon) {
    currentIcon = icon;

    if (!isSaved) {
        // 캘린더 표시
        $('#calendar-container').fadeIn();
    } else {
        // 이미지 변경 및 저장 상태 업데이트
        icon.src = 'images/icons/save-before-icon.png';
        isSaved = false;

        // 모달 표시
        showModal('저장이 취소되었습니다');
    }
}

$('#save-date-button').click(function() {
    // 이미지 변경 및 저장 상태 업데이트
    if (currentIcon && !isSaved) {
        currentIcon.src = 'images/icons/save-after-icon.png';
        isSaved = true;
        showModal('캘린더에 저장되었습니다');
    } else if (currentIcon && isSaved) {
        currentIcon.src = 'images/icons/save-before-icon.png';
        isSaved = false;
        showModal('저장이 취소되었습니다');
    }

    // 캘린더 팝업 숨기기
    $('#calendar-container').fadeOut();
});

function showModal(message) {
    // 모달 메시지 설정
    $('#modal-message').text(message);

    // 모달 표시
    $('#modal-overlay').fadeIn();
    $('#calendar-modal').fadeIn();
}

$('#close-modal-button, #modal-overlay').click(function() {
    // 모달 숨기기
    $('#calendar-modal').fadeOut();
    $('#modal-overlay').fadeOut();
});






// 회원탈퇴 기능 구현
document.getElementById('openModalLink').onclick = function(event) {
    event.preventDefault();
    document.getElementById('modal').style.display = 'block';
};

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.onclick = function() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    };
});

document.querySelector('.yes-btn').onclick = function() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('farewellModal').style.display = 'block';
};

document.querySelector('.no-btn').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

document.querySelector('.close-farewell-btn').onclick = function() {
    document.getElementById('farewellModal').style.display = 'none';
};

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
};



