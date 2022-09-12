var { ddb, docClient } = require("../dynamodb/PartStatTable");

exports.addPartStat = async(req,res)=>{
    var params = {
        TableName: "PartStats",
        Item: {
            "PartStory" : req.body.partStory,
            "VotedBy" : req.body.voters,
            "ReadBy" : req.body.readers
        },
        ReturnConsumedCapacity: "TOTAL"
    };

    docClient.put(params, function(error, data) {
        if (error) {
            console.error(error);
            res.send({
                statusCode: 500,
                error,
                message: "Internal server error"
            })
        } else {
            res.send({
                statusCode: 200,
                data,
                message: "Update success"
            })
        }
     });
}

exports.getPartStat = async(req,res)=>{
    var params = {
        TableName: "PartStats",
        Key: {
            "PartStory" : { "S" : req.params.id}
        }
    };

    ddb.getItem(params, function(error, data) {
        if (error) {
            console.error(error);
            res.send({
                statusCode: 500,
                error,
                message: "Internal server error"
            })
        } else {
            if(data.Item !== undefined){
                let voters = data.Item?.VotedBy['L']?.map((vo)=>{
                    return vo['S'];
                })
                let readers = data.Item?.ReadBy['L']?.map((vo)=>{
                    return vo['S'];
                })
                res.send({
                    statusCode: 200,
                    stats: {
                        partStory : data.Item.PartStory["S"],
                        voters,
                        readers
                    }
                })
            }else{
                res.send({
                    statusCode: 200,
                    stats: {
                        partStory : req.params.id,
                        voters : [],
                        readers : []
                    }
                })
            }
            
        }
     });
    }