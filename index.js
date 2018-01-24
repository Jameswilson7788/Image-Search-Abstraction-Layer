const express = require("express");
const app = express();
const youtube = require('youtube-node');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
const db = require('./config/db').db;
mongoose.connect(db, function (e) {
    if (e) return e;
    console.log("資料庫很優");
})
const Log = require('./models/log');

const yt = new youtube();

const token = 'AIzaSyCmXf2HcLia4bGdd1giA7Q3A6xJrUUOlzY';
yt.setKey(token);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/yt/:search', function (req, res) {
    const search = req.params.search;
    if (!req.query.offset) req.query.offset = 5;
    yt.search(search, req.query.offset, {
        pageToken: token
    }, function (e, result) {
        if (e) res.send({msg:'error'});
        const html = _.map(result.items, function mapYoutubeProps(item) {
            let result = {
                url: item.snippet.thumbnails.default.url,
                title: item.snippet.title,
                source: 'http://youtu.be/' + item.id.videoId
            };
            return result;
        })

        const log = new Log({tern:search});
        log.save();
        res.send(html);
            //   url: result.items["0"].snippet.thumbnails.default.url,
            //   snippet: result.items["0"]
    });
});

app.get('/', function (req, res) {
    res.send({
        msg: '利厚'
    });
})

app.get('/log',function(req,res){
    Log.find({},function(e,logs){
        if(e) res.send({msg:'error'});
        res.send(logs);
    })
})

app.listen(3000, function () {
    console.log('3000 很優');
})