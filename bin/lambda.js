var AWS = require('./aws');
const chalk = require('chalk');

var lambda = new AWS.Lambda();

async function invoke(functionName, message) {
    var params = {
        FunctionName: functionName,
        Payload: message.Body
    };

    console.info(chalk.green('\nInvoking Function: ') + chalk.yellow(functionName));
    console.info(chalk.green('With message: ') + chalk.yellow(message.MessageId));

    const response = await lambda.invoke(params).promise();
    
    if(response.FunctionError) {
        console.error(chalk.red('Execution error: ') + chalk.yellow(JSON.parse(response.Payload).errorMessage));
        return {
            error: response.FunctionError,
            responseStatus: response.StatusCode,
            messageId: message.MessageId,
            messageReceiptHandle: message.ReceiptHandle
        }
    }

    return {
        responseStatus: response.StatusCode,
        messageId: message.MessageId,
        messageReceiptHandle: message.ReceiptHandle
    }
}

module.exports = { invoke }
