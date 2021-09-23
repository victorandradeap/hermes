var AWS = require('./aws');
const chalk = require('chalk');

var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

async function getMessages(queueUrl, maxReceiveCount) {

    const params = {
        AttributeNames: [
            "SentTimestamp"
        ],
        MaxNumberOfMessages: maxReceiveCount,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: queueUrl,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0
    };

    const response = await sqs.receiveMessage(params).promise();

    if (!response.Messages) {
        console.error(chalk.red('There is no messages.'));
        process.exit();
    }

    console.info(chalk.green(`Found ${response.Messages.length} messages.`));
    return response.Messages;
}

async function deleteMessages(queueUrl, messageId, receiptHandle) {
    var deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle
    };

    console.info(chalk.green(`Deleting message: ${messageId}.`));
    await sqs.deleteMessage(deleteParams).promise();
}

module.exports = { getMessages, deleteMessages }
