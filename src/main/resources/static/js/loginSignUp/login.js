// 로그인 예외처리(폼 제출을 막아야함)
// 1. 아이디만 입력했을 경우 -> 비밀번호를 입력해주세요.
// 2. 비밀번호만 입력했을 경우 -> 아이디를 입력해주세요.
// 3. 아이디는 맞지만 비밀번호가 틀렸을 경우 -> 잘못된 비밀번호입니다.
// 4. 아이디가 틀렸을 경우 -> 존재하지 않는 아이디입니다.
// 5. 로그인 중에 에러가 났을 경우 -> 로그인 중 오류가 발생했습니다.


$(() => {
    // model, session, request에 담겨있는 데이터 javascript에서 꺼내서 사용하기
    const loginFailMsg = $("#loginFailMsg").val();
    console.log(loginFailMsg);

    if(loginFailMsg === "idNotExist") {
        alert("존재하지 않는 아이디입니다.");
    } else if(loginFailMsg === "wrongPassword") {
        alert("잘못된 비밀번호입니다.");
    }
});
//
// $(document).ready(function () {
//     $("form.login-form").on("submit", function (event) {
//         event.preventDefault(); // 폼 제출 막기
//
//         const form = $(this);
//         const formData = form.serialize(); // 폼 데이터를 직렬화
//
//         $.ajax({
//             type: "POST",
//             url: form.attr("action"),
//             data: formData,
//             success: function (response) {
//                 if (response.redirect) {
//                     window.location.href = response.redirect; // 성공 시 리다이렉트
//                 }
//             },
//             error: function (xhr) {
//                 const response = xhr.responseJSON;
//                 if (response.error === 'idNotExist') {
//                     alert("존재하지 않는 아이디입니다.");
//                 } else if (response.error === 'wrongPassword') {
//                     alert("잘못된 비밀번호입니다.");
//                 } else {
//                     alert("로그인 중 오류가 발생했습니다.");
//                 }
//             }
//         });
//     });
// });