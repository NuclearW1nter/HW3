class Masteries_decoder{
    constructor (masteries_data){
        this.masters = masteries_data;
        this.mast_champ = new Map();
        var champid;
        var mastLvl;
        for (let iterator of this.masters ){
            for (let tags in iterator){
                if (tags == "championLevel" ) {
                    mastLvl = iterator[tags];
                }
                else if (tags == "championId") {
                    champid = iterator[tags];
                }
            }
            this.mast_champ.set(champid,mastLvl);
        }
    }
    mapReturn()
    {
        return this.mast_champ;
    }
}
class LoL_Data {
    constructor (wanted_data){
        this.champ_data = wanted_data;
        for (let FirstLayer in this.champ_data)
        {
            if (FirstLayer === "data")
            {
                this.Lol_champs = this.champ_data[FirstLayer];
            }
        }
    }

    Class_count(class_wanted)
    {
        var Lol_champs;

        let total_of_class = 0;
        let class_to_find = class_wanted;
        for (let champ_name in this.Lol_champs)
        {
            let Specific_Champ =  this.Lol_champs[champ_name];
            for (var specific_info in Specific_Champ)
            {
                if (specific_info === "tags")
                {
                    for (let Class_found of Specific_Champ[specific_info])
                    {
                        if (Class_found == class_to_find)
                        {
                            total_of_class++;
                        }
                    }
                }
            }
        }
        return total_of_class;
    }
    Certain_champ(want_to_find)
    {
        for (let champ_name in this.Lol_champs)
        {
            if(champ_name == want_to_find)
            {
                return this.Lol_champs[champ_name];
            }
        }
    }
    listOfChamps()
    {
        var list_champ_names = [];
        for (let champ_name in this.Lol_champs) {
            list_champ_names.push(champ_name);
        }
        return list_champ_names;
    }

    Base_stats_of_champ(stat_to_find)
    {
        var total_stf = 0;
        for (let champ_name in this.Lol_champs)
        {
            let Specific_Champ =  this.Lol_champs[champ_name];
            for (var specific_info in Specific_Champ)
            {
                if (specific_info === "stats")
                {
                    for (let stat_found in Specific_Champ[specific_info])
                    {
                        if (stat_found == stat_to_find)
                        {
                            total_stf += Specific_Champ[specific_info][stat_found];
                        }
                    }
                }
            }
        }
        return total_stf;
    }
    Info_Of_champs(info_to_be_found)
    {
        var list_champ_names = new Map();
        for (let champ_name in this.Lol_champs)
        {
            let Specific_Champ =  this.Lol_champs[champ_name];
            for (var specific_info in Specific_Champ)
            {
                if (specific_info === "info")
                {
                    for (let info_found in Specific_Champ[specific_info])
                    {
                        if (info_found == "difficulty" && info_to_be_found == "difficulty")
                        {
                            if (Specific_Champ[specific_info][info_found] > 6)
                            {
                                list_champ_names.set(champ_name,"This champ is difficult based on game designers");
                            }
                        }
                    }
                }
            }
        }
        return list_champ_names;
    }

}

const express = require('express');
const app = express();
var fetch = require('node-fetch');
var masteries_storage;
var champ_storage;
var champList= [];
var mastList = new Map();
var promise;
var difficultChamps = new Map();
var championName = ' ';
app.listen(3000, function () {
    console.log(' app listening on port 3000!')
});
Promise.all([fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json'),
    fetch('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/24395066?api_key=RGAPI-96dabba7-12a9-444e-be94-d57411f0c0ae')])
    .then((res) => {
    return Promise.all([res[0].json(), res[1].json()]);
}).then((json) =>
{
    masteries_storage = json[1];
    champ_storage = json[0];
}).catch(function (e) {
    console.log("There was some sort of error");
    console.log(e);
});


app.route('/')
    .get(function (req, res) {
        promise = new Promise(function (resolve,reject) {
            if (champList.length == 0 && mastList.size == 0){
                champList = new LoL_Data(champ_storage).listOfChamps();
                mastList = new Masteries_decoder(masteries_storage).mapReturn();
                resolve("successful");
            }
            else if (champList.length > 0){
                resolve("successful");
            }
            else{
                reject("Already made");
            }
        })
        .then(function (resolve) {
            console.log(champList);
            console.log(mastList);
            res.send(champList);
        });
    });
app.route('/champs/list')
    .get(function (req,res) {
        console.log(champList.length);
        promise = new Promise(function (resolve,reject) {
            if (champList.length == 0 && mastList.size == 0){
                champList = new LoL_Data(champ_storage).listOfChamps();
                mastList = new Masteries_decoder(masteries_storage).mapReturn();
                resolve("successful");
            }
            else if (champList.length > 0){
                resolve("successful");
            }
            else{
                reject("Already made");
            }
        })
        .then(function (resolve) {
            res.send(champList)
        })

    });
