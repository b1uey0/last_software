    // 현재 날짜와 시간을 갱신하는 함수
    function updateDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      // HTML 엘리먼트에 값 할당
      document.getElementById('currentDate').innerText = `${year}년 ${month}월 ${day}일`;
      document.getElementById('currentDay').innerText = dayOfWeek + '요일';
      document.getElementById('currentTime').innerText = `AM ${hours}:${minutes}:${seconds}`;
  }

  // 페이지 로드 시 현재 날짜와 시간 설정
  window.onload = function() {
      updateDateTime();

      // 1초마다 갱신
      setInterval(updateDateTime, 1000);
  };