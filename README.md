# 🎡 여행&데이트 코스 설계 웹 NextPin
프로젝트 이미지를 넣을 계획입니다

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
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">

### BackEnd
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=thymeleaf&logoColor=white"> <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"/>

### Environment
<img src="https://img.shields.io/badge/intelliJ IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white"/> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/git Hub-181717?style=for-the-badge&logo=github&logoColor=white"/> 

### Communication
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> <img src="https://img.shields.io/badge/kakaoTalk-FFCD00?style=for-the-badge&logo=kakaotalk&logoColor=white"/> 

### API
- KakaoMap
- KakaoMap GeoCoder

<br>

## 3. 역할 분담

### 조장호
- **프론트엔드**
  - 로그인, 회원가입, 코스 페이지, 코스 상세 페이지, 커뮤니티 페이지
- **백엔드**
  - 검색된 장소들의 핀 표출 기능(KaKaoMap API 사용), 카테고리(맛집, 카페, 관광지, 숙소)별 장소 검색 및 페이징 기능, 검색된 장소의 상세 페이지, 랭킹별 코스 리스트 표출 기능, 가게 데이터/리뷰 데이터 저장 기능, 데이터의 주소를 좌표값으로 변환하는 기능(KaKaoMap GeoCoder API사용)
 
<br>

### 🦊정지우
- **프론트엔드**
  - 메인화면, 마이페이지, 랜덤핀
- **백엔드**
  - 검색 모달창, 회원탈퇴 모달창, 로딩 모달창, 소개글 수정, 카테고리별 랜덤으로 나열된 장소 검색, 나열된 장소 저장, 나열된 장소끼리 선으로 연결
 
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
- 아이디와 닉네임을 입력 후 중복확인 버튼을 누를 시 중복 체크를 진행합니다. 중복된 아이디, 또는 중복된 닉네임일 경우 각 입력창 하단에 경고 문구가 표시되며 중복되지 않은 아이디 또는 닉네임일 경우 사용 가능 문구가 하단에 표시되며 중복체크 버튼이 비활성화됩니다.
- 비밀번호는 영문자, 숫자, 특수문자 조합의 8자 이상으로 입력해야 하며 통과하지 못한 경우 입력창 아래에 경고 문구가 표시됩니다.
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

| 코스 |
|----------|
| ![코스메인화면](https://github.com/user-attachments/assets/6685984a-5c69-4044-9518-fd7d723d9269) |

<br>

### [일정]

| 일정 |
|----------|
| 이미지 업로드 예정 |

<br>

### [커뮤니티]

| 커뮤니티 |
|----------|
| 이미지 업로드 예정 |

<br>

### [랜덤핀]

| 랜덤핀 |
|----------|
| 이미지 업로드 예정 |

<br>

### [마이페이지]

| 마이페이지 |
|----------|
| 이미지 업로드 예정 |

<br>

## 프로젝트 후기

### 조장호
이전에 경력으로 웹 개발을 한 경험은 있었지만 5명 이상의 다수의 사람들과 모여서 개발은 한 경험이 이번이 처음이었습니다.
그렇다보니 서로 맡은 일에 대해서 진행률이 얼마나 이루어졌는지 Github 사이트의 서로의 코드를 통해서 확인할 수 있었지만 세세한 기능에 대해선 팀원간의 회의시간을 가지면서 어떤 문제점이 있는지 앞으로 필요한 것들이 뭐가 남았는지 협력활동하는 것이 얼마나 중요한지를 깨닫게 되었습니다.
아쉬운 점은 프로젝트의 기능들을 구현하는 것에는 문제가 없었지만 구현함에 있어 시간이 얼마나 걸리는지 그리고 어떤 문제점들이 있었는지 프로젝트 일정 관리로 많이 쓰이는 WBS를 활용하지 못한 것이었습니다. 다음 프로젝트부터는 진행하면서 필요한 것들을 문서로 따로 정리하도록 노력하겠습니다.
마지막으로, 학원을 통해 처음 만나는 사람들이라 싸움이 일어날 수 있을 것 같은 불안한 생각을 가지면서 진행했는데 다행히도 좋은 사람들과 조를 이루게 되어 프로젝트 하는 데에 큰 싸움 일어나지 않고 좋게 마무리 지을 수 있었던 것 같습니다. 마지막 수료하는 날까지 서로 열심히 좋은 곳으로 갈 수 있으면 좋겠습니다. 다들 정말 고생하셨습니다~ (편집됨) 

### 🦊정지우
비록 미니프로젝트였지만 학원에서 개발을 배우기로 시작하고 처음하는 프로젝트였기에 설렘반 걱정반으로 임했던거 같고 이렇게 끝나고 나니 부족했던 부분들이 많이 느껴졌습니다. 초기 설계를 어떻게 어떤 방향으로 잡아야되며 각각의 기능들에 대해 세부적인 논의가 필요하고 각자 구상하는 그림이나 이해하는 부분들이 달라서 이야기를 많이 했던거 같음에도 백엔드구현에 들어가니 기능적으로 부족하고 디테일적인것들이 지속적으로 생겨나는 것을 볼 수 있었습니다. 더군다나 비전공자인 저는 코드나 프로그래밍 언어 자체에 대한 이해도 많이 부족해서 갈피를 잡기가 힘들었는데 좋은 조원을 만나서 협업하여 서로 잘 이끌어주어 해당 프로젝트를 잘 마무리했다고 생각합니다. 학원 소감 발표때 생각치 못해 제대로 이야기를 못했는데 이 자릴 통해 함께 고생한 조원들에게 고맙다고 전하고 싶고 앞으로 학원 남은 수료기간도 열심히 해서 잘 마무리했으면 좋겠고 각자 목표한 바 잘 이뤘으면 합니다.

### ⭐송민교

### 🎐오유빈

### 🐹김서연
여러 팀원들과 함께 진행한 이번 웹 개발 프로젝트는 저에게 큰 배움의 기회였습니다. UI 디자인부터 프론트엔드, 백엔드까지 웹 개발의 전반적인 기능들을 익힐 수 있었고, 특히 협업 과정에서 Git 관리의 중요성을 깊이 체감하게 되었습니다.
팀원들과 코드를 주고받으며 환경에 따라 코드가 다르게 작동할 수 있다는 점도 깨달았고, 이를 통해 어느 환경에서도 안정적으로 동작하는 코드를 작성하는 것이 얼마나 중요한지 배울 수 있었습니다. 다만, 이번 프로젝트에서 성능 최적화나 효율적인 코드 작성에 대한 고민이 다소 부족했던 점이 아쉽습니다. 다음 프로젝트에서는 이 부분을 개선하여 더 나은 코드를 작성할 수 있도록 노력할 것입니다.
이번 프로젝트를 진행하며, 저희 팀은 늦은 밤까지 코드 구현에 몰두하고, 휴일에도 함께 모여 최선을 다했습니다. 그만큼 많은 노력을 기울였고, 서로에게서 더 많은 것을 배울 수 있었다고 생각합니다. 팀원 모두가 끝까지 최선을 다해 프로젝트를 완성할 수 있었던 것에 대해 감사드리며, 모두 정말 고생 많으셨습니다.
이 경험을 발판 삼아, 앞으로 더 나은 개발자가 되기 위해 계속해서 노력하겠습니다 :)
