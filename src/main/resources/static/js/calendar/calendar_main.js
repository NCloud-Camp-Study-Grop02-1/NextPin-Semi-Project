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
    let courseTitle;

    let date = new Date();
    date.setDate(1);
    let selectedDateElement = null;
    let todayDateElement = null;

    // 데이터 로드
    fetch('/userCourseTitle')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            courseTitle = data;  // 데이터 저장
            renderCalendar();  // 캘린더 렌더링 호출
        })
        .catch(error => console.error('사용자 코스 데이터를 가져오는 중 오류 발생:', error));

            function renderCalendar() {
                const dayElements = calendar.querySelectorAll('.day, .prev-month, .next-month, .userSchedule');
                dayElements.forEach(element => element.remove());

                const month = date.getMonth();
                const year = date.getFullYear();

                currentMonthYear.textContent = `${year}.${(month + 1).toString().padStart(2, '0')}`;

                const firstDay = (date.getDay() + 6) % 7;
                const lastDate = new Date(year, month + 1, 0).getDate();
                const prevLastDate = new Date(year, month, 0).getDate();

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

                    // 날짜 요소에 data-date 속성 추가
                    const currentDate = new Date(year, month, day);
                    const dayString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
                    dateElement.setAttribute('data-date', dayString);
                    calendar.appendChild(dateElement);

                    const currentDayOfWeek = (firstDay + day - 1) % 7;

                    if (currentDayOfWeek === 5) {
                        dateElement.classList.add('saturday');
                    } else if (currentDayOfWeek === 6) {
                        dateElement.classList.add('sunday');
                    }

                    dateElement.addEventListener("mouseover", () => {
                        dateElement.style.border = "1px solid #007bff";
                    });

                    dateElement.addEventListener("mouseout", () => {
                        if (!(day === todayDate && month === todayMonth && year === todayYear) && dateElement !== selectedDateElement) {
                            dateElement.style.border = "1px solid #ddd";
                        }
                    });

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
                        } else {
                            dateElement.style.border = "1px solid #FFC061";
                        }
                        selectedDateElement = dateElement;
                    });

                    // 코스 데이터를 날짜에 맞게 표시
                    courseTitle && courseTitle.forEach(course => {
                        const visitDate = new Date(course.visitDate);
                        const courseDay = visitDate.getDate();
                        const courseMonth = visitDate.getMonth();
                        const courseYear = visitDate.getFullYear();

                        if (courseDay === day && courseMonth === month && courseYear === year) {
                            const userSchedule = document.createElement('div');
                            userSchedule.textContent = course.courseName;
                            userSchedule.classList.add('user-schedule');
                            userSchedule.style.background = `${course.color}`;
                            dateElement.appendChild(userSchedule);

                            // userSchedule 클릭 시 panel을 표시하고, 다른 부분 클릭 시 숨김
                            userSchedule.addEventListener("click", (event) => {
                                event.stopPropagation(); // 이벤트 버블링을 막아 다른 클릭 이벤트가 실행되지 않도록 함
                                calendarPanel.style.display = 'block';
                                displayContent(new Date(course.visitDate));
                            });

                            // document 클릭 시 panel 숨김
                            document.addEventListener("click", (event) => {
                                if (!userSchedule.contains(event.target)) { // 클릭된 요소가 userSchedule 안에 포함되어 있지 않을 때
                                    calendarPanel.style.display = 'none';
                                }
                            });

                            // calendarPanel 내부 클릭 시 panel을 숨기지 않도록 함
                            calendarPanel.addEventListener("click", (event) => {
                                event.stopPropagation(); // 이벤트 버블링을 막아 panel이 사라지지 않도록 함
                            });

                        }

                        if (day === todayDate && month === todayMonth && year === todayYear) {
                            dateElement.style.border = "1px solid #007bff";
                            todayDateElement = dateElement;
                        }
                    })
                }

                const totalCells = firstDay + lastDate;
                const nextMonthDays = (7 - (totalCells % 7)) % 7;

                for (let i = 1; i <= nextMonthDays; i++) {
                    const nextDateElement = document.createElement('div');
                    nextDateElement.classList.add('day', 'next-month');
                    nextDateElement.textContent = i;
                    calendar.appendChild(nextDateElement);
                }

                if (month === todayMonth && year === todayYear) {
                    fetchWeatherData();
                }
            }

    function displayContent(clickedDate) {
        const formattedDate = clickedDate.toISOString().split('T')[0];

        fetch('/courseDetail')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                // 필터링된 코스 리스트
                const filteredCourses = data.filter(course => {
                    const visitDate = new Date(course.visitDate).toISOString().split('T')[0];
                    return visitDate === formattedDate;
                });

                // 중복 없는 일차 값 수집
                const uniqueDays = [...new Set(filteredCourses.map(course => course.day != null ? course.day : 1))];

                // 일차 표기
                if (uniqueDays.length > 0) {
                    const dayText = uniqueDays.map(day => `${day}일차`).join(', ');
                    panelTitle.textContent = dayText;
                }

                cardBody.innerHTML = '';

                const ul = document.createElement('ul');
                filteredCourses.forEach(course => {
                    const li = document.createElement('li');
                    const item = course.location;
                    li.textContent = item;
                    console.log(item);
                    if (course.memo) {
                        const courseDetailId = course.course_detail_id;
                        memo(li, course.memo, course.day, item, courseDetailId);
                    }

                    ul.appendChild(li);
                    ul.style.background = `${course.color}`;
                    panelTitle.style.background = `${course.color}`;
                });
                console.log(ul);
                cardBody.appendChild(ul);
                // userSchedule.style.background = `${course.color}`;

                panelContent.style.display = 'block';
            })
            .catch(error => console.error('사용자 코스 데이터를 가져오는 중 오류 발생:', error));
    }

            function memo(li, defaultText, day, item, courseDetailId) {
                const memo = document.createElement('span');
                memo.classList.add('memo');

                const edit = document.createElement('img');
                edit.classList.add('edit');
                edit.src = '../../images/icons/edit-white_icon.png';
                edit.alt = "edit icon";
                memo.appendChild(edit);

                const memoText = document.createElement('span');
                const storedText = localStorage.getItem(`${day}-${item}`);
                memoText.textContent = storedText ? storedText : defaultText;
                memo.appendChild(memoText);

                li.appendChild(memo);

                edit.addEventListener("click", function () {
                    editMemo(memoText, `${day}-${item}`, courseDetailId);
                });
            }

            function editMemo(memoText, storageKey, courseDetailId) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = memoText.textContent;
                input.classList.add('memo-input');

                const saveButton = document.createElement('img');
                saveButton.src = '../../images/icons/save-icon.png';
                saveButton.alt = "save icon";
                saveButton.classList.add('save-button');

                memoText.replaceWith(input);

                input.focus();
                input.select();
                input.after(saveButton);

                saveButton.addEventListener('click', function () {
                    const newMemo = input.value;
                    memoText.textContent = newMemo;
                    localStorage.setItem(storageKey, newMemo);

                    // 서버에 메모 업데이트 요청
                    fetch('/updateMemo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({courseDetailId: courseDetailId, memo: newMemo})
                    })
                        .then(response => response.text())
                        .then(result => {
                            console.log(result)
                        })
                        .catch(error => {
                            console.error('메모 업데이트 중 오류 발생:', error);
                        });

                    input.replaceWith(memoText);
                    saveButton.remove();
                });

                input.addEventListener('keyup', function (event) {
                    if (event.key === 'Enter') {
                        saveButton.click();
                    }
                });

                input.addEventListener('blur', function () {
                    saveButton.click();
                });
            }

    function fetchWeatherData() {
        const apiKey = '4872637a8788d0b9b7a84adebed8aea5';
        const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderWeatherData(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    const iconMap = {
        '01d': '../../images/weather_icons/clear-day.svg',
        '01n': '../../images/weather_icons/clear-night.svg',
        '02d': '../../images/weather_icons/partly-cloudy-day.svg',
        '02n': '../../images/weather_icons/partly-cloudy-night.svg',
        '03d': '../../images/weather_icons/cloudy.svg',
        '03n': '../../images/weather_icons/cloudy.svg',
        '04d': '../../images/weather_icons/cloudy.svg',
        '04n': '../../images/weather_icons/cloudy.svg',
        '09d': '../../images/weather_icons/rain.svg',
        '09n': '../../images/weather_icons/rain.svg',
        '10d': '../../images/weather_icons/rain.svg',
        '10n': '../../images/weather_icons/rain.svg',
        '11d': '../../images/weather_icons/thunderstorm.svg',
        '11n': '../../images/weather_icons/thunderstorm.svg',
        '13d': '../../images/weather_icons/snow.svg',
        '13n': '../../images/weather_icons/snow.svg',
        '50d': '../../images/weather_icons/fog.svg',
        '50n': '../../images/weather_icons/fog.svg'
    };

    function renderWeatherData(data) {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로 얻음

        // 오늘부터 5일 간의 날씨 데이터를 필터링
        const fiveDayWeatherData = [];
        for (let i = 0; i < 5; i++) {
            const forecastDate = new Date(today);
            forecastDate.setDate(today.getDate() + i);
            const forecastDateString = forecastDate.toISOString().split('T')[0];

            const weatherForDay = data.list.find(item => {
                const itemDate = new Date(item.dt * 1000).toISOString().split('T')[0];
                return itemDate === forecastDateString;
            });

            if (weatherForDay) {
                fiveDayWeatherData.push({
                    date: forecastDateString,
                    icon: weatherForDay.weather[0].icon,
                    temp: Math.round(weatherForDay.main.temp)
                });
            }
        }

        // 모든 날짜 요소가 있는지 확인
        fiveDayWeatherData.forEach(day => {
            const dateElement = calendar.querySelector(`.day[data-date="${day.date}"]`);
            if (!dateElement) return; // 해당 날짜 요소가 없으면 건너뜀

            const weatherIcon = day.icon;
            const temp = day.temp;

            const weatherElement = document.createElement('div');
            const iconFileName = iconMap[weatherIcon] || '../../images/weather_icons/default.svg';
            weatherElement.innerHTML = `
            <img src="${iconFileName}" alt="Weather Icon">
            <div>${temp}°C</div>
        `;
            weatherElement.classList.add('weather');

            dateElement.appendChild(weatherElement);
        });
    }




    prevButton.addEventListener("click", function () {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener("click", function () {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    todayButton.addEventListener("click", function () {
        date = new Date();
        date.setDate(1);
        renderCalendar();
    });

    renderCalendar();
});
