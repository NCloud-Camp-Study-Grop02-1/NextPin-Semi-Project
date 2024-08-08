document.addEventListener("DOMContentLoaded", function () {
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
                // courseTitle.forEach(course => {
                //     const visitDate = new Date(course.visitDate);
                //     const courseDay = visitDate.getDate();
                //     const courseMonth = visitDate.getMonth();
                //     const courseYear = visitDate.getFullYear();
                //
                //     if (courseDay === day && courseMonth === month && courseYear === year) {
                //         const clickedDate = new Date(year, month, day);
                //         displayContent(clickedDate);
                //     }
                //     else {
                //         calendarPanel.style.display = 'none';
                //     }
                // });
                const clickedDate = new Date(year, month, day);
                // displayContent(clickedDate);
            });

            // 코스 데이터를 날짜에 맞게 표시
            courseTitle && courseTitle.forEach(course => {
                const visitDate = new Date(course.visitDate);
                const courseDay = visitDate.getDate();
                const courseMonth = visitDate.getMonth();
                const courseYear = visitDate.getFullYear();

                if (courseDay === day && courseMonth === month && courseYear === year) {
                    // console.log(course.courseName);
                    const userSchedule = document.createElement('div');
                    userSchedule.textContent = course.courseName;
                    userSchedule.classList.add('user-schedule');
                    dateElement.appendChild(userSchedule);

                    userSchedule.addEventListener("click", () => {
                        calendarPanel.style.display = 'block';
                        displayContent(new Date(course.visitDate));
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
        console.log('Formatted Date: ', formattedDate);

        fetch('/courseDetail')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('data : ' + JSON.stringify(data));
                // 일차 표기
                if (data.length > 0) {
                    panelTitle.textContent = `${data[0].day}일차`;
                } else {
                    panelTitle.textContent = 'No data available';
                }
                cardBody.innerHTML = '';

                const ul = document.createElement('ul');
                data.forEach(course => {
                    const visitDate = new Date(course.visitDate).toISOString().split('T')[0];
                    // console.log('Visit Date: ', visitDate);

                    if(visitDate === formattedDate) {
                        console.log('Matching Course:', course);
                        const li = document.createElement('li');
                        const item = course.location;
                        li.textContent = item;
                        console.log(item);
                        if (course.memo) {
                            const courseDetailId = course.courseId; // courseId 사용
                            memo(li, course.memo, course.day, item, courseDetailId);
                        }

                        ul.appendChild(li);
                    }
                    // if (visitDate === formattedDate) {
                    //     console.log('Matching Course:', course);
                    //
                    //     const li = document.createElement('li');
                    //     const item = course.location;
                    //     li.textContent = item;
                    //     console.log(item);
                    //
                    //     if (course.memo) {
                    //         const courseDetailId = course.courseId; // courseId 사용
                    //         memo(li, course.memo, course.day, item, courseDetailId);
                    //     }
                    //
                    //     ul.appendChild(li);
                    // }
                });
                console.log(ul);
                cardBody.appendChild(ul);
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
        const weatherData = data.list.filter((item) => {
            const forecastDate = new Date(item.dt * 1000);
            return forecastDate >= today;
        }).slice(0, 5);

        weatherData.forEach((day, index) => {
            const weatherIcon = day.weather[0].icon;
            const temp = Math.round(day.main.temp);

            const dateElement = calendar.querySelectorAll('.day')[index + today.getDate() - 1];
            const weatherElement = document.createElement('div');
            const iconFileName = iconMap[weatherIcon] || '../../images/weather_icons/default.svg';
            weatherElement.innerHTML = `
                <img src="${iconFileName}" alt="Weather Icon">
                <div>${temp}°C</div>
            `;
            weatherElement.classList.add('weather');

            if (index !== 0) {
                weatherElement.querySelector('div').style.display = 'none';
            }

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
