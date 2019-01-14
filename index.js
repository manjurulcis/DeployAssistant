const SlackBot = require('slackbots');
const axios = require('axios');
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

const bot = new SlackBot({
  token: 'xoxb-522613001123-522718151106-GDAr1SIe8fiFrkxv6MmV78Ge',
  name: 'backupextractor'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'backup',
    'Welcome to Backup Extractor Bot. I can help tp extract a database backup',
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
  } else if (message.includes(' help')) {
    runHelp();
  }
}

// Tell a Chuck Norris Joke
function runBackupCommand() {
  const params = {
    icon_emoji: ':working:'
  };

  bot.postMessageToChannel('backup', `Backup Process Started`, params);
  execute('ls', function(stdout){
    bot.postMessageToChannel('backup', stdout, params);
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
