require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');

const axios = require('axios')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready',()=>{
    console.log(`logged in as ${client.user.tag}`);
})

async function getMeme() {
    try {

      const res = await axios.get('https://meme-api.com/gimme');

      if (res.data && res.data.url) {
        return res.data.url;
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching meme:', error.message);
      return 'https://fallbackurl.com/no-meme.jpg';
    }
  }

client.on('messageCreate', async (msg)=>{
    console.log(msg);
    if(msg.content.toLowerCase() === "ping"){
    msg.reply("pong")
}else if(msg.content.toLowerCase() === "hello"){
    msg.reply('Hey, How r u buddy! 🤍')
}else if(msg.content === "!meme"){
    msg.channel.send("Here's your meme!");
    const img = await getMeme();
    msg.channel.send(img);
}else if(msg.content.toLowerCase() === "sandeep"){
    msg.reply("Hello the superstar DEV");
}else if(msg.content.toLowerCase() === "deepak"){
        msg.reply("jay jay deepak");
}
})





client.login(process.env.CLIENT_TOKEN)
