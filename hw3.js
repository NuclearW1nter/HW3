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
    Info_Of_champs_diff(info_to_be_found)
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
var champRawData;
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
masteries_storage = [{"playerId":24395066,"championId":37,"championLevel":6,"championPoints":57331,"lastPlayTime":1505853944000,"championPointsSinceLastLevel":35731,"championPointsUntilNextLevel":0,"chestGranted":true,"tokensEarned":1},{"playerId":24395066,"championId":74,"championLevel":5,"championPoints":33384,"lastPlayTime":1503507516000,"championPointsSinceLastLevel":11784,"championPointsUntilNextLevel":0,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":101,"championLevel":5,"championPoints":23689,"lastPlayTime":1501951080000,"championPointsSinceLastLevel":2089,"championPointsUntilNextLevel":0,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":115,"championLevel":4,"championPoints":21197,"lastPlayTime":1505852334000,"championPointsSinceLastLevel":8597,"championPointsUntilNextLevel":403,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":9,"championLevel":4,"championPoints":19836,"lastPlayTime":1504995960000,"championPointsSinceLastLevel":7236,"championPointsUntilNextLevel":1764,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":8,"championLevel":4,"championPoints":18577,"lastPlayTime":1504911562000,"championPointsSinceLastLevel":5977,"championPointsUntilNextLevel":3023,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":33,"championLevel":4,"championPoints":18276,"lastPlayTime":1503248971000,"championPointsSinceLastLevel":5676,"championPointsUntilNextLevel":3324,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":36,"championLevel":4,"championPoints":17334,"lastPlayTime":1503433993000,"championPointsSinceLastLevel":4734,"championPointsUntilNextLevel":4266,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":45,"championLevel":4,"championPoints":16951,"lastPlayTime":1503010678000,"championPointsSinceLastLevel":4351,"championPointsUntilNextLevel":4649,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":26,"championLevel":4,"championPoints":16145,"lastPlayTime":1504394928000,"championPointsSinceLastLevel":3545,"championPointsUntilNextLevel":5455,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":236,"championLevel":4,"championPoints":15177,"lastPlayTime":1502732560000,"championPointsSinceLastLevel":2577,"championPointsUntilNextLevel":6423,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":38,"championLevel":4,"championPoints":15044,"lastPlayTime":1502911560000,"championPointsSinceLastLevel":2444,"championPointsUntilNextLevel":6556,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":111,"championLevel":4,"championPoints":14991,"lastPlayTime":1503608350000,"championPointsSinceLastLevel":2391,"championPointsUntilNextLevel":6609,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":161,"championLevel":4,"championPoints":14563,"lastPlayTime":1503492428000,"championPointsSinceLastLevel":1963,"championPointsUntilNextLevel":7037,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":29,"championLevel":4,"championPoints":14364,"lastPlayTime":1502669939000,"championPointsSinceLastLevel":1764,"championPointsUntilNextLevel":7236,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":14,"championLevel":4,"championPoints":14215,"lastPlayTime":1503418740000,"championPointsSinceLastLevel":1615,"championPointsUntilNextLevel":7385,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":27,"championLevel":4,"championPoints":13685,"lastPlayTime":1502975099000,"championPointsSinceLastLevel":1085,"championPointsUntilNextLevel":7915,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":57,"championLevel":4,"championPoints":13660,"lastPlayTime":1506113816000,"championPointsSinceLastLevel":1060,"championPointsUntilNextLevel":7940,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":86,"championLevel":4,"championPoints":13242,"lastPlayTime":1506112489000,"championPointsSinceLastLevel":642,"championPointsUntilNextLevel":8358,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":163,"championLevel":4,"championPoints":12865,"lastPlayTime":1504736978000,"championPointsSinceLastLevel":265,"championPointsUntilNextLevel":8735,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":30,"championLevel":3,"championPoints":12380,"lastPlayTime":1504271827000,"championPointsSinceLastLevel":6380,"championPointsUntilNextLevel":220,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":50,"championLevel":3,"championPoints":12376,"lastPlayTime":1505072984000,"championPointsSinceLastLevel":6376,"championPointsUntilNextLevel":224,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":16,"championLevel":3,"championPoints":12367,"lastPlayTime":1506025003000,"championPointsSinceLastLevel":6367,"championPointsUntilNextLevel":233,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":4,"championLevel":3,"championPoints":11618,"lastPlayTime":1503770122000,"championPointsSinceLastLevel":5618,"championPointsUntilNextLevel":982,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":44,"championLevel":3,"championPoints":11601,"lastPlayTime":1500126796000,"championPointsSinceLastLevel":5601,"championPointsUntilNextLevel":999,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":40,"championLevel":3,"championPoints":11091,"lastPlayTime":1505943508000,"championPointsSinceLastLevel":5091,"championPointsUntilNextLevel":1509,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":89,"championLevel":3,"championPoints":10992,"lastPlayTime":1504993316000,"championPointsSinceLastLevel":4992,"championPointsUntilNextLevel":1608,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":79,"championLevel":3,"championPoints":10750,"lastPlayTime":1505500888000,"championPointsSinceLastLevel":4750,"championPointsUntilNextLevel":1850,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":10,"championLevel":3,"championPoints":10510,"lastPlayTime":1502659835000,"championPointsSinceLastLevel":4510,"championPointsUntilNextLevel":2090,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":35,"championLevel":3,"championPoints":10244,"lastPlayTime":1503181255000,"championPointsSinceLastLevel":4244,"championPointsUntilNextLevel":2356,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":41,"championLevel":3,"championPoints":10118,"lastPlayTime":1502402210000,"championPointsSinceLastLevel":4118,"championPointsUntilNextLevel":2482,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":77,"championLevel":3,"championPoints":10055,"lastPlayTime":1493335931000,"championPointsSinceLastLevel":4055,"championPointsUntilNextLevel":2545,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":31,"championLevel":3,"championPoints":10026,"lastPlayTime":1505851359000,"championPointsSinceLastLevel":4026,"championPointsUntilNextLevel":2574,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":106,"championLevel":3,"championPoints":9916,"lastPlayTime":1503782282000,"championPointsSinceLastLevel":3916,"championPointsUntilNextLevel":2684,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":59,"championLevel":3,"championPoints":9911,"lastPlayTime":1503167755000,"championPointsSinceLastLevel":3911,"championPointsUntilNextLevel":2689,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":42,"championLevel":3,"championPoints":9752,"lastPlayTime":1504547000000,"championPointsSinceLastLevel":3752,"championPointsUntilNextLevel":2848,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":43,"championLevel":3,"championPoints":9417,"lastPlayTime":1506023351000,"championPointsSinceLastLevel":3417,"championPointsUntilNextLevel":3183,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":32,"championLevel":3,"championPoints":9035,"lastPlayTime":1505427238000,"championPointsSinceLastLevel":3035,"championPointsUntilNextLevel":3565,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":201,"championLevel":3,"championPoints":8983,"lastPlayTime":1504126421000,"championPointsSinceLastLevel":2983,"championPointsUntilNextLevel":3617,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":63,"championLevel":3,"championPoints":8928,"lastPlayTime":1503094147000,"championPointsSinceLastLevel":2928,"championPointsUntilNextLevel":3672,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":75,"championLevel":3,"championPoints":8851,"lastPlayTime":1503354369000,"championPointsSinceLastLevel":2851,"championPointsUntilNextLevel":3749,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":3,"championLevel":3,"championPoints":8499,"lastPlayTime":1506190985000,"championPointsSinceLastLevel":2499,"championPointsUntilNextLevel":4101,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":6,"championLevel":3,"championPoints":8440,"lastPlayTime":1503583955000,"championPointsSinceLastLevel":2440,"championPointsUntilNextLevel":4160,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":17,"championLevel":3,"championPoints":8233,"lastPlayTime":1502133238000,"championPointsSinceLastLevel":2233,"championPointsUntilNextLevel":4367,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":28,"championLevel":3,"championPoints":8180,"lastPlayTime":1502643628000,"championPointsSinceLastLevel":2180,"championPointsUntilNextLevel":4420,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":34,"championLevel":3,"championPoints":8168,"lastPlayTime":1504364802000,"championPointsSinceLastLevel":2168,"championPointsUntilNextLevel":4432,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":96,"championLevel":3,"championPoints":8115,"lastPlayTime":1504214906000,"championPointsSinceLastLevel":2115,"championPointsUntilNextLevel":4485,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":51,"championLevel":3,"championPoints":7942,"lastPlayTime":1501875625000,"championPointsSinceLastLevel":1942,"championPointsUntilNextLevel":4658,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":68,"championLevel":3,"championPoints":7588,"lastPlayTime":1506189858000,"championPointsSinceLastLevel":1588,"championPointsUntilNextLevel":5012,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":80,"championLevel":3,"championPoints":7379,"lastPlayTime":1503500219000,"championPointsSinceLastLevel":1379,"championPointsUntilNextLevel":5221,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":72,"championLevel":3,"championPoints":7287,"lastPlayTime":1503257204000,"championPointsSinceLastLevel":1287,"championPointsUntilNextLevel":5313,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":54,"championLevel":3,"championPoints":7015,"lastPlayTime":1504045185000,"championPointsSinceLastLevel":1015,"championPointsUntilNextLevel":5585,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":134,"championLevel":3,"championPoints":7011,"lastPlayTime":1505946789000,"championPointsSinceLastLevel":1011,"championPointsUntilNextLevel":5589,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":18,"championLevel":3,"championPoints":6871,"lastPlayTime":1500165803000,"championPointsSinceLastLevel":871,"championPointsUntilNextLevel":5729,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":11,"championLevel":3,"championPoints":6805,"lastPlayTime":1503105166000,"championPointsSinceLastLevel":805,"championPointsUntilNextLevel":5795,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":25,"championLevel":3,"championPoints":6665,"lastPlayTime":1504646644000,"championPointsSinceLastLevel":665,"championPointsUntilNextLevel":5935,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":53,"championLevel":3,"championPoints":6587,"lastPlayTime":1505430162000,"championPointsSinceLastLevel":587,"championPointsUntilNextLevel":6013,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":13,"championLevel":3,"championPoints":6571,"lastPlayTime":1504385323000,"championPointsSinceLastLevel":571,"championPointsUntilNextLevel":6029,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":268,"championLevel":3,"championPoints":6278,"lastPlayTime":1497552731000,"championPointsSinceLastLevel":278,"championPointsUntilNextLevel":6322,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":117,"championLevel":2,"championPoints":5832,"lastPlayTime":1506117384000,"championPointsSinceLastLevel":4032,"championPointsUntilNextLevel":168,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":126,"championLevel":2,"championPoints":5747,"lastPlayTime":1503539226000,"championPointsSinceLastLevel":3947,"championPointsUntilNextLevel":253,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":114,"championLevel":2,"championPoints":5728,"lastPlayTime":1502747985000,"championPointsSinceLastLevel":3928,"championPointsUntilNextLevel":272,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":1,"championLevel":2,"championPoints":5562,"lastPlayTime":1505499120000,"championPointsSinceLastLevel":3762,"championPointsUntilNextLevel":438,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":267,"championLevel":2,"championPoints":5498,"lastPlayTime":1506195024000,"championPointsSinceLastLevel":3698,"championPointsUntilNextLevel":502,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":22,"championLevel":2,"championPoints":5498,"lastPlayTime":1503430688000,"championPointsSinceLastLevel":3698,"championPointsUntilNextLevel":502,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":103,"championLevel":2,"championPoints":5401,"lastPlayTime":1503776106000,"championPointsSinceLastLevel":3601,"championPointsUntilNextLevel":599,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":420,"championLevel":2,"championPoints":5316,"lastPlayTime":1502642391000,"championPointsSinceLastLevel":3516,"championPointsUntilNextLevel":684,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":7,"championLevel":2,"championPoints":5286,"lastPlayTime":1504641013000,"championPointsSinceLastLevel":3486,"championPointsUntilNextLevel":714,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":19,"championLevel":2,"championPoints":5277,"lastPlayTime":1504366216000,"championPointsSinceLastLevel":3477,"championPointsUntilNextLevel":723,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":498,"championLevel":2,"championPoints":5151,"lastPlayTime":1504560311000,"championPointsSinceLastLevel":3351,"championPointsUntilNextLevel":849,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":99,"championLevel":2,"championPoints":5027,"lastPlayTime":1504467977000,"championPointsSinceLastLevel":3227,"championPointsUntilNextLevel":973,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":427,"championLevel":2,"championPoints":4943,"lastPlayTime":1501613657000,"championPointsSinceLastLevel":3143,"championPointsUntilNextLevel":1057,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":5,"championLevel":2,"championPoints":4828,"lastPlayTime":1497468321000,"championPointsSinceLastLevel":3028,"championPointsUntilNextLevel":1172,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":119,"championLevel":2,"championPoints":4811,"lastPlayTime":1503432133000,"championPointsSinceLastLevel":3011,"championPointsUntilNextLevel":1189,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":223,"championLevel":2,"championPoints":4713,"lastPlayTime":1505424783000,"championPointsSinceLastLevel":2913,"championPointsUntilNextLevel":1287,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":497,"championLevel":2,"championPoints":4588,"lastPlayTime":1506196707000,"championPointsSinceLastLevel":2788,"championPointsUntilNextLevel":1412,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":76,"championLevel":2,"championPoints":4392,"lastPlayTime":1503106614000,"championPointsSinceLastLevel":2592,"championPointsUntilNextLevel":1608,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":92,"championLevel":2,"championPoints":4377,"lastPlayTime":1502646549000,"championPointsSinceLastLevel":2577,"championPointsUntilNextLevel":1623,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":113,"championLevel":2,"championPoints":4327,"lastPlayTime":1502825571000,"championPointsSinceLastLevel":2527,"championPointsUntilNextLevel":1673,"chestGranted":true,"tokensEarned":0},{"playerId":24395066,"championId":202,"championLevel":2,"championPoints":4305,"lastPlayTime":1505950353000,"championPointsSinceLastLevel":2505,"championPointsUntilNextLevel":1695,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":56,"championLevel":2,"championPoints":3999,"lastPlayTime":1505606724000,"championPointsSinceLastLevel":2199,"championPointsUntilNextLevel":2001,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":20,"championLevel":2,"championPoints":3943,"lastPlayTime":1502840401000,"championPointsSinceLastLevel":2143,"championPointsUntilNextLevel":2057,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":23,"championLevel":2,"championPoints":3874,"lastPlayTime":1503179948000,"championPointsSinceLastLevel":2074,"championPointsUntilNextLevel":2126,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":15,"championLevel":2,"championPoints":3842,"lastPlayTime":1502918619000,"championPointsSinceLastLevel":2042,"championPointsUntilNextLevel":2158,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":21,"championLevel":2,"championPoints":3819,"lastPlayTime":1505948496000,"championPointsSinceLastLevel":2019,"championPointsUntilNextLevel":2181,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":12,"championLevel":2,"championPoints":3802,"lastPlayTime":1504300266000,"championPointsSinceLastLevel":2002,"championPointsUntilNextLevel":2198,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":2,"championLevel":2,"championPoints":3628,"lastPlayTime":1503536855000,"championPointsSinceLastLevel":1828,"championPointsUntilNextLevel":2372,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":136,"championLevel":2,"championPoints":3613,"lastPlayTime":1503774017000,"championPointsSinceLastLevel":1813,"championPointsUntilNextLevel":2387,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":432,"championLevel":2,"championPoints":3593,"lastPlayTime":1503610960000,"championPointsSinceLastLevel":1793,"championPointsUntilNextLevel":2407,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":98,"championLevel":2,"championPoints":3432,"lastPlayTime":1503958543000,"championPointsSinceLastLevel":1632,"championPointsUntilNextLevel":2568,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":67,"championLevel":2,"championPoints":3178,"lastPlayTime":1502746676000,"championPointsSinceLastLevel":1378,"championPointsUntilNextLevel":2822,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":82,"championLevel":2,"championPoints":3166,"lastPlayTime":1501273919000,"championPointsSinceLastLevel":1366,"championPointsUntilNextLevel":2834,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":102,"championLevel":2,"championPoints":3100,"lastPlayTime":1497473269000,"championPointsSinceLastLevel":1300,"championPointsUntilNextLevel":2900,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":143,"championLevel":2,"championPoints":3017,"lastPlayTime":1504907777000,"championPointsSinceLastLevel":1217,"championPointsUntilNextLevel":2983,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":55,"championLevel":2,"championPoints":2983,"lastPlayTime":1503535766000,"championPointsSinceLastLevel":1183,"championPointsUntilNextLevel":3017,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":85,"championLevel":2,"championPoints":2866,"lastPlayTime":1503417416000,"championPointsSinceLastLevel":1066,"championPointsUntilNextLevel":3134,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":141,"championLevel":2,"championPoints":2677,"lastPlayTime":1502473272000,"championPointsSinceLastLevel":877,"championPointsUntilNextLevel":3323,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":78,"championLevel":2,"championPoints":2613,"lastPlayTime":1504551584000,"championPointsSinceLastLevel":813,"championPointsUntilNextLevel":3387,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":412,"championLevel":2,"championPoints":2575,"lastPlayTime":1502839138000,"championPointsSinceLastLevel":775,"championPointsUntilNextLevel":3425,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":84,"championLevel":2,"championPoints":2515,"lastPlayTime":1502482277000,"championPointsSinceLastLevel":715,"championPointsUntilNextLevel":3485,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":131,"championLevel":2,"championPoints":2440,"lastPlayTime":1505601009000,"championPointsSinceLastLevel":640,"championPointsUntilNextLevel":3560,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":81,"championLevel":2,"championPoints":2168,"lastPlayTime":1505258760000,"championPointsSinceLastLevel":368,"championPointsUntilNextLevel":3832,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":60,"championLevel":2,"championPoints":1904,"lastPlayTime":1504994776000,"championPointsSinceLastLevel":104,"championPointsUntilNextLevel":4096,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":64,"championLevel":2,"championPoints":1840,"lastPlayTime":1500499051000,"championPointsSinceLastLevel":40,"championPointsUntilNextLevel":4160,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":421,"championLevel":2,"championPoints":1811,"lastPlayTime":1497487719000,"championPointsSinceLastLevel":11,"championPointsUntilNextLevel":4189,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":83,"championLevel":1,"championPoints":1742,"lastPlayTime":1503005091000,"championPointsSinceLastLevel":1742,"championPointsUntilNextLevel":58,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":104,"championLevel":1,"championPoints":1699,"lastPlayTime":1502052604000,"championPointsSinceLastLevel":1699,"championPointsUntilNextLevel":101,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":154,"championLevel":1,"championPoints":1687,"lastPlayTime":1504822949000,"championPointsSinceLastLevel":1687,"championPointsUntilNextLevel":113,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":48,"championLevel":1,"championPoints":1678,"lastPlayTime":1501703677000,"championPointsSinceLastLevel":1678,"championPointsUntilNextLevel":122,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":107,"championLevel":1,"championPoints":1653,"lastPlayTime":1502749530000,"championPointsSinceLastLevel":1653,"championPointsUntilNextLevel":147,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":245,"championLevel":1,"championPoints":1647,"lastPlayTime":1478223498000,"championPointsSinceLastLevel":1647,"championPointsUntilNextLevel":153,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":39,"championLevel":1,"championPoints":1381,"lastPlayTime":1500488203000,"championPointsSinceLastLevel":1381,"championPointsUntilNextLevel":419,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":90,"championLevel":1,"championPoints":1330,"lastPlayTime":1499897904000,"championPointsSinceLastLevel":1330,"championPointsUntilNextLevel":470,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":112,"championLevel":1,"championPoints":1217,"lastPlayTime":1503689793000,"championPointsSinceLastLevel":1217,"championPointsUntilNextLevel":583,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":238,"championLevel":1,"championPoints":1176,"lastPlayTime":1503777662000,"championPointsSinceLastLevel":1176,"championPointsUntilNextLevel":624,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":429,"championLevel":1,"championPoints":1128,"lastPlayTime":1503157009000,"championPointsSinceLastLevel":1128,"championPointsUntilNextLevel":672,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":24,"championLevel":1,"championPoints":978,"lastPlayTime":1491716650000,"championPointsSinceLastLevel":978,"championPointsUntilNextLevel":822,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":110,"championLevel":1,"championPoints":942,"lastPlayTime":1492035785000,"championPointsSinceLastLevel":942,"championPointsUntilNextLevel":858,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":203,"championLevel":1,"championPoints":912,"lastPlayTime":1504452708000,"championPointsSinceLastLevel":912,"championPointsUntilNextLevel":888,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":122,"championLevel":1,"championPoints":856,"lastPlayTime":1471301823000,"championPointsSinceLastLevel":856,"championPointsUntilNextLevel":944,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":120,"championLevel":1,"championPoints":836,"lastPlayTime":1471197780000,"championPointsSinceLastLevel":836,"championPointsUntilNextLevel":964,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":516,"championLevel":1,"championPoints":810,"lastPlayTime":1506115640000,"championPointsSinceLastLevel":810,"championPointsUntilNextLevel":990,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":91,"championLevel":1,"championPoints":781,"lastPlayTime":1488321683000,"championPointsSinceLastLevel":781,"championPointsUntilNextLevel":1019,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":61,"championLevel":1,"championPoints":746,"lastPlayTime":1490652382000,"championPointsSinceLastLevel":746,"championPointsUntilNextLevel":1054,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":62,"championLevel":1,"championPoints":713,"lastPlayTime":1475532411000,"championPointsSinceLastLevel":713,"championPointsUntilNextLevel":1087,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":157,"championLevel":1,"championPoints":703,"lastPlayTime":1497554981000,"championPointsSinceLastLevel":703,"championPointsUntilNextLevel":1097,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":222,"championLevel":1,"championPoints":677,"lastPlayTime":1497203841000,"championPointsSinceLastLevel":677,"championPointsUntilNextLevel":1123,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":127,"championLevel":1,"championPoints":611,"lastPlayTime":1503858087000,"championPointsSinceLastLevel":611,"championPointsUntilNextLevel":1189,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":69,"championLevel":1,"championPoints":401,"lastPlayTime":1502913963000,"championPointsSinceLastLevel":401,"championPointsUntilNextLevel":1399,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":105,"championLevel":1,"championPoints":298,"lastPlayTime":1499021174000,"championPointsSinceLastLevel":298,"championPointsUntilNextLevel":1502,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":58,"championLevel":1,"championPoints":226,"lastPlayTime":1478552520000,"championPointsSinceLastLevel":226,"championPointsUntilNextLevel":1574,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":266,"championLevel":1,"championPoints":217,"lastPlayTime":1478887509000,"championPointsSinceLastLevel":217,"championPointsUntilNextLevel":1583,"chestGranted":false,"tokensEarned":0},{"playerId":24395066,"championId":240,"championLevel":1,"championPoints":155,"lastPlayTime":1503787257000,"championPointsSinceLastLevel":155,"championPointsUntilNextLevel":1645,"chestGranted":false,"tokensEarned":0}]

Promise.all([fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json'),
    fetch('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/24395066?api_key=RGAPI-3fc17217-914a-450d-b540-a3fa9ab54a07')]
).then((res) => {
    if (res.status >299 || res.status < 200){
    [fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json'),
        fetch('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/24395066?api_key=RGAPI-96dabba7-12a9-444e-be94-d57411f0c0ae')]
}
return Promise.all([res[0].json(), res[1].json()]);
}).then((json) =>
{
    // masteries_storage = json[1];
champ_storage = json[0];
}).catch(function (e) {
    console.log("There was some sort of error");
    console.log(e);
});


setInterval(()	=>	{
    console.log('interval	executing');
    Promise.all([fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json'),
        fetch('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/24395066?api_key=RGAPI-96dabba7-12a9-444e-be94-d57411f0c0ae')]
    ).then((res) => {
        if (res.status >299 || res.status < 200){
        [fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json'),
        fetch('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/24395066?api_key=RGAPI-96dabba7-12a9-444e-be94-d57411f0c0ae')]
        }
        return Promise.all([res[0].json(), res[1].json()]);
    }).then((json) =>
    {
        // masteries_storage = json[1];
        champ_storage = json[0];
    }).catch(function (e) {
        console.log("There was some sort of error");
        console.log(e);
    });
},60000);
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
            res.send(`Please choose to enter on of the following /champs/list /tank /classes/:classid/vs/:classid2 /champ/top/3 /champ/:champid /champs/difficult/:champid /champs/difficult /:stat/average /champs/list/:champid And Here is a list of all the champions ${champList}`);
        });
    });
