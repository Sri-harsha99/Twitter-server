const express = require('express');
const app = express()
var cors = require('cors');
const port = 3000
request = require('request')
const needle = require('needle')

app.use(cors());

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
app.get('/', async (req, res) => {
    if(req.query){
        const params = {
            'query': req.query.query + ' lang:en' + ' from:@POTUS',
            'max_results':90
        }
        if(req.query.from){
            params['start_time']=req.query.from;
        }
        if(req.query.to){
            params['end_time']=req.query.end;
        }

        const response = await needle('get', endpointUrl, params, {
            headers: {
                "User-Agent": "v2RecentSearchJS",
                "authorization": `Bearer ${'Token'}`
            }
        })
    
        if (response.body) {
            console.log(response.body)
            res.jsonp({data:response.body.data})
        } else {
            throw new Error('Unsuccessful request');
        }
       
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
