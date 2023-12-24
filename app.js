const express =require('express');
const app = express();
const cors = require('cors');
const axios = require('axios')
const bodyParser = require('body-parser');
const {log} = require('console')
const Port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.post('/',async (req,res)=>{
  // console.log(req.body);

  log("get");

    const {flyTo,flyFrom,departingDate,travelClass}=req.body;
console.log(req.body);
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        // fromId: `${flyFrom}.AIRPORT`,
        // toId: `${flyTo}.AIRPORT`,
        fromId: `${flyFrom}.AIRPORT`,
        toId: `DEL.AIRPORT`,
        departDate: '2023-12-23',
        pageNo: '1',
        adults: '1',
        children: '0,17',
        currency_code: 'INR'
      },
      headers: {
        'X-RapidAPI-Key': '7c32c9e1ecmshe2440211bb42e4ep17e2ffjsn7d83a812a823',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    };

      const response = await axios.request(options);

      console.log(response.data);

      if(response.data){
        res.json(response.data)
      }
      // const root = response.data;
      // if(root.status == 200){
      //   const filterFlightData = root.results.map(item=>{
      //     console.log(item.totals.base);
      //     let flightDetails ={flightName:'',price:222,dpDate:'2023-12-21'};

      //     flightDetails.flightName = item.flight_code;
      //     flightDetails.price = item.totals;
      //     flightDetails.departureData = item.departureAirport;
      //     flightDetails.arrivalData = item.arrivalAirport;
      //     return flightDetails;
      //   })

      //   res.json({message:'success',data:filterFlightData}); 
      // }else{
      //   res.json({message:'no flights'})
      // }
})





// app.post('/',(req,res)=>{
//   console.log(req.body);
//   res.json({message:'success',data:[{flightName:'somename',price:2000},{flightName:'Othername',price:3000}]})
// })


app.listen(Port,()=>{

    console.log(`Server @${Port}`);
})