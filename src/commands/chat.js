const fetch = require('node-fetch')
const moment = require('moment')
const { getChat, getAllChat, sendChat } = require('../requests/vrageApi/chat')

const chat = async (msg, args) => {
    msg.react('🎩')

    let messages = [];

    if (args.length > 0) {

        if (args[0] === 'all') {
            const data = await getAllChat();
            if (data.Messages) {
                messages = data.Messages.slice(data.Messages.length - 10, data.Messages.length)
                messageArray = messages.map(message => {
                    return `**${message.DisplayName}**: ${message.Content}`
                })
                msg.channel.send(messageArray.join('\r\n'))
            } else {
                msg.channel.send('No messages found')
            }
        } else {
            await sendChat(args.join(' '))
            msg.channel.send('Message Sent')
        }

    } else {
        const data = await getChat();
        if (data.Messages) {
            messages = data.Messages.slice(data.Messages.length - 10, data.Messages.length)

            if (messages.length > 0) {
                messageArray = messages.map(message => {
                    return `**${message.DisplayName}**: ${message.Content}`
                })
                msg.channel.send(messageArray.join('\r\n'))
            } else {
                msg.channel.send('No messages found')
            }

        } else {
            msg.channel.send('No messages found')
        }
    }   
}

module.exports = chat