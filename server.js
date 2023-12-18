const express = require('express');
const app = express();

const axios =require('axios');
const cors = require('cors');
const { log } = require('console');

app.use(cors());

app.get('/',async(req,res)=>{

    // const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
//   params: {
//     sourceAirportCode: 'BOM',
//     destinationAirportCode: 'DEL',
//     date: '2023-12-20',
//     itineraryType: 'ONE_WAY',
//     sortOrder: 'PRICE',
//     numAdults: '1',
//     numSeniors: '0',
//     classOfService: 'ECONOMY',
//     pageNumber: '1',
//     currencyCode: 'INR'
//   },
//   headers: {
//     'X-RapidAPI-Key': '7c32c9e1ecmshe2440211bb42e4ep17e2ffjsn7d83a812a823',
//     'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
//   }
// };
// const URL = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights'
// const options2 = {
//   params: {
//     sourceAirportCode: 'BOM',
//     destinationAirportCode: 'DEL',
//     date: '2023-12-20',
//     itineraryType: 'ONE_WAY',
//     sortOrder: 'PRICE',
//     numAdults: '1',
//     numSeniors: '0',
//     classOfService: 'ECONOMY',
//     pageNumber: '1',
//     currencyCode: 'INR'
//   },
//   headers: {
//     'X-RapidAPI-Key': '7c32c9e1ecmshe2440211bb42e4ep17e2ffjsn7d83a812a823',
//     'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
//   }
// }

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
//     response.data.data.flights.forEach(item=>{
//         console.log(item);
//     })
//     res.json(response.data)
// } catch (error) {
//     console.error(error);
//     res.send(error)
// }

axios.request(options).then(data=>{
  console.log(data.data.flights);
  
  res.json(data.data.data.flights)
}).catch(err=>{
  console.log(err);
})

// axios.request(URL,{
//   params:options2.params,
//   headers:options2.headers
// }).then(data=>{
//   console.log(data);
// }).catch(err=>{
//   console.log(err);
// })

//     const options = {
//         methode:'GET',
//         url:'https://iata-and-icao-codes.p.rapidapi.com/airlines',
//         params:{
//             iata_code:"{'8Y'}"
//          },
//         headers:{
//             'X-RapidAPI-Key': '7c32c9e1ecmshe2440211bb42e4ep17e2ffjsn7d83a812a823',
//             'X-RapidAPI-Host': 'iata-and-icao-codes.p.rapidapi.com'
//         }
       
//     };

//     try{
//         const response = await axios.request(options);
//         console.log(response.data);
//     }catch(error){
//         console.log(error);
//     }
// })

// app.get('/getfair',async(req,res)=>{
// const options = {
//   method: 'GET',
//   url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/getFilters',
//   params: {
//     sourceAirportCode: 'BOM',
//     destinationAirportCode: 'DEL',
//     date: '2023-12-22',
//     itineraryType: 'ONE_WAY',
//     classOfService: 'ECONOMY'
//   },
//   headers: {
//     'X-RapidAPI-Key': '7c32c9e1ecmshe2440211bb42e4ep17e2ffjsn7d83a812a823',
//     'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
//   }
// };

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
// } catch (error) {
//     console.error(error);
// }

// const options = {
//   method: 'POST',
//   url: 'https://priceline-com.p.rapidapi.com/flights/LAX/SFO/2023-12-17',
//   params: {adults: '1'},
//   headers: {
//     'X-RapidAPI-Key': '133921f45amshcaea80a9159ec51p13779cjsn6ef5df8113dd',
//     'X-RapidAPI-Host': 'priceline-com.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
//     res.send('data')
// } catch (error) {
// 	console.error("error",error);
//     res.send('error')
// }
})


const Port = process.env.PORT || 5500;
app.listen(Port,()=>{
    console.log(`Server @${Port}`);
})