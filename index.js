const express = require('express');
const app = express();
const https = require('https');
app.get('/hyderabad', (req, res) => {
  const url = 'https://api.tomorrow.io/v4/weather/realtime?location=hyderabad&apikey=jdPUgizU2oe19VUjWRGz0rqUu5t0APxG';

  https.get(url, (response) => {
    response.on('data', (data) => {
      const dataa = JSON.parse(data);
      res.write("<p style=text-align:center >Location : " + dataa.location.name);
      res.write("<p style=text-align:center  >Temperature : " + dataa.data.values.temperature + " Degree Celcius");
      res.write("<p style=text-align:center  >Humidity : " + dataa.data.values.humidity);
      res.write("<p style=text-align:center  >Wind Speed : " + dataa.data.values.windSpeed + "mts/s");
    })


  })
});
app.get('/toronto', (req, res) => {
  const url = 'https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=jdPUgizU2oe19VUjWRGz0rqUu5t0APxG';

  https.get(url, (response) => {
    response.on('data', (data) => {
      const dataa = JSON.parse(data);
      res.write("<p style=text-align:center>Location : " + dataa.location.name);
      res.write("<p style=text-align:center>Temperature : " + dataa.data.values.temperature + " Degree Celcius");
      res.write("<p style=text-align:center >Humidity : " + dataa.data.values.humidity);
      res.write("<p style=text-align:center  >Wind Speed : " + dataa.data.values.windSpeed + "mts/s");
    })


  })
});
app.get('/texas', (req, res) => {
  const url = 'https://api.tomorrow.io/v4/weather/realtime?location=texas&apikey=jdPUgizU2oe19VUjWRGz0rqUu5t0APxG';

  https.get(url, (response) => {
    response.on('data', (data) => {
      const dataa = JSON.parse(data);
      res.write("<p style=text-align:center >Location : " + dataa.location.name);
      res.write("<p style=text-align:center>Temperature : " + dataa.data.values.temperature + " Degree Celcius");
      res.write("<p style=text-align:center >Humidity : " + dataa.data.values.humidity);
      res.write("<p style=text-align:center  >Wind Speed : " + dataa.data.values.windSpeed + "mts/s");
    })


  })
});
app.get('/palastine', (req, res) => {
  const url = 'https://api.tomorrow.io/v4/weather/realtime?location=palastine&apikey=jdPUgizU2oe19VUjWRGz0rqUu5t0APxG';

  https.get(url, (response) => {
    response.on('data', (data) => {
      const dataa = JSON.parse(data);
      res.write("<p style=text-align:center>Location : " + dataa.location.name);
      res.write("<p style=text-align:center >Temperature : " + dataa.data.values.temperature + " Degree Celcius");
      res.write("<p style=text-align:center  >Humidity : " + dataa.data.values.humidity);
      res.write("<p style=text-align:center  >Wind Speed : " + dataa.data.values.windSpeed + "mts/s");
    })


  })
});
app.get('/sydney', (req, res) => {
  const url = 'https://api.tomorrow.io/v4/weather/realtime?location=sydney&apikey=jdPUgizU2oe19VUjWRGz0rqUu5t0APxG';

  https.get(url, (response) => {
    response.on('data', (data) => {
      const dataa = JSON.parse(data);
      res.write("<p style=text-align:center >Location : " + dataa.location.name);
      res.write("<p style=text-align:center >Temperature : " + dataa.data.values.temperature + " Degree Celcius");
      res.write("<p style=text-align:center >Humidity : " + dataa.data.values.humidity);
      res.write("<p style=text-align:center  >Wind Speed : " + dataa.data.values.windSpeed + "mts/s");
    })


  })
});



app.listen(9000, () => {
  console.log('Listning to port 9000!!');
})