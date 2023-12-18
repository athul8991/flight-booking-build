const express =require('express');
const app = express();
const cors = require('cors');
const axios = require('axios')
const bodyParser = require('body-parser')
const Port = process.env.PORT || 3000;

app.set(cors());
app.use(bodyParser.json());

app.post('/',async (req,res)=>{
    console.log(req.body);
    const options = {
          method: 'GET',
          url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
          params: {
            sourceAirportCode: 'CPH',
            destinationAirportCode: 'FCO',
            date: '2023-12-20',
            itineraryType: 'ONE_WAY',
            sortOrder: 'PRICE',
            numAdults: '1',
            numSeniors: '0',
            classOfService: 'BUSINESS',
            pageNumber: '1',
            currencyCode: 'INR'
          },
          headers: { 
            'X-RapidAPI-Key': '133921f45amshcaea80a9159ec51p13779cjsn6ef5df8113dd',
   
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
          }
        };

      const response = await axios.request(options);

      if(response.data.message ==='Success'){
        const filterFlightData = response.data.data.flights.map(item=>{

            let dataObj={flightName:'',price:2121,depDate:'2023-12-6'}

           dataObj.flightName = item.segments[0].legs[0].operatingCarrierCode.concat(item.segments[0].legs[0].flightNumber);
           dataObj.price =item.purchaseLinks[0].totalPrice;
           dataObj.depDate = item.segments[0].legs[1].departureDateTime;
           console.log(dataObj);
           return dataObj
        })
       
        if(filterFlightData.length>0){
            res.json({message : 'success',data:filterFlightData})
        }else{
            res.json({message:'No Flights'});
        }

    }else{
        res.json({message:'No Flights'});
    }
})


app.listen(Port,()=>{
    console.log(`Server @${Port}`);
})