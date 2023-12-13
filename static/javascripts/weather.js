const getJSON = function(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
      const status = xhr.status;
      if (status === 200) {
          callback(null, xhr.response);
      } else {
          callback(status, xhr.response);
      }
  };
  xhr.send();
};

getJSON('http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=c71420f8bc36840e2adebaafc654bc8a&units=metric', function(err, data) {
  if (err !== null) {
      alert('예상치 못한 오류 발생.' + err);
  } else {
      // 최고 기온과 최저 기온을 가져와 HTML 엘리먼트에 할당
      document.getElementById('maxTemperature').innerText += `${data.main.temp_max}°`;
      document.getElementById('minTemperature').innerText += `${data.main.temp_min}°`;
  }
});