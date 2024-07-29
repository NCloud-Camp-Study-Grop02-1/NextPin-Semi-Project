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

    let date = new Date();
    date.setDate(1);
    let selectedDateElement = null;
    let todayDateElement = null;

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

            if ((day === 27 && month === 6 && year === 2024) || (day === 28 && month === 6 && year === 2024)) {
                const userSchedule = document.createElement('div');
                userSchedule.textContent = "1박 2일 강릉여행";
                userSchedule.classList.add('user-schedule'); // CSS 클래스 추가
                dateElement.classList.add('userSchedule'); // 부모 요소에 클래스 추가
                dateElement.appendChild(userSchedule);

                userSchedule.addEventListener("click", () => {
                    calendarPanel.style.display = 'block';
                });
            }

            if (day === todayDate && month === todayMonth && year === todayYear) {
                dateElement.style.border = "1px solid #007bff";
                todayDateElement = dateElement;
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
                }
                else {
                    dateElement.style.border = "1px solid #FFC061";
                }
                selectedDateElement = dateElement;

                if (day === 27 && month === 6 && year === 2024) {
                    displayContent1();
                }
                else if (day === 28 && month === 6 && year === 2024) {
                    displayContent2();
                }
                else {
                    calendarPanel.style.display = 'none';
                }
            });
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

    function displayContent1() {
        panelTitle.textContent = `1일차`;
        cardBody.innerHTML = '';

        const ul1 = document.createElement('ul');
        const items1 = ['당신의 안목 펜션', '송정해수욕장', '번패티번 강릉', '엔드 투 앤드 카페', '순두부젤라또 1호점', '차현희순두부청국장'];

        items1.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;

            // 특정 li에만 memo를 추가함
            if (item === '당신의 안목 펜션') {
                // memo 함수 호출
                // '12시 체크인'은 임시 메모임.
                memo(li, '12시 체크인', '1일차', item);
            }
            if (item === '차현희순두부청국장') {
                memo(li, '20시 예약, 예약자명 오유빈', '1일차', item);
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
        const items2 = ['아르떼뮤지엄 강릉', '카페덕덕', '이모네생선찜', '현대장칼국수', '스튜디오 킨조 소품샵'];
        items2.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;

            // 특정 li에만 memo를 추가함
            if (item === '이모네생선찜') {
                // memo 함수 호출
                memo(li, '13시 예약', '2일차', item);
            }
            if (item === '스튜디오 킨조 소품샵') {
                memo(li, '18시 방문 예정', '2일차', item);
            }

            ul2.appendChild(li);
        });
        cardBody.appendChild(ul2);
        panelContent.style.display = 'block';
    }

    function memo(li, defaultText, day, item) {
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
            editMemo(memoText, `${day}-${item}`);
        });
    }

    function editMemo(memoText, storageKey) {
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
            memoText.textContent = input.value;
            localStorage.setItem(storageKey, input.value);

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

    prevButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    todayButton.addEventListener('click', () => {
        date = new Date();
        date.setDate(1);
        renderCalendar();
        if (selectedDateElement) {
            selectedDateElement.style.border = "1px solid #007bff";
            selectedDateElement = null;
        }
        calendarPanel.style.display = 'none';
        fetchWeatherData();
    });

    document.addEventListener("click", (event) => {
        const withinBoundaries = event.composedPath().includes(calendarPanel) || event.composedPath().includes(calendar);
        if (!withinBoundaries) {
            calendarPanel.style.display = 'none';
        }
    });

    renderCalendar();
});