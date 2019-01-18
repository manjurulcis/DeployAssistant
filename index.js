const SlackBot = require('slackbots');
const exec = require('child_process').exec;
const botUsername = "backupextractor";
const allowedUsers = ['UFBUU7SBS'];
const allowedChannels = ['CFE3MD0G6'];
const currentUsedChannel = 'database-backup';
const usernameValidation = false;
const channelValidation = false;


const bot = new SlackBot({
  token: '',
  name: botUsername
});


/**
 * Start handler
 */
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    currentUsedChannel,
    'Welcome to Backup Extractor Bot. I can help tp extract a database backup. Type "setupname DATE" for get database extract',
    params
  );
});

/**
 * Error handler
 */
bot.on('error', err => console.log(err));

/**
 * Message handler
 */
bot.on('message', data => {
  console.log(data);
  if (data.type !== 'message') {
    return;
  }

  if(data.username && data.username == botUsername) {
    return;
  }

  let user = data.user;
  let channel = data.channel;

    //Filter out the not allowed user
    if (usernameValidation && !allowedUsers.includes(user)) {
        invalidUserError();
        return;
    }

    //Filter out the not allowed channels
    if (channelValidation && !allowedChannels.includes(channel)) {
        invalidChannelError();
        return;
    }

  handleMessage(data.text);
});

/**
 * Handle the user message for running command associated with it
 * @param message
 */
function handleMessage(message) {
  // here it is possible to extract the message and put some validity check and then direct to appropriate block of code
  if (message.includes(' tapanila')) {
    runBackupCommand();
  }
}

/**
 * Run backup command
 */
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


/**
 * Validation for specific slack users to run command
 */
function invalidUserError() {
    const params = {
        icon_emoji: ':error:'
    };

    let outResponse = `Permission denied. You are not allowed to perform this action\n` ;
    bot.postMessageToChannel(currentUsedChannel, outResponse, params);
}

/**
 * Validation for specific channels to use for this app
 */
function invalidChannelError() {
    const params = {
        icon_emoji: ':error:'
    };

    let outResponse = `Permission denied. This channel is not allowed to perform this action\n` ;
    bot.postMessageToChannel(currentUsedChannel, outResponse, params);
}


/**
 * Show help text
 */
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(currentUsedChannel, `Type @backupextractor with either 'tapanila DATE' to extract database backup`, params);
}

/**
 * Custom Function to execute command in child node process
 * @param command
 * @param callback
 */
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};
