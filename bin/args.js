const yargs = require("yargs");

const options = yargs
    .usage("Usage: --profile <AWS_PROFILE> --queueUrl <SQS_QUEUE_URL> --functionName <FUNCTION_NAME> --maxReceiveCount <NUMBER_OF_MESSAGES>")
    .option("p", { alias: "profile", describe: "AWS Profile Source", demandOption: false, default: 'default', type: 'string' })
    .option("q", { alias: "queueUrl", describe: "AWS Queue URL", demandOption: true, type: 'string' })
    .option("f", { alias: "functionName", describe: "AWS Function Name", demandOption: true, type: 'string' })
    .option("m", { alias: "maxReceiveCount", describe: "Max Receive Count", demandOption: false, default: 3, type: 'number' })
    .argv;

module.exports = options;
