var { ddb, docClient } = require("../dynamodb/PartStatTable");

exports.addStoryStat = async(req,res)=>{
    var params = {
        TableName: "StoryStats",
        Item: {
            "Story" : req.body.story,
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

exports.getStoryStat = async(req,res)=>{
    var params = {
        TableName: "StoryStats",
        Key: {
            "Story" : { "S" : req.params.id}
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
                        story : data.Item.Story["S"],
                        voters,
                        readers
                    }
                })
            }else{
                res.send({
                    statusCode: 200,
                    stats: {
                        story : req.params.id,
                        voters : [],
                        readers : []
                    }
                })
            }
            
        }
     });
    }