app.route('/champs/list/:champid')
    .all(function (req, res, next){
        promise = new Promise(function (resolve,reject) {
            if (champList.length == 0 && mastList.size == 0){
                champList = new LoL_Data(champ_storage).listOfChamps();
                mastList = new Masteries_decoder(masteries_storage).mapReturn();
                resolve("successful");
            }
            else if (champList.length > 0){
                resolve("successful");
                console.log(champList.length);
            }
            else{
                reject("Already made");
            }
        })
        next();
    })
    .get(function (req, res){
        res.send(`So you would like to add ${req.params.champid} do think that is the name of the next champion???? ${champList}`);
    })
    .post(function (req, res) {
        Promise.all([fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')])
            .then((res) => {
            return Promise.all([res[0].json()]);
    }).then((json) =>
        {
        champ_storage = json[0];
        champList = new LoL_Data(champ_storage).listOfChamps();
    }).catch(function (e) {
            console.log("There was some sort of error");
            console.log(e);
    });
        res.send("You have just updated this list with the most recent champs.")

    })
    .put(function (req, res) {
        champList.push(req.params.champid);
        res.send(`You have added ${req.params.champid}. Good for you!!!!`);

    })
    .delete(function (req, res) {
        let index = champList.indexOf(req.params.champid);
        if (index == 0){
            champList = champList.splice(1,champList.length);
        }
        else if (index == champList.length){
            champList.pop();
        }
        else{
            let frontTemp = champList.splice(0, index);
            let backTemp = champList.splice(1,champList.length);
            champList = frontTemp.concat(backTemp);
        }
        res.send(`You have removed ${req.params.champid}`);
    });
app.route('/:stat/average')
    .get(function (req, res) {
        var baseStatTotal = 0;
        promise = new Promise(function (resolve,reject) {
            if (baseStatTotal == 0){
                baseStatTotal = new LoL_Data(champ_storage).Base_stats_of_champ(req.params.stat);
                resolve("successful");
            }
            else if (baseStatTotal >0) {
                resolve("successful");
            }
            else{
                reject("Already made");
            }
        })
        res.send(`The average ${req.params.stat} for the champions is ${baseStatTotal/134}`)
    });

app.get('/champs/difficult',function (req,res) {
    var difficultChamps = new Map();
    promise = new Promise(function (resolve,reject) {
        if (difficultChamps.size == 0){
            difficultChamps = new LoL_Data(champ_storage).Info_Of_champs("difficulty");
            resolve("successful");
        }
        else if (difficultChamps.size >0) {
            resolve("successful");
        }
        else{
            reject("Already made");
        }
    })
    var stringFrom = '';
    var mapIter = difficultChamps.entries();
    for (let i = 0; i< difficultChamps.size; i++)
    {
        stringFrom += mapIter.next().value + '.  ';
    }
    res.send(`Here are the difficul champs ${stringFrom}`);
});
app.route('/champs/difficult/:champid')
    .all(function (req,res,next) {
        promise = new Promise(function (resolve,reject) {
            if (difficultChamps.size == 0){
                difficultChamps = new LoL_Data(champ_storage).Info_Of_champs("difficulty");
                resolve("successful");
            }
            else if (difficultChamps.size >0) {
                resolve("successful");
            }
            else{
                reject("Already made");
            }
        })
        next();
    })
    .get(function (req,res) {
        var stringFrom = '';
        var mapIter = difficultChamps.entries();
        for (let i = 0; i< difficultChamps.size; i++)
        {
            stringFrom += mapIter.next().value + '.  ';
        }
        res.send(`Here are the difficul champs ${stringFrom}`);
    })
    .put(function (req,res) {
        difficultChamps.set(req.params.champid,"This champion is on this list because you thought they where hard");
        var stringFrom = '';
        var mapIter = difficultChamps.entries();
        for (let i = 0; i< difficultChamps.size; i++)
        {
            stringFrom += mapIter.next().value + '.  ';
        }
        res.send(`Here is the list of difficult champions added with your champ ${stringFrom}`);

    });
app.route('/champs/list/:champid')
    .all(function (req, res, next){
        promise = new Promise(function (resolve,reject) {
            if (typeof(championName) == undefined || championName == ' '){
                championName = new LoL_Data(champ_storage).Certain_champ(req.params.champid);
                resolve("successful");
            }
            else if (championName != ' '){
                resolve("successful");
                console.log(champList.length);
            }
            else{
                reject("Already made");
            }
        })
        next();
    })
    .get(function (req, res){
        res.send(`So you would like to add ${req.params.champid} do think that is the name of the next champion???? ${champList}`);
    })
    .post(function (req, res) {
        Promise.all([fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')])
            .then((res) => {
            return Promise.all([res[0].json()]);
    }).then((json) =>
        {
            champ_storage = json[0];
        champList = new LoL_Data(champ_storage).listOfChamps();
    }).catch(function (e) {
            console.log("There was some sort of error");
            console.log(e);
        });