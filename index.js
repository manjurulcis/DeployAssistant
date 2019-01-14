const SlackBot = require('slackbots');
const axios = require('axios');
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

const bot = new SlackBot({
  token: '',
  name: 'backupextractor'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'backup',
    'Welcome to Backup Extractor Bot. I can help tp extract a database backup. Type "setupname DATE" for get database extract',
    params
  );
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  console.log(data);

  handleMessage(data.text);
});

// Respons to Data
function handleMessage(message) {
  if (message.includes(' tapanila')) {
    runBackupCommand();
  }
}

// Tell a Chuck Norris Joke
function runBackupCommand() {
  const params = {
    icon_emoji: ':working:'
  };

  execute('ls', function(stdout){
    let outResponse = `Backup Process Started\n` +  stdout;
    bot.postMessageToChannel('backup', outResponse, params);
  })
}



// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'backup',
    `Type @backupextractor with either 'tapanila DATE' to extract database backup`,
    params
  );
}
