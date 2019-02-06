# @EnkoraBot

> Simple slackbot built with Node.js and Slackbots.js that help to run server command to extract some backup 
or perform some other tasks..

> Possible to run this program in local machine and test the app/bot functionality from slack app

## Quick Start

``` bash
# Install dependencies
npm install

# Serve on localhost:3000
npm start

# On Slack.com
1. Create a Slack App and install it in workspace
2. Create A bot User and remmeber to update it in index.js line 4
3. Create a channel e.g. 'database-backup' and update it in index.js line 7 or 
4. Get OAuth token and update token in the following line in index.js line 12
5. For first run usernameValidation and channelValidation should be false
usernameValidation = false; // Username validation  false = turned off
const channelValidation = false; // Channel validation  false = turned off
```



### Version

1.0.0

### License

This project is licensed under the MIT License
