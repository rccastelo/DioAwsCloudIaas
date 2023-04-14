const AWS = require('aws-sdk');

module.exports.listItem = async (event) => {
    let msg = "";
    let ret;

    const dynamoDB = new AWS.DynamoDB.DocumentClient({"region": "us-east-1"});

    try {
      ret = await dynamoDB.scan({
          TableName: "TableIaas"
      }).promise();

      msg = "Item(ns) listed";
    } catch (e) {
      msg = `Erro [${e.message}]`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: msg,
          item: ret.Items
        },
        null,
        2
      )
    };
  };
  