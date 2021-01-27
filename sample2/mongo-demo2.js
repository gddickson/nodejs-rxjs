var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client) {

    var dbo = client.db("testdb");
    var ad = dbo.admin();
    var cursor = dbo.collection('celestial_employees').find();

    cursor.count(true, {}, (err, count) => {
        if( count > 1 )
        {
            cursor.each(function(err, doc) {
                if( doc !== null )
                    console.log(doc);
                else
                    client.close();
            });
        }
        else
            console.log("NO DATA");
    });
}); 