app.route('/champs/list')
    .get(function (req,res) {
        console.log(champList.length);
        promise = new Promise(function (resolve,reject) {
            if (champList.length == 0 && mastList.size == 0){
                champList = new LoL_Data(champ_storage).listOfChamps();
                mastList = new Masteries_decoder(masteries_storage).mapReturn();
                console.log(typeof (champList));
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
        }).catch(function (e) {
                console.log("There was some sort of error");
                console.log(e);
            });

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
        Promise.all([fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')]
        ).then((res) => {
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

app.route('/champ/:champid')
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
        res.send(`Here is the champion you are looking for ${req.params.champid} and here is a link to the main website http://gameinfo.na.leagueoflegends.com/en/game-info/champions/${req.params.champid.toLowerCase()}/`)
    });



function nameOfTopChamps(listOfChampions,champData) {
    var chmpMap = new Map();
    for (let x of listOfChampions ){
        let tempChamp = champData.Certain_champ(x);
        let tempKey = tempChamp["key"];
        chmpMap.set(tempKey,x);
    }
    return chmpMap;
}

app.route('/champ/top/3')
    .get(function (req,res) {
        var topChamps = [];
        promise = new Promise(function (resolve,reject) {
            if (1 == 1){
                champList = new LoL_Data(champ_storage).listOfChamps();
                mastList = new Masteries_decoder(masteries_storage).mapReturn();
                champRawData = new LoL_Data(champ_storage);
                console.log(mastList);
                resolve("successful");
            }
            else if (champList.length > 0){
                resolve("successful");
                console.log(champList.length);
            }
            else{
                reject("Already made");
            }
        }).then(function() {
            var topChmps = [];
            var mapIter = mastList.keys();
            for (let i = 0; i < 3; i++) {
                topChmps.push(mapIter.next().value);
            }
            return topChmps;
        }).then (function (response) {
            var chmpMap = new Map();
            for (let x of champList ){
                let tempChamp = champRawData.Certain_champ(x);
                let tempKey = tempChamp["key"];
                chmpMap.set(tempKey,x);
            }
            console.log(chmpMap.has(37 + ""));
            var topChamps = [];
            var numberString = '';
            for (let iter = 0; iter < 3;iter++){
                numberString = response[iter] +'';
                console.log(numberString);
                topChamps.push(chmpMap.get(numberString))
            }
            res.send(topChamps)
        })
    });
app.route('/classes/:classid/vs/:classid2')
    .get(function (req,res) {
        var class_one = new LoL_Data(champ_storage).Class_count(req.params.classid);
        var class_two = new LoL_Data(champ_storage).Class_count(req.params.classid2);
        if (class_one > class_two)
        {
            res.send(`There are ${class_one - class_two} more ${req.params.classid} than ${req.params.classid2} `)
        }
        else {
            res.send(`There are ${class_two - class_one} more ${req.params.classid2} than ${req.params.classid} `)
        }
    });

app.route('/tank')
    .get(function (req, res) {
        var total_high_hp = new LoL_Data(champ_storage).Base_stats_of_champ("hp");
        var good_defence = new LoL_Data(champ_storage).Info_Of_champs("defense");
        var total_good_defence = good_defence.length;
        if (total_good_defence > total_high_hp)
        {
            res.send(`Based on our calculation their are ${total_high_hp} Tanks`);
        }
        else if (total_high_hp > total_good_defence)
        {
            res.send(`Based on our calculation their are ${total_good_defence} Tanks`);
        }
        else
        {
            res.send(`Based on my calculation their are ${total_good_defence} Tanks`);
        }
    });
