$(() => {
    const loginFailMsg = `${loginFailMsg}`;

    if(loginFailMsg == "idNotExist") {
        alert("존재하지 않는 아이디입니다.");
    } else if(loginFailMsg == 'wrongPassword') {
        alert("잘못된 비밀번호입니다.")
    }
});