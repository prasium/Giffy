const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');
const port = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

const app = express(); //intialize express
app.set('view engine','ejs');
app.use(express.static('public'));  //to include public dir;
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html');
});

app.post('/',(req,res)=>{
  const input= req.body.searchInput;
  res.redirect("giffey?search="+input);
});



app.get('/giffey',(req,res)=>{
  const searchTerm = req.query.search;
  console.log(searchTerm);
  const searchGiphy= async(searchTerm) => {
    try{
      let url = "https://api.giphy.com/v1/gifs/search";

      const params = {
          api_key: process.env.API_KEY,
          limit: 25,
          q: searchTerm,
          lang: 'en',
          offset: 0,
          rating: 'pg-13'
        }
        const resp =await axios.get(url, {params});
        const gifs=resp.data.data;
      //  console.log(gifs);
        res.render("giffey",{'gifs':gifs});
    }catch(err){
      console.log(err);
    }
  };
  gifs={}
    searchGiphy(searchTerm);
  //  res.render('giffey',{'gifs':gifs});
});

app.listen(port,()=>{
  console.log('Listening at port:',port);
});
