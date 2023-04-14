const AWS = require('aws-sdk');

module.exports.selectItem = async (event) => {
    const {id} = event.pathParameters;
    let msg = "";
    let sel;

    const dynamoDB = new AWS.DynamoDB.DocumentClient({"region": "us-east-1"});

    try {
      sel = await dynamoDB.get({
          TableName: "TableIaas",
          Key: {id}
      }).promise();

      msg = "Item selected";
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
  