// 구글 지도 API 불러오기. 추후 카맵 API로 수정 예정


// 유저들의 코스 하트 누르기
function toggleHeart(button) {
  const heartImage = button.querySelector('img');
  const heartCount = button.querySelector('span');
  const isLiked = heartImage.src.includes('../images/icon_heart_after.png');

  if (isLiked) {
      heartImage.src = '../images/icon_heart_before.png';
      heartCount.textContent = parseInt(heartCount.textContent) - 1;
  } else {
      heartImage.src = '../images/icon_heart_after.png';
      heartCount.textContent = parseInt(heartCount.textContent) + 1;
  }
}
