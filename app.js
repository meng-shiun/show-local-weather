$(document).ready(function() {

  findLocation();

  function findLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      });
    }
  }

  // Fetch OpenWeatherMap API
  function getWeather(lat, lon) {
    let url = `https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b6907d289e10d714a6e88b30761fae22`;

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        let city = `${data.name}, ${data.sys.country}`;
        let temp = data.main.temp;      // celcius
        let tempF = temp * 9 / 5 + 32;  // fahrenheit
        let des = data.weather[0].description;
        let iconID = data.weather[0].icon;
        let bgID = iconID.slice(0, 2);
        // original icon: 'http://openweathermap.org/img/w/10d.png'
        let iconImg = `images/icons/${iconID}.svg`;
        let bgImg = `images/bg/${bgID}.jpg`;

        $('#city').text(city);
        $('#temp').html(Math.floor(temp));
        $('#des').html(des);
        $('#weather-icon').attr('src', iconImg).css('display', 'inline-block');

        // Display celcius or fahrenheit
        $('.unit').on('click', 'span', function() {
          if ($(this).hasClass('celcius')) {
            $(this).parents().find('#temp').html(Math.floor(temp));
            $(this).addClass('active');
            $('.fahrenheit').removeClass('active');
          } else {
            $(this).parents().find('#temp').html(Math.floor(tempF));
            $(this).addClass('active');
            $('.celcius').removeClass('active');
          }
        })

        // Change background according to weather
        $('.background').css('background', `url('${bgImg}') no-repeat`);
      }
    });
  }


  // Get local Time
  function updateTime() {
    let date = new Date();

    let currentDate = new Intl.DateTimeFormat('en-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let currentTime = new Intl.DateTimeFormat('en-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // Format Date & Time
    currentDate = currentDate.format(date);
    currentTime = currentTime.format(date);

    $('#date').text(currentDate);
    $('#time').text(currentTime);
  }

  // Time update frequency
  setInterval(updateTime, 1000)
});
