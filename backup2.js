const express =require('express');
const app = express();
const cors = require('cors');
const axios = require('axios')
const bodyParser = require('body-parser');
const {log} = require('console')
const Port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());




app.post('/',async (req,res)=>{
  // console.log(req.body);

  log("get");

    const {flyTo,flyFrom,departingDate,travelClass}=req.body;

      const flightFairOptions =  {
        method: 'GET',
        url: 'https://flight-fare-search.p.rapidapi.com/v2/flights/',
        params: {
          from: flyFrom,
          to:flyTo,
          date:departingDate,
          adult: '1',
          child:'2',
          type: travelClass,
          currency: 'INR'
        },
        headers: {
          'X-RapidAPI-Key': '60d0aa2ef8mshf4cb21df868f8c3p1d8c58jsn6fe0a8ca066b',
          'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
        }

        
      };

      const response = await axios.request(flightFairOptions);

      // console.log(response.data);
      const root = response.data;
      if(root.status == 200){
        const filterFlightData = root.results.map(item=>{
          console.log(item.totals.base);
          let flightDetails ={flightName:'',price:222,dpDate:'2023-12-21'};

          flightDetails.flightName = item.flight_code;
          flightDetails.price = item.totals;
          flightDetails.departureData = item.departureAirport;
          flightDetails.arrivalData = item.arrivalAirport;
          return flightDetails;
        })

        res.json({message:'success',data:filterFlightData}); 
      }else{
        res.json({message:'no flights'})
      }
})





// app.post('/',(req,res)=>{
//   console.log(req.body);
//   res.json({message:'success',data:[{flightName:'somename',price:2000},{flightName:'Othername',price:3000}]})
// })


app.listen(Port,()=>{

    console.log(`Server @${Port}`);
})