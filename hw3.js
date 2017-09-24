const express = require('express');
const app = express();
var fetch = require('node-fetch');

Promise.all([fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json'),
    fetch('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/24395066?api_key=RGAPI-96dabba7-12a9-444e-be94-d57411f0c0ae')])
    .then((res) => {
    return Promise.all([res[0].json(), res[1].json()]);
}).then((json) =>
{
    console.log(json);
}
);



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
    Info_Of_champs(info_to_be_found)
    {
        var list_champ_names = [];
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
                                list_champ_names.push(champ_name);
                            }
                        }
                        if (info_found == "attack" && info_to_be_found == "attack")
                        {
                            if (Specific_Champ[specific_info][info_found] <= 4)
                            {
                                list_champ_names.push(champ_name);
                            }
                        }
                        else if (info_found == "defense" && info_to_be_found == "defense")
                        {
                            if (Specific_Champ[specific_info][info_found] >= 6 )
                            {
                                list_champ_names.push(champ_name);
                            }
                        }
                    }
                }
            }
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
                        if (stat_found == "hp" && stat_to_find == "hp")
                        {
                            if (Specific_Champ[specific_info][stat_found] > 600)
                            {
                                total_stf++;
                            }
                        }
                        if (stat_found == "mpperlevel" && stat_to_find == "mpperlevel")
                        {
                            if (Specific_Champ[specific_info][stat_found] > 0.5) { total_stf++; }
                        }
                    }
                }
            }
        }
        return total_stf;
    }
}