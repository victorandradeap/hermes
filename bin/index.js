#!/usr/bin/env node

const sqs = require("./sqs");
const lambda = require("./lambda");
const options = require('./args');
const chalk = require("chalk");

execute();

async function execute() {
    const messages = await sqs.getMessages(options.queueUrl, options.maxReceiveCount);

    let responses = [];
    for (let message of messages) {
        let response = await lambda.invoke(options.functionName, message);
        responses.push(response);
    }

    for (let response of responses) {
        if (!response.error) {
            await sqs.deleteMessages(options.queueUrl, response.messageId, response.messageReceiptHandle);
        }
    }

    const successItems = responses.filter(response => !response.error);
    if(successItems > 0) {
        console.info(chalk.green(`\n${successItems.length} messages processed successfully.`));
    }

    const errorsItems = responses.filter(response => response.error);
    if(errorsItems > 0) {
        console.info(chalk.red(`\n${errorsItems.length} messages processed with error.`));
    }
}
