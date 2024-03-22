require('dotenv').config()
const express =require('express');
const app = express();
const cors = require('cors');
const axios = require('axios')
const bodyParser = require('body-parser')
const to = require('to-case');
const path = require('path')
const Port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('./dist'))
app.post('/api',async (req,res)=>{

  console.log("get");

    const {flyTo,flyFrom,departingDate,travelClass,adultsNum,childNum}=req.body;
    console.log(req.body);
    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        sourceAirportCode: flyFrom.toUpperCase(),
        destinationAirportCode: flyTo.toUpperCase(),
        date: departingDate,
        itineraryType: 'ONE_WAY',
        sortOrder: 'PRICE',
        numAdults: adultsNum,
        numSeniors: childNum,
        classOfService: travelClass,
        pageNumber: '1',
        currencyCode: 'INR'
      },
      headers: {
        'X-RapidAPI-Key': process.env.SRCH_FLT_KEY,
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
      }
    };

    const flightFairOptions =  {
      method: 'GET',
      url: 'https://flight-fare-search.p.rapidapi.com/v2/flights/',
      params: {
        from: flyFrom,
        to:flyTo,
        date:departingDate,
        adult: '1',
        child:'2',
        type: 'economy',
        currency: 'INR'
      },
      headers: {

        'X-RapidAPI-Key': process.env.FLT_FARE_KEY,
        'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
  
      }

      
    };

      const response = await axios.request(options);
      let flightFairResponse;
      let flag=false

      axios.request(flightFairOptions).then(data=>{
        flag =true;
        flightFairResponse = data;
        console.log(data);
      }).catch(err=>{
        console.log(err);
        flag = false


      })
    

      if(response.data.message ==='Success'){
       

        const filterFlightData = response.data.data.flights.map(item=>{
           let dataObj={flightName:'',price:2121,depDate:'2023-12-6',arrivalDate:'2023-12-06',depCity:flyFrom,arrivalCity:flyTo}

           dataObj.flightName = item.segments[0].legs[0].operatingCarrierCode.concat(item.segments[0].legs[0].flightNumber);
           dataObj.price =item.purchaseLinks[0].totalPrice;
           dataObj.depDate =  item.segments[0].legs[0].departureDateTime;
           dataObj.arrivalDate = item.segments[0].legs[0].arrivalDateTime

           if( flag&& flightFareResponse.data.results){
           dataObj.depCity = flightFareResponse.data.results[0].departureAirport.city,
           dataObj.arrivalCity = flightFareResponse.data.results[0].arrivalAirport.city
           }
        
           return dataObj
        })
       
       
        if(filterFlightData.length>0){
            return res.json({message : 'success',data:filterFlightData});
        }else{
            res.json({message:'No Flights',data:[]});
        }

    }else{
        res.json({message:'No Flights',data:[]});
    }
})

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));


})

app.listen(Port,()=>{

    console.log(`Server @${Port}`);
})