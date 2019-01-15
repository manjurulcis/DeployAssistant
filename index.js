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

const allowedUsers = ['UFBUU7SBS'];
const allowedChannels = ['CFE3MD0G6'];
const currentUsedChannel = 'backup';

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
  console.log(data);
  if (data.type !== 'message') {
    return;
  }

  if(data.username && data.username == "backupextractor") {
    return;
  }

  let user = data.user;
  let channel = data.channel;
  console.log(user, channel);

  //Filter out the not allowed user
  if (!allowedUsers.includes(user)) {
    invalidUserError();
    return;
  }

    //Filter out the not allowed channels
  if (!allowedChannels.includes(channel)) {
      invalidChannelError();
      return;
  }

  handleMessage(data.text);
});

// Respons to Data
function handleMessage(message) {
  // here it is possible to extract the message and put some validity check and then direct to appropriate block of code
  if (message.includes(' tapanila')) {
    runBackupCommand();
  }
}

// Tell a Chuck Norris Joke
function runBackupCommand() {
  const params = {
    icon_emoji: ':working:'
  };

  let command = "ls"; // Show Directory Listing

  execute(command, function(stdout){
    let outResponse = `Backup Process Started\n` +  stdout;
    bot.postMessageToChannel(currentUsedChannel, outResponse, params);
  })
}


// Invalid user error message
function invalidUserError() {
    const params = {
        icon_emoji: ':error:'
    };

    let outResponse = `Permission denied. You are not allowed to perform this action\n` ;
    bot.postMessageToChannel(currentUsedChannel, outResponse, params);
}

// Invalid user error message
function invalidChannelError() {
    const params = {
        icon_emoji: ':error:'
    };

    let outResponse = `Permission denied. This channel is not allowed to perform this action\n` ;
    bot.postMessageToChannel(currentUsedChannel, outResponse, params);
}



// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(currentUsedChannel, `Type @backupextractor with either 'tapanila DATE' to extract database backup`, params);
}
