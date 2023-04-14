const AWS = require('aws-sdk');

module.exports.updateItem = async (event) => {
    const id = event.pathParameters.id;
    const {itemDescription, itemStatus} = JSON.parse(event.body);
    let msg = "";
    let sel;

    const dynamoDB = new AWS.DynamoDB.DocumentClient({"region": "us-east-1"});

    try {
      sel = await dynamoDB.update({
          TableName: "TableIaas",
          Key: {id},
          UpdateExpression: "set itemDescription = :itemDescription, itemStatus = :itemStatus",
          ExpressionAttributeValues: {
            ":itemDescription": itemDescription,
            ":itemStatus": itemStatus
          },
          ReturnValues: "ALL_NEW"
      }).promise();

      msg = "Item updated";
    } catch (e) {
      msg = `Erro [${e.message}]`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: msg,
          item: sel
        },
        null,
        2
      )
    };
  };
  