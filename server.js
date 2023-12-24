const express =require('express');




const app = express();

const cors = require('cors');

const axios = require('axios')
const bodyParser = require('body-parser')
const Port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/',async (req,res)=>{

  console.log("get");

    const {flyTo,flyFrom,departingDate,travelClass,adultsNum,childNum}=req.body;
    console.log(req.body);

    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        sourceAirportCode: flyFrom,
        destinationAirportCode: flyTo,
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
        'X-RapidAPI-Key': '991b359669mshd0c10deb3b5ab7ap117f5ejsn4165a2913da6',
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
        type: travelClass,
        currency: 'INR'
      },
      headers: {

        'X-RapidAPI-Key': '991b359669mshd0c10deb3b5ab7ap117f5ejsn4165a2913da6',
        'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
  
      }

      
    };

      const response = await axios.request(options);
      const flightFareResponse = await axios.request(flightFairOptions);
      // console.log(response);
      // console.log(response.data);
      // res.json(response.data)

      if(response.data.message ==='Success'){
        console.log(flightFareResponse.data);

        // res.json(flightFareResponse.data)

        const filterFlightData = response.data.data.flights.map(item=>{
           let dataObj={flightName:'',price:2121,depDate:'2023-12-6',arrivalDate:'2023-12-06',depCity:flyFrom,arrivalCity:flyTo}

           dataObj.flightName = item.segments[0].legs[0].operatingCarrierCode.concat(item.segments[0].legs[0].flightNumber);
           dataObj.price =item.purchaseLinks[0].totalPrice;
           dataObj.depDate =  item.segments[0].legs[0].departureDateTime;
           dataObj.arrivalDate = item.segments[0].legs[0].arrivalDateTime

           if(flightFareResponse.data.results){
           dataObj.depCity = flightFareResponse.data.results[0].departureAirport.city,
           dataObj.arrivalCity = flightFareResponse.data.results[0].arrivalAirport.city
           }
          //  console.log(dataObj);
           return dataObj
        })
        // console.log(filterFlightData);
       
        if(filterFlightData.length>0){
            return res.json({message : 'success',data:filterFlightData});
        }else{
            res.json({message:'No Flights',data:[]});
        }

    }else{
        res.json({message:'No Flights',data:[]});
    }
})

// app.post('/',(req,res)=>{
//   console.log(req.body);
//   res.json({message:'success',data:[{flightName:'somename',price:2000},{flightName:'Othername',price:3000}]})
// })


app.listen(Port,()=>{

    console.log(`Server @${Port}`);
})