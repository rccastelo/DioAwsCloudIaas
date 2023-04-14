const AWS = require('aws-sdk');

module.exports.deleteItem = async (event) => {
    const id = event.pathParameters.id;
    let msg = "";
    let sel;

    const dynamoDB = new AWS.DynamoDB.DocumentClient({"region": "us-east-1"});

    try {
      sel = await dynamoDB.delete({
          TableName: "TableIaas",
          Key: {id}
      }).promise();

      msg = "Item deleted";
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
  