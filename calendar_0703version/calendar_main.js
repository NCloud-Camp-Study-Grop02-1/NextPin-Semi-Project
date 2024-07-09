document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const todayButton = document.getElementById('today');

    const calendarPanel = document.getElementById('calendar-panel');
    const panelTitle = document.getElementById('panel-title');
    const panelContent = document.getElementById('panel-content');
    const cardBody = document.querySelector('.card.card-body');

    // 날짜 얻어오기
    let date = new Date();
    date.setDate(1);
    let selectedDateElement = null;
    let todayDateElement = null; // 오늘 날짜 요소를 저장할 변수

    // 캘린더를 그려주는 function
    function renderCalendar() {
        calendar.innerHTML = '';
        const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
        for (let i = 0; i < daysOfWeek.length; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('header');
            dayElement.textContent = daysOfWeek[i];
            calendar.appendChild(dayElement);

            // 토요일과 일요일의 폰트 색상 설정
            if (i === 5) { // 토요일
                dayElement.classList.add('saturday');
            } else if (i === 6) { // 일요일
                dayElement.classList.add('sunday');
            }
        }

        const month = date.getMonth();
        const year = date.getFullYear();

        currentMonthYear.textContent = `${year}.${(month + 1).toString().padStart(2, '0')}`;

        const firstDay = (date.getDay() + 6) % 7;
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 이전 달의 마지막 날짜
        const prevLastDate = new Date(year, month, 0).getDate();

        // 이전 달 날짜 추가
        for (let i = 0; i < firstDay; i++) {
            const prevDateElement = document.createElement('div');
            prevDateElement.classList.add('day', 'prev-month');
            prevDateElement.textContent = prevLastDate - firstDay + i + 1;
            calendar.appendChild(prevDateElement);
        }

        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        for (let day = 1; day <= lastDate; day++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('day');
            dateElement.textContent = day;
            calendar.appendChild(dateElement);

            const currentDayOfWeek = (firstDay + day - 1) % 7;

            // 토요일과 일요일 날짜의 폰트 색상 설정
            if (currentDayOfWeek === 5) { // 토요일
                dateElement.classList.add('saturday');
            } else if (currentDayOfWeek === 6) { // 일요일
                dateElement.classList.add('sunday');
            }

            // 특정 날짜에 텍스트 추가
            // 2024년 7월 27일~28일에 텍스트 추가, 
            // month는 0부터 시작하기 때문에 6으로 설정
            if (day === 27 && month == 6 && year == 2024 || day == 28 && month == 6 && year == 2024) {
                const userSchedule = document.createElement('div');
                userSchedule.textContent = "1박 2일 강남여행";
                userSchedule.style.fontSize = "15px";
                userSchedule.style.background = "#eccccf"; // 텍스트 색상 변경 가능
                userSchedule.style.color = "#ffffff";
                userSchedule.style.marginTop = "15px";
                userSchedule.style.padding = "5px 0 5px 0";
                dateElement.classList.add('userSchedule');
                dateElement.appendChild(userSchedule);

                userSchedule.addEventListener("click", () => {
                    calendarPanel.style.display = 'block';
                });
            } 
            

            if (day === todayDate && month === todayMonth && year === todayYear) {
                // 오늘 날짜를 강조하는 border 설정, 대표색
                dateElement.style.border = "1px solid #007bff";
                todayDateElement = dateElement; // 오늘 날짜 요소를 저장
            }

            // mouseover 이벤트 #ddd -> 파랑
            dateElement.addEventListener("mouseover", () => {
                dateElement.style.border = "1px solid #007bff";
            });

            // mouseout 이벤트 파랑-> #ddd
            dateElement.addEventListener("mouseout", () => {
                if (!(day === todayDate && month === todayMonth && year === todayYear) && dateElement !== selectedDateElement) {
                    dateElement.style.border = "1px solid #ddd";
                }
            });

            // click 이벤트
            // 1. 해당 날짜를 클릭하고 다른 날짜를 클릭했을 때 #ddd로 다시 돌아오게 만들기
            // 2. 7월 27일과 28일의 코스를 선택했을 때 calendar Panel display를 block으로,
            //    다른 날짜를 클릭하면 display를 none으로 바꿈
            dateElement.addEventListener("click", () => {
                if (selectedDateElement && selectedDateElement !== dateElement) {
                    if (selectedDateElement === todayDateElement) {
                        todayDateElement.style.border = "1px solid #007bff";
                    } else {
                        selectedDateElement.style.border = "1px solid #ddd";
                    }
                }
                if (dateElement === todayDateElement) {
                    todayDateElement.style.border = "1px solid #FFC061";
                } 
                else {
                    dateElement.style.border = "1px solid #FFC061";
                }
                selectedDateElement = dateElement;

                if (day === 27 && month == 6 && year == 2024 ) {
                    displayContent1();

                } 
                else if(day == 28 && month == 6 && year == 2024){
                    displayContent2();
                }
                else {
                    calendarPanel.style.display = 'none';
                }
            });
        }

        // 다음 달 날짜 추가
        const totalCells = firstDay + lastDate;
        const nextMonthDays = (7 - (totalCells % 7)) % 7; // 다음 달 날짜 표시할 수 있는 셀 수

        // 다음달 날짜 반복문
        for (let i = 1; i <= nextMonthDays; i++) {
            const nextDateElement = document.createElement('div');
            nextDateElement.classList.add('day', 'next-month');
            nextDateElement.textContent = i;
            calendar.appendChild(nextDateElement);
        }

    }

    function displayContent1() {
        panelTitle.textContent = `1일차`;
        cardBody.innerHTML = '';

        const ul1 = document.createElement('ul');
        const items1 = ['00음식점', '00카페', '00전시회', '00가게'];
        items1.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;

            if(items1[0]){
                const memo = document.createElement('span');
                memo.classList.add('memo');
                memo.textContent = '12시 예약'
                li.appendChild(memo);
            }

            ul1.appendChild(li);

        });
        cardBody.appendChild(ul1);
        panelContent.style.display = 'block';
    }

    function displayContent2() {
        panelTitle.textContent = `2일차`;
        cardBody.innerHTML = '';
        
        const ul2 = document.createElement('ul');
        const items2 = ['00음식점', '00카페', '00전시회', '00가게'];
        items2.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul2.appendChild(li);
        });
        cardBody.appendChild(ul2);
        panelContent.style.display = 'block';
    }

    // let api_url = `http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${4872637a8788d0b9b7a84adebed8aea5}`;

    // function getData() {
    // fetch(api_url)     	// Promise<Response>반환  -> res로 전달
    // .then(function(res) {       
    //     return res.json()			// json() 메서드 적용  -> json으로 전달
    // })
    // .then(function(json) {
    //     renderWeatherData(json);		// json형태의 데이터를 다른함수로 넘겨줌
    // });
    // }

    function renderWeatherData(data) {
    let now = new Date(); 
    changeIcon(data);  
    }

    // 이전 달 버튼 click 이벤트
    prevButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    // 다음달 버튼 click 이벤트
    nextButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    // 오늘 날짜 버튼 click 이벤트
    todayButton.addEventListener('click', () => {
        date = new Date();
        date.setDate(1);
        renderCalendar();
        if (selectedDateElement) {
            selectedDateElement.style.border = "1px solid #007bff";
            selectedDateElement = null;
        }
        calendarPanel.style.display = 'none';
    });

    // 다른 날짜를 클릭했을 때, calendal의 다른 곳을 클릭했을 때 calendar Panel의 display를 
    // none으로 만들기
    document.addEventListener("click", (event) => {
        const withinBoundaries = event.composedPath().includes(calendarPanel) || event.composedPath().includes(calendar);
        if (!withinBoundaries) {
            calendarPanel.style.display = 'none';
        }
    });

    renderCalendar(); // 페이지 로드 시 달력 초기화
});
