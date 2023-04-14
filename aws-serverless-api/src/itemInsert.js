const AWS = require('aws-sdk');

module.exports.insertItem = async (event) => {
    const {id, itemDescription} = JSON.parse(event.body);
    const createAt = new Date().toISOString();
    let msg = "";

    const dynamoDB = new AWS.DynamoDB.DocumentClient({"region": "us-east-1"});

    const newItem = {
        id,
        itemDescription,
        createAt,
        itemStatus: false
    }

    try {
      await dynamoDB.put({
          TableName: "TableIaas",
          Item: newItem
      }).promise();

      msg = "Item inserted";
    } catch (e) {
      msg = `Erro [${e.message}]`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: msg,
          item: newItem
        },
        null,
        2
      )
    };
  };
  