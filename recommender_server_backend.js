var yelp = require('yelp');
    request = require("request"),
    fs = require('fs')
    mysql = require('mysql');

var database_host = "sql.mit.edu",
    database_username = "quanquan",
    database_password = "uita9924DS#$"
    database_name = "quanquan+plzfeedme";

var ordrin_url = "https://r-test.ordr.in",
    orderin_private_key = "dsrtGpE_h_-K9jX7nPKUcK80IJDQhQd3XGTSvGQ3LWQ",
    consumerKey = "oI3F8RQDv-DfFQ5ZcEGu6w",
    consumerSecret = "Ya2OKkCcAFHPMirb5ilRrDqac_o",
    token = "nLFfhrdl_Ri71ukuGzFZ5zMgYywjcc08",
    tokenSecret = "t5VU8y82juCbeIy4fHNAI8cnO78",
    orderInURL = "https://r-test.ordr.in",
    orderInPublicKey = "cMLLju6kcObCipgIikk_ahHyYuSKrS6RN59eOOXy7BU",
    orderInPrivateKey = "dsrtGpE_h_-K9jX7nPKUcK80IJDQhQd3XGTSvGQ3LWQ";

var client = yelp.createClient({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    token: token,
    token_secret: tokenSecret
});

var search = function(term, loc, latitude, longitude) {
    query = {};

    if (term != null) {
        query["term"] = term;
    }

    if (loc != null) {
        query["location"] = loc;
    }

    if (latitude != -1000 && longitude != -1000) {
        query["ll"] = latitude + "," + longitude;
    }

    yelp.search(query, function(error, data) {
        if (error) throw error;
        else
            return data;
    });
};

var getOpenTakeouts = function(datetime, zip, city, addr) {
    var listURL = ordrin_url + "/dl/" + datetime + "/" + zip + "/" + city + "/" + addr + "?_auth=1," + orderInPrivateKey;
    console.log(listURL);
    request({
        url: listURL,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            fs.truncate('OrderInRestaurants.txt', 0, function(){console.log('done')});
            for (i in body) {
                if (body[i].na != null && body[i].na != "") {
                    (function(name) {fs.open("OrderInRestaurants.txt", 'a', 0666, function(err, fd) {
                        fs.writeSync(fd, name + "\n", null, undefined, function(err, written) {
                            if (err) throw err;
                    })})})(body[i].na);
                }
            }
        } else {
            console.log("Error! " + error);
        }
    });
};

var makeRecommendation = function(priceRange, rating, ethnic, exclude) {
    var connection = mysql.createConnection({
        host     : database_host,
        user     : database_username,
        password : database_password,
        database : database_name
    });

    var query = "SELECT * FROM foods WHERE ",
        count = 0;

    fs.readFile('OrderInRestaurants.txt', function(err, buf) {
        var rest_names = buf.toString().split("\n");
        for (i in buf.toString().split("\n")) {
            var n = rest_names[i];
            n = n.replace(/'/g, '');
            if (count == 0) {
                count += 1;
                query += "(rest_name = '" + n + "' ";
            } else {
                query += "OR rest_name = '" + n + "' ";
            }
        }
        query += ") ";

        if (priceRange != null) {
            query = query + "AND food_price >= " + parseInt(priceRange[0]) + " AND food_price<= " + parseInt(priceRange[1]);
        }

        if (ethnic != null) {
            for (i in ethnic) {
                query = query + " AND " + ethnic[i] + "= 0 ";
            }
        }

        if (exclude != null) {
            for (i in exclude) {
                query = query + "AND food_name NOT LIKE '%" + exclude[i] + "%' AND food_descrip NOT LIKE " + "'%" + exclude[i] + "%' ";
            }
        }

        if (rating != null) {
            query = query + "AND rating >= '" + rating + "' ";
        }

        query = query + " ORDER BY RAND() LIMIT 10;";

        connection.query(query, function(err, rows, field) {
            if (err) throw err;
            var recommendations = [];
            for (i in rows) {
                var rest_info = [];
                rest_info.push(rows[i].rest_name);
                rest_info.push(rows[i].food_name);
                rest_info.push(rows[i].food_descrip);
                rest_info.push(rows[i].food_price);
                rest_info.push(rows[i].rating);
                recommendations.push(rest_info);
            }
            console.log(recommendations);
        });
    });
}

getOpenTakeouts("ASAP", "02139", "Cambridge", "320 Memorial Drive");
makeRecommendation([10, 30], null, null, null);
