# 🎡 여행&데이트 코스 설계 웹 NextPin
![image](https://github.com/user-attachments/assets/c968a9b0-1e93-4d45-896a-c5241bf691cd)

<br>

## 📖 프로젝트 소개

- NextPin은 여행, 데이트코스, 당일치기 여행 등 다양한 목적에 맞춘 코스를 손쉽게 만들 수 있는 웹 플랫폼입니다. 
- 사용자는 원하는 장소를 검색하고 선택한 후, 날짜를 지정하여 자신만의 맞춤형 코스를 생성할 수 있습니다.
- 일정 탭에서 모든 일정을 한 눈에 확인할 수 있습니다. 
- 커뮤니티 기능을 통해 다른 사람들의 코스에 좋아요를 눌러 불러오거나, 자신의 코스를 공유할 수 있습니다.
- 랜덤핀 기능을 이용해 특정 지역을 선택하면 해당 지역의 랜덤한 장소들로 코스를 자동으로 생성해주며 이를 일정에 등록해 활용할 수도 있습니다.
- 마이페이지에서 저장한 코스와 생성한 코스를 관리할 수 있습니다.

<br>

## 🙋‍♀️ 팀원 구성

<div align="center">

<img src="https://img.shields.io/badge/네이버 클라우드 캠프 데브옵스 12기 1조-03C75A?style=for-the-badge&logo=naver&logoColor=white">
<br>
<br>

| **조장호(조장)** | **정지우** | **송민교** | **오유빈** | **김서연** |
| :------: |  :------: | :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/26171786?v=4" height=150 width=150> <br/> @jangho309](https://github.com/jangho309) | [<img src="https://avatars.githubusercontent.com/u/155321447?v=4" height=150 width=150> <br/> @namdoil23](https://github.com/namdoil23) | [<img src="https://avatars.githubusercontent.com/u/167949269?v=4" height=150 width=150> <br/> @ssongmingyo](https://github.com/ssongmingyo) | [<img src="https://avatars.githubusercontent.com/u/101121572?v=4" height=150 width=150> <br/> @Have-Been](https://github.com/Have-Been) | [<img src="https://avatars.githubusercontent.com/u/167949542?v=4" height=150 width=150> <br/> @yeon0131](https://github.com/yeon0131) |

</div>

<br>

## 1. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-06-20 ~ 2024-08-08
- 프론트엔드 구현 : 2024-06-20 ~ 2024-07-04
- 백엔드 구현 : 2024-07-18 ~ 2024-08-08

<br>

### 작업 관리
- 매일 스터디시간 (pm 06:00부터)에 회의를 진행하며 작업과 프로젝트 방향성에 대해 얘기하고 Slack에 회의록 채널을 만들어 회의 내용을 기록했습니다.
- GitHub를 이용하여 각자의 브랜치에 프로젝트 진행 상황을 공유하며 단계적으로 main 브랜치에 Merge 작업을 했습니다.

<br>

## 2. Stacks
### Front
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

### BackEnd
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=thymeleaf&logoColor=white"> <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"/>

### Environment
<img src="https://img.shields.io/badge/intelliJ IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white"/> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/git Hub-181717?style=for-the-badge&logo=github&logoColor=white"/> 

### Communication
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/> 

### API
- KakaoMap
- KakaoMap GeoCoder

<br>

## 3. 역할 분담

### 🐶조장호
- **프론트엔드**
  - 로그인, 회원가입, 코스 페이지, 코스 상세 페이지, 커뮤니티 페이지
- **백엔드**
  - 검색된 장소들의 핀 표출 기능(KaKaoMap API 사용), 카테고리(맛집, 카페, 관광지, 숙소)별 장소 검색 및 페이징 기능, 검색된 장소의 상세 페이지, 랭킹별 코스 리스트 표출 기능, 가게 데이터/리뷰 데이터 저장 기능, 데이터의 주소를 좌표값으로 변환하는 기능(KaKaoMap GeoCoder API사용)
 
<br>

### 🦊정지우
- **프론트엔드**
  - 메인화면, 마이페이지, 랜덤핀페이지
- **백엔드**
  - 회원탈퇴 모달창, 소개글 수정기능, 검색 및 로딩 모달창, 카테고리별 랜덤으로 조합된 장소 검색 및 페이지에 표출 기능, 표출된 페이지내에서 재검색 기능, 카테고리별 조합되어 표출된 장소 저장 기능, 조합된 장소를 카테고리 순으로 연결된 선 표출 기능(KaKaoMap API 사용)
 
<br>

### ⭐송민교
- **프론트엔드**
  - 커뮤니티 페이지, 코스 저장 페이지
- **백엔드**
  - 커뮤니티 페이지 : 랭킹 기능, 좋아요 여부, 설정 유지 및 개수, 프로필 별 코스 불러오기 기능, 일정 상세보기 기능, 코스 이름 검색창, 일정 선택 시 지도에 핀 표기 기능
  - 코스 저장 페이지 : DB 가게 정보 불러오기, 날짜별/코스별 장소 저장 기능, 기존 코스 이름 불러오기 및 새로 만들기 기능
 - **디자인**
   - 메인화면, 커뮤니티 페이지, 캘린더, 날짜별 코스 상세보기
    
<br>

### 🎐오유빈
- **프론트엔드**
  - 일정 페이지
  - 공통 : 사이드바
- **백엔드**
  - 로그인, 회원가입, 로그아웃, 메인화면, 캘린더에 해당 유저 일정 불러오기, 일정 상세보기 기능, 메모 수정 및 데이터베이스에 수정사항 저장
- **디자인**
  - 로그인, 회원가입, 코스, 코스짜기, 코스추천, 마이페이지
 
<br>

### 🐹김서연
- **프론트엔드**
  - 코스 추천-MyPin(마이페이지와 통합)
  - 공통 : 사이드바 통합
- **백엔드**
  - 마이페이지 : 저장한 코스 정보 표출, 코스 정보 수정(공개 여부, 컬러 편집, 이름 편집, 코스 삭제)기능, 맵에 코스 Pin 표출, 프로필 정보 수정
  - 추천할 가게에 대한 정보 크롤링하여 데이터베이스 구축
 - **디자인**
   - 커뮤니티, 랜덤핀, 코스 추천 - MyPin(마이페이지와 통합)
    
<br>

## 4. 페이지별 기능

### [메인화면]
- NextPin 메인화면입니다.
  - 로그인이 되어있지 않은 경우 : 메인화면에 어떤걸 눌러도 로그인 페이지로 이동
  - 로그인이 되어있는 경우 : 각 아이콘에 맞는 페이지로 이동
- SNS(카카오톡, 구글, 페이스북 등) 로그인 기능은 구현하지 않았습니다.
- 로그인할 시 우상단에 유저의 닉네임과 로그아웃 버튼이 생성됩니다.

| 메인화면(로그인하지 않았을 시) | 
|----------|
| ![메인화면](https://github.com/user-attachments/assets/14202f8c-60d4-4237-9d30-48a91e6f0102) |

| 메인화면(로그인했을 시 )|
|----------|
| ![메인화면2](https://github.com/user-attachments/assets/5fcdd0cc-765b-40cf-8fc4-eec5ced27298) |


<br>

### [회원가입]
- 아이디와 닉네임을 입력 후 중복확인 버튼을 누를 시 중복 체크를 진행합니다. 중복된 아이디, 또는 중복된 닉네임일 경우 각 입력창 상단에 경고 문구가 표시되며 중복되지 않은 아이디 또는 닉네임일 경우 사용 가능 문구가 단에 표시되며 중복체크 버튼이 비활성화됩니다.
- 비밀번호는 영문자, 숫자, 특수문자 조합의 8자 이상으로 입력해야 하며 통과하지 못한 경우 입력창 상단에 경고 문구가 표시됩니다.
- 이미 중복체크를 진행한 아이디를 지우고 다시 입력할 경우 비활성화되었던 중복체크 버튼이 다시 활성화되며 중복체크를 다시 진행해야 합니다.
- 작성하지 않은 입력창이 있을 때 회원가입 버튼을 누르면 작성하지 않은 부분을 경고창으로 띄워 알려주며 해당 부분을 작성할 수 있게 해줍니다.
- 모든 입력창을 정상적으로 작성하였을 때 회원가입 버튼을 누르면 회원가입이 정상적으로 완료되며 로그인 화면으로 이동합니다.
- 회원가입 진행 도중, < 버튼을 눌러 뒤로 이동할 수 있으며 뒤로 이동 시 작성한 부분은 파기됩니다.

| 회원가입 |
|----------|
| ![회원가입](https://github.com/user-attachments/assets/a4fa72c9-b96f-43c2-9cfe-71b403500c39) |

<br>

### [로그인]
- 회원가입한 아이디와 비밀번호로 로그인을 합니다.
- 만일 일치하지 않는 아이디 또는 비밀번호일 경우 경고창을 띄우며 로그인이 진행되지 않습니다.
- 정상적으로 로그인이 된 경우 메인화면으로 이동합니다.
- 하단에 회원가입을 누르면 회원가입 페이지로 이동합니다.
- X 버튼을 눌러 메인화면으로 이동할 수 있으며 이때 작성한 부분은 파기됩니다.

| 로그인 |
|----------|
| ![로그인](https://github.com/user-attachments/assets/d43da350-82b0-4e1f-9e3c-9c52bce07c4c) |

<br>

### [로그아웃]
- 우상단의 사용자의 닉네임 옆에 위치한 로그아웃 버튼을 클릭하면 로그아웃이 됩니다.
- 로그아웃 시 다시 메인화면으로 이동합니다.

| 로그아웃 |
|----------|
| ![메인화면2](https://github.com/user-attachments/assets/5fcdd0cc-765b-40cf-8fc4-eec5ced27298) |

<br>

### [코스]

#### (1) 코스 메인화면
- 좌측에는 사이드바로, 코스, 일정, 커뮤니티, 랜덤핀, 마이페이지가 아이콘으로 표출됩니다.
- 검색창에 원하는 장소(ex. 강남역 1번 출구)를 입력 후 검색할 시 해당 장소 반경 oom 안에 있는 가게들이 태그에 맞춰서 나옵니다.
- 검색창 아래에 있는 +버튼을 누르면 검색창을 하나 더 생성할 수 있으며 이는 장소를 두 개 입력해 겹치는 곳의 가게들을 찾기 위한 기능입니다.
  - (ex. 검색창1에는 강남역 1번 출구, 검색창 2에는 신논현역 4번 출구로 하고 검색하면 강남역 1번 출구와 신논현역 4번 출구까지 중 겹치는 가게들을 검색할 수 있음)

| 코스 - 메인화면(검색창이 한 개인 경우) |
|----------|
| ![코스메인화면](https://github.com/user-attachments/assets/6685984a-5c69-4044-9518-fd7d723d9269) |

| 코스 - 메인화면(검색창이 두 개인 경우) |
|----------|
| ![image](https://github.com/user-attachments/assets/44665cba-0b5a-4259-b2e7-c48fac6e214f) |
<br>

- #맛집은 음식점, #카페는 카페, #관광지는 미술관, 놀이공원 등이 나오며 #숙소는 호텔과 모텔 등이 있으며 클릭 시 각 태그에 맞는 가게들이 나옵니다.
- 각 태그에 맞는 핀들이 지도에 표출되며 마우스를 올리면 해당 가게의 이름이 나옵니다.
- 검색했을 시 가게의 이름, 종류, 평점, 기본 정보들이 표출됩니다.


| 코스 - 메인화면(검색했을 경우-#맛집) |
|----------|
| ![image](https://github.com/user-attachments/assets/882ba187-9777-4c02-9007-fee109f51487) |

| 코스 - 메인화면(검색했을 경우-#카페) |
|----------|
| ![image](https://github.com/user-attachments/assets/599f958b-ab3e-4298-9852-93ed1ed6f499) |

| 코스 - 메인화면(검색했을 경우-#관광지) |
|----------|
| ![image](https://github.com/user-attachments/assets/f207edf9-8771-44d3-ae69-fcd9b60eae26) |
<br>

#### (2) 코스 가게 정보 화면
- 가게의 홈 화면은 다음과 같이 표출됩니다.
  - 가게 이름
  - 가게의 상세정보(주소, 영업 시간, 전화번호, 해당 장소의 KakaoMap 주소)
- 가게의 리뷰 화면은 가게 리뷰 개수, 사용자의 이름, 후기의 개수, 날짜, 리뷰의 내용들을 볼 수 있습니다.
  
| 코스 가게 홈 화면 |
|----------|
| ![image](https://github.com/user-attachments/assets/5cc46f17-32b8-47e9-8471-94494db40f2b) |

| 코스 가게 리뷰 화면 |
|----------|
| ![image](https://github.com/user-attachments/assets/07f7a254-624c-49b4-9250-7f360a5b0c1b) |
<br>

#### (3) 코스 생성
- 가게의 저장 버튼을 누르면 옆에 화면이 생성되며 코스 생성 페이지가 나옵니다.
- 코스 만들기에서는 기존 코스를 선택할 것인지, 아니면 새로운 코스로 만들 것인지 선택할 수 있으며 기존 코스 선택 시 코스 이름을 입력할 수 없게 입력창이 사라지며, 새로운 코스로 생성할 경우 새로운 코스의 이름을 입력할 수 있게 입력창이 생성됩니다. 입력창에 이름을 작성할 시 입력창은 사라지고 해당 내용으로 코스가 생성됩니다.
- 언제 방문할 것인지 날짜를 선택할 수 있습니다. 이는 일정 페이지에서 확인할 수 있습니다.
- 메모 작성 여부를 선택할 수 있습니다. 체크박스를 클릭하면 메모를 작성할 수 있으며 체크박스를 클릭하지 않으면 메모를 작성할 수 없습니다. 메모는 15자 이내로 입력해야 합니다.
- 코스의 색을 지정할 수 있습니다. 해당 색을 선택하고 확인 버튼을 누를 시 해당 색으로 코스가 저장됩니다. 이는 일정 페이지와 마이페이지에서도 확인할 수 있습니다.
- 전부 다 작성한 이후 확인 버튼을 누를 시 코스가 생성이 되며 입력한 코스의 이름, 날짜, 메모, 가게의 이름을 볼 수 있습니다.
- 이 작업을 통해 여러 개의 가게를 저장할 수 있으며 2박 3일, 3박 4일 등의 여행을 계획할 수 있습니다.

| 코스 생성 화면 |
|----------|
| ![image](https://github.com/user-attachments/assets/eb50cc11-3935-4b04-80c5-a91a3c8eb3de) |

| 코스 생성 화면 - 내용을 입력했을 경우 |
|----------|
| ![image](https://github.com/user-attachments/assets/f7d0db25-4591-47b1-8aca-6cbfb65a7db0) |

| 코스 생성 화면 - 코스 생성 완료 |
|----------|
| ![image](https://github.com/user-attachments/assets/7bc29bdb-2288-4a5c-be7c-716d6368f283) |
<br>

### [일정]
- 사용자가 저장한 코스의 제목과 해당 날짜로 캘린더에 저장되어 한 눈에 확인할 수 있습니다.
- 코스의 상세 정보는 해당 코스의 제목 칸을 누르면 확인할 수 있으며, 연달히 저장된 여행 코스는 해당 일자에 맞춰 1일차, 2일차... n일차 등으로 볼 수 있습니다.
- 날씨는 앞으로 5일의 날씨를 보여주며 해당 날짜의 평균 기온과 함께 날씨 아이콘을 보여주어 날씨를 확인할 수 있습니다.

| 일정 |
|----------|
| 이미지 업로드 예정 |

<br>

### [커뮤니티]
- 커뮤니티 페이지에서는 유저들이 생성한 코스를 살펴볼 수 있습니다.
- 코스는 랭킹순(하트의 개수)으로 정렬되어 있으며 하트를 누를 시 마이페이지의 관심있는 코스로 저장되게 됩니다.
- 코스의 이름을 클릭하면 해당 코스의 상세정보를 살펴볼 수 있으며 해당 코스의 가게들을 지도에 핀으로 표기해주게 됩니다. 해당 핀에 마우스를 올리면 가게의 이름이 나오게 됩니다.
- 코스의 제목과 색상은 사용자가 지정한 색상과 제목으로 나오게 됩니다.
- 코스를 검색할 수도 있습니다. 검색어에 해당하는 코스가 검색 결과로 나오게 됩니다.

| 커뮤니티 |
|----------|
| ![image](https://github.com/user-attachments/assets/4e84be0d-dfe3-49ff-bd93-d8995008e676) |

| 커뮤니티 - 코스 상세보기|
|----------|
| ![image](https://github.com/user-attachments/assets/dc9be725-bdec-4d0a-a2e4-3e7af4fc4573) |


<br>

### [랜덤핀]
- 지역을 입력하면 랜덤으로 코스를 생성해주는 페이지입니다.
- 지역을 입력하고 전국 어디든! 버튼을 클릭하면 생성 중 애니메이션이 나오게 됩니다.
- 생성이 완료되면 지도에 표시해주며 코스 저장하기 버튼을 눌러 이를 코스로 저장할 수도 있습니다.
- 코스 저장하기 버튼을 누르면 코스 생성 창이 뜨며 이는 코스 생성하기 페이지와 동일한 방식으로 작동합니다.
- #맛집 태그 2개, #카페 태그 1개, #관광지 태그 1개, #숙소 태그 1개가 들어간 코스로, 랜덤으로 가게를 지정해줍니다.

| 랜덤핀 - 초기화면 |
|----------|
| ![image](https://github.com/user-attachments/assets/c2f2a339-81d4-47e2-9773-b1eb052fee26) |

| 랜덤핀 - 생성 |
|----------|
| ![image](https://github.com/user-attachments/assets/16fdc436-6c2e-4768-83d6-d2da5c44c665) |

| 랜덤핀 - 생성 완료 |
|----------|
| ![image](https://github.com/user-attachments/assets/a1be00a4-c108-4a71-8b54-7c26285553db) |

| 랜덤핀 - 코스 저장하기 |
|----------|
| ![image](https://github.com/user-attachments/assets/7982e1c5-21ea-44d4-9dbb-2c21ffc1b340) |

<br>

### [마이페이지]
- 마이페이지에서는 사용자의 정보를 확인할 수 있습니다.
- 사용자의 닉네임과 한줄소개, 사용자가 생성한 코스, 사용자가 하트 누른 코스(관심있는 코스), 회원탈퇴가 있습니다.
- 한 줄소개는 편집이 가능하며 저장할 수 있습니다.
- 사용자가 생성한 코스는 공개와 비공개처리가 가능하며 공개될 시 커뮤니티 페이지에서 확인할 수 있습니다. 컬러와 이름을 편집할 수 있으며 코스 삭제도 가능합니다.
- 코스 검색은 사용자가 생성한 코스, 저장한 코스의 제목을 기반으로 검색하며 검색할 시 검색과 관련된 코스가 분류별로 나옵니다.
- 코스의 상세 정보는 해당 코스의 버튼을 누르면 확인할 수 있습니다.
- 마이페이지에서 회원탈퇴를 진행할 수 있습니다. 회원 탈퇴 시 해당 유저의 정보는 사라지나 코스는 사라지지 않으며 이는 커뮤니티에 사용자 이름이 Unknown 상태로 남아있게 됩니다.
- 회원 탈퇴 버튼을 누를 시 모달창으로 한번 더 확인하며 경고 문구를 띄워줍니다.

| 마이페이지 |
|----------|
| ![image](https://github.com/user-attachments/assets/1449550b-7d75-4980-8c84-0754e8f7e1e4) |

<br>

## 5. 프로젝트 후기

### 🐶조장호
이전에 경력으로 웹 개발을 한 경험은 있었지만 5명 이상의 다수의 사람들과 모여서 개발은 한 경험이 이번이 처음이었습니다.
그렇다보니 서로 맡은 일에 대해서 진행률이 얼마나 이루어졌는지 Github 사이트의 서로의 코드를 통해서 확인할 수 있었지만 세세한 기능에 대해선 팀원간의 회의시간을 가지면서 어떤 문제점이 있는지 앞으로 필요한 것들이 뭐가 남았는지 협력활동하는 것이 얼마나 중요한지를 깨닫게 되었습니다.
아쉬운 점은 프로젝트의 기능들을 구현하는 것에는 문제가 없었지만 구현함에 있어 시간이 얼마나 걸리는지 그리고 어떤 문제점들이 있었는지 프로젝트 일정 관리로 많이 쓰이는 WBS를 활용하지 못한 것이었습니다. 다음 프로젝트부터는 진행하면서 필요한 것들을 문서로 따로 정리하도록 노력하겠습니다.
마지막으로, 학원을 통해 처음 만나는 사람들이라 싸움이 일어날 수 있을 것 같은 불안한 생각을 가지면서 진행했는데 다행히도 좋은 사람들과 조를 이루게 되어 프로젝트 하는 데에 큰 싸움 일어나지 않고 좋게 마무리 지을 수 있었던 것 같습니다. 마지막 수료하는 날까지 서로 열심히 좋은 곳으로 갈 수 있으면 좋겠습니다. 다들 정말 고생하셨습니다~ 

### 🦊정지우
비록 미니프로젝트였지만 학원에서 개발을 배우기로 시작하고 처음하는 프로젝트였기에 설렘반 걱정반으로 임했던거 같고 이렇게 끝나고 나니 부족했던 부분들이 많이 느껴졌습니다. 초기 설계를 어떻게 어떤 방향으로 잡아야되며 각각의 기능들에 대해 세부적인 논의가 필요하고 각자 구상하는 그림이나 이해하는 부분들이 달라서 이야기를 많이 했던거 같음에도 백엔드구현에 들어가니 기능적으로 부족하고 디테일적인것들이 지속적으로 생겨나는 것을 볼 수 있었습니다. 더군다나 비전공자인 저는 코드나 프로그래밍 언어 자체에 대한 이해도 많이 부족해서 갈피를 잡기가 힘들었는데 좋은 조원을 만나서 협업하여 서로 잘 이끌어주어 해당 프로젝트를 잘 마무리했다고 생각합니다. 학원 소감 발표때 생각치 못해 제대로 이야기를 못했는데 이 자릴 통해 함께 고생한 조원들에게 고맙다고 전하고 싶고 앞으로 학원 남은 수료기간도 열심히 해서 잘 마무리했으면 좋겠고 각자 목표한 바 잘 이뤘으면 합니다.

### ⭐송민교
[후기 작성 예정입니다.]

### 🎐오유빈
학부 시절, 수업의 일환으로 게임 개발 프로젝트와 개인 웹 개발 프로젝트를 진행해본 경험은 있었지만 웹 개발 프로젝트를 다수의 인원으로 진행해본 것은 이번이 처음이라 모든 것이 새로웠던 것 같습니다. 아이디어를 선정하고 계획을 구체화하며 개발하고 완성에 이르기까지 쉬운 것은 단 하나도 없었지만 그렇기에 많은 것을 배울 수 있던 프로젝트였습니다. 특히 협업의 과정에서 사용자의 환경에 따라 원하는 웹 구성이 안나올 수 있다는 것을 깨닫게 되었고 각 사용자의 맞는 환경을 구축해보기 위해 고민할 수 있었던 좋은 시간이었습니다. 하지만 아쉬운 점도 또한 많았습니다. 백엔드까지 해보는 것은 처음이라 많이 허덕였고, 시간도 부족해서 효율적으로 코드를 짜기보단 최대한 빠르게 기능을 구현하는 것을 목표로 두어 너무 아쉬웠습니다. 다음 프로젝트에서는 효율적인 코드 작성법에 대해 고민하고, 개선하고자 합니다.
늦은 시간까지 함께 남아 최대한 완성하기 위해 노력해줬던 우리 조원들에게 고맙다고 전하고 싶고 모두 고생많으셨습니다! 이번 프로젝트가 모두에게 좋은 밑거름, 바탕이 되어 좋은 개발자가 되었으면 좋겠습니다. 마지막 수료하는 날까지 화이팅~

### 🐹김서연
여러 팀원들과 함께 진행한 이번 웹 개발 프로젝트는 저에게 큰 배움의 기회였습니다. UI 디자인부터 프론트엔드, 백엔드까지 웹 개발의 전반적인 기능들을 익힐 수 있었고, 특히 협업 과정에서 Git 관리의 중요성을 깊이 체감하게 되었습니다.
팀원들과 코드를 주고받으며 환경에 따라 코드가 다르게 작동할 수 있다는 점도 깨달았고, 이를 통해 어느 환경에서도 안정적으로 동작하는 코드를 작성하는 것이 얼마나 중요한지 배울 수 있었습니다. 다만, 이번 프로젝트에서 성능 최적화나 효율적인 코드 작성에 대한 고민이 다소 부족했던 점이 아쉽습니다. 다음 프로젝트에서는 이 부분을 개선하여 더 나은 코드를 작성할 수 있도록 노력할 것입니다.
이번 프로젝트를 진행하며, 저희 팀은 늦은 밤까지 코드 구현에 몰두하고, 휴일에도 함께 모여 최선을 다했습니다. 그만큼 많은 노력을 기울였고, 서로에게서 더 많은 것을 배울 수 있었다고 생각합니다. 팀원 모두가 끝까지 최선을 다해 프로젝트를 완성할 수 있었던 것에 대해 감사드리며, 모두 정말 고생 많으셨습니다.
이 경험을 발판 삼아, 앞으로 더 나은 개발자가 되기 위해 계속해서 노력하겠습니다 :)
