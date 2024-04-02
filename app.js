
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


console.log(userInput);

// Define the URL of the API

let enter = document.querySelector('#userEnter');
enter.addEventListener( 'click', () => {
  let userInput = document.querySelector('#userInput').value;

  const regexIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  let apiUrl = '';
  if(regexIP.test(userInput)) {
    apiUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_jHlfn0h2jtaCP2pfo577RAHGNjsRy&ipAddress=' + userInput;
  } else {
    apiUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_jHlfn0h2jtaCP2pfo577RAHGNjsRy&domain=' + userInput;
  }

  // Send a GET request to the API
  fetch(apiUrl)
  .then(response => {
    // Check if the response is successful (status code 200)
    if (response.ok) {
      // Parse the JSON response
      return response.json();
    }
    // If the response is not successful, throw an error
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    // Do something with the data received from the API
    console.log(userInput);
    console.log(data);
    let latitude = data.location.lat;
    let longitude = data.location.lng;
    let ipAddress = data.ip;
    let city = data.location.city;
    let country = data.location.country;
    let timezone = data.location.timezone;
    let isp = data.isp;

    map.setView([latitude, longitude], 13);

    let ip = document.querySelector(".ipAddress");
    ip.textContent = ipAddress;

    let location = document.querySelector(".location");
    location.textContent = city + ' , ' + country;

    let timezn = document.querySelector(".timezone");
    timezn.textContent = timezone;

    let internetServiceProvider = document.querySelector(".isp");
    internetServiceProvider.textContent = isp;

  })
  .catch(error => {
    // Handle any errors that occur during the fetch operation
    console.error('There was a problem with the fetch operation:', error);
  });
})





//   var ip = "104.22.58.100";
//     var api_key = "at_jHlfn0h2jtaCP2pfo577RAHGNjsRy";
//     $(function () {
//        $.ajax({
//            url: "https://geo.ipify.org/api/v1",
//            data: {apiKey: api_key, ipAddress: ip},
//            success: function(data) {
//                $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
//            }
//        });
//     });

