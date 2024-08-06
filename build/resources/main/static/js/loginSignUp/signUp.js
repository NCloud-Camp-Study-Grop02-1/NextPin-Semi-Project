$(() => {
    $('.signup-container .btn .btn-outline-secondary').removeClass('btn-outline-secondary');
    $('.signup-container .btn').addClass('btn-primary mb');

    // 아이디 중복체크 여부
    let idCheck = false;
    // 닉네임 중복체크 여부
    let nicknameCheck = false;
    // 비밀번호 유효성 검사 여부
    let passwordChk = false;
    // 비밀번호 재입력 일치 여부
    let passwordReChk = false;

    // 아이디 입력받는 칸
    $('#inputId').on('blur', (e) => {
        if($('#inputId').val() === ''){
            $('#id-validate-message1').text('아이디를 입력해주세요.');
            e.preventDefault();
            return;
        }
        if($('#inputId').val().length < 5){
            $('#id-validate-message1').text('아이디는 5자 이상 입력해주세요.');
            e.preventDefault();
            return;
        }
        $('#id-validate-message1').text('');
        idCheck = true;
        // console.log("메시지 값 : " + $('#id-validate-message1').text());
    });

    // 아이디 중복체크 버튼
    $('#button-addon1').on('click', function(){
        if($("#inputId").val() == "") {
            $('#id-validate-message1').text('아이디를 입력해주세요.');
            $("#inputId").focus();
            return;
        }
        // alert('중복체크 아이디 값 : ' + tempId + '               DB 작업 필요...');
        console.log($("#signupForm").serialize());
        $.ajax({
            url: "/loginSignUp/userIdCheck.do",
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            data: $("#signupForm").serialize(),
            success: (obj) => {
                const jsonObj = JSON.parse(obj);

                if(jsonObj.userIdCheckMsg == "userIdOk") {
                    idCheck = true;
                    $("#id-validate-message2").text('사용 가능한 아이디입니다.');
                    $("#id-validate-message2").css("color", "#4098FF");
                    $("#button-addon1").attr("disabled", true);
                    return;
                }
                else {
                    idCheck = false;
                    $("#id-validate-message2").text('사용 불가능한 아이디입니다.');
                    $("#id-validate-message2").css("color", "#FF3A3A");
                    $("#inputId").focus();
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    // 중복체크 후 아이디 값이 변경되면 다시 중복체크 버튼을 활성화
    $("#inputId").on("change", (e) => {
        idCheck = false;
        $("#button-addon1").attr("disabled", false);
    });

    // 닉네임 입력받는 칸
    $('#inputNickname').on('blur', (e) => {
        if($('#inputNickname').val() === ''){
            $('#id-validate-message3').text('닉네임을 입력해주세요.');
            e.preventDefault();
            return;
        }
        if($('#inputNickname').val().length < 2){
            $('#id-validate-message3').text('닉네임은 2자 이상 입력해주세요.');
            e.preventDefault();
            return;
        }
        $('#id-validate-message3').text('');
        // console.log("메시지 값 : " + $('#id-validate-message1').text());
    });

    // 닉네임 중복체크 버튼
    $('#button-addon2').on('click', function(){
        var tempNickname = $('#inputNickname').val();
        // alert('중복체크 닉네임 값 : ' + tempNickname + '               DB 작업 필요...');
        if($("#inputNickname").val() == "") {
            $('#id-validate-message3').text('닉네임을 입력해주세요.');
            $("#inputNickname").focus();
            return;
        }

        $.ajax({
            url: "/loginSignUp/userNicknameCheck.do",
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            data: $("#signupForm").serialize(),
            success: (obj) => {
                const jsonObj = JSON.parse(obj);

                if(jsonObj.userNicknameCheckMsg == "userNicknameOk") {
                    nicknameCheck = true;
                    $("#id-validate-message4").text('사용 가능한 닉네임입니다.');
                    $("#id-validate-message4").css("color", "#4098FF");
                    $("#button-addon2").attr("disabled", true);
                    return;
                }
                else {
                    nicknameCheck = false;
                    $("#id-validate-message4").text('사용 불가능한 닉네임입니다.');
                    $("#id-validate-message4").css("color", "#FF3A3A");
                    $("#inputId").focus();
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });

    // 비밀번호 유효성 검사 메소드
    const validatePassword = (pw) => {
        return /^(?=.*[a-zA-Z])(?=.*[0-8])(?=.*[!@#$%^&*+=-]).{8,}$/.test(pw);
    }

    // 비밀번호 입력받는 칸
    $('#inputPassword').on('blur', (e) => {
        if($('#inputPassword').val() === ''){
            $('#id-validate-message5').text('비밀번호를 입력해주세요.');
            $('#id-validate-message5').css("color", "#FF3A3A");
            e.preventDefault();
            return;
        }
        // 비밀번호 유효성 검사부분
        if(!validatePassword($('#inputPassword').val())){
            $('#id-validate-message5').text('비밀번호는 영문자, 숫자, 특수문자 조합의 8자 이상으로 입력해주세요.');
            $('#id-validate-message5').css("color", "#FF3A3A");
            e.preventDefault();
            return;
        }
        else {
            passwordChk = true;
            $('#id-validate-message5').text('사용 가능한 비밀번호입니다.');
            $('#id-validate-message5').css("color", "#4098FF");
        }

        // console.log("메시지 값 : " + $('#id-validate-message1').text());
    });

    // 비밀번호 재입력받는 칸
    $('#inputPasswordChk').on('blur', (e) => {
        if($('#inputPasswordChk').val() === ''){
            $('#id-validate-message6').text('비밀번호를 재입력해주세요.');
            e.preventDefault();
            return;
        }
        if($('#inputPasswordChk').val() !== $('#inputPassword').val()){
            $('#id-validate-message6').text('비밀번호가 일치하지 않습니다.');
            e.preventDefault();
            return;
        }
        $('#id-validate-message6').text('');
        passwordReChk = true;
        // console.log("메시지 값 : " + $('#id-validate-message1').text());
    });

    // 비밀번호를 바꿨을때 다시 체크
    $("#inputPassword").on("change", (e) => {
        if($('#inputPasswordChk').val() === ''){
            $('#id-validate-message6').text('비밀번호를 재입력해주세요.');
            e.preventDefault();
            return;
        }
        if($('#inputPasswordChk').val() !== $('#inputPassword').val()){
            $('#id-validate-message6').text('비밀번호가 일치하지 않습니다.');
            e.preventDefault();
            return;
        }
        $('#id-validate-message6').text('');
        passwordReChk = true;
    });

    // 로그인창으로 다시 돌아가는 버튼
    $('#backToLogin').on('click', (e) => {
        if(idCheck || nicknameCheck || passwordChk || passwordReChk){
            e.preventDefault();
            $('#staticBackdrop').modal('show');
            // $('#staticBackdrop .modal-content').css('text-align', 'center');
        }
    });

    // 로그인 창으로 다시 돌아가는 메소드
    $('#modalYes').on('click', function(){
        $('#signupForm')[0].reset();
        location.replace('login');
    });

    $("#signupForm").on("submit", (e) => {
        // 사용자가 아이디 중복체크를 안했을 경우
        if(!idCheck) {
            // submit을 막음
            e.preventDefault();
            alert("아이디 중복체크를 진행해주세요.");
            return
        }

        // 사용자가 닉네임 중복체크를 안했을 경우
        if(!nicknameCheck) {
            e.preventDefault();
            alert("닉네임 중복체크를 진행해주세요.")
            return;
        }

        // 사용자가 비밀번호 유효성 검사를 만족하지 않음에도 버튼을 눌렀을 경우
        if(!passwordChk) {
            e.preventDefault();
            alert("비밀번호는 영문자, 숫자, 특수문자 조합의 8자 이상으로 입력해주세요.");
            $("#inputPassword").focus();
            return;
        }

        // 사용자가 비밀번호가 일치하지 않음에도 버튼을 눌렀을 경우
        if(!passwordReChk) {
            e.preventDefault();
            alert("비밀번호가 일치하지 않습니다.");
            $("#inputPasswordChk").focus();
            return;
        }

        // 모든 조건이 만족되는 경우 서버로 전송
        if(idCheck && nicknameCheck && passwordChk && passwordReChk) {
            alert("정상적으로 회원가입 되었습니다. 로그인 화면에서 새롭게 로그인해주십시오.");
        }
    });
});