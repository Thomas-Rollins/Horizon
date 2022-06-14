import {AnyChannel, MessageEmbed} from "discord.js";
import {Discord, On, Client, ArgsOf} from "discordx";

@Discord()
export abstract class AppDiscord {
    @On("messageDelete")
    async onMessage([message]: ArgsOf<"messageDelete">, client: Client) {
        if (!message.guild) {
            return;
        }

        // check if delete-channel exists by id, if not return immediately
        // #TODO: Change to dynamic id searching - pull from database?
        const delete_channel: AnyChannel | undefined = client.channels.cache.find(
            channel => channel.id === "895047746359279646")
        if (!delete_channel || !delete_channel?.isText()) {
            return;
        }

        await message.guild?.fetchAuditLogs({
            limit: 5,
            type: 'MESSAGE_DELETE'
        }).then(async (fetchedLogs) => {
            if (fetchedLogs) {
                const auditEntry = fetchedLogs.entries.find(log =>
                    log.createdTimestamp > (Date.now() - 7500) &&
                    // @ts-ignore
                    log.target?.id === message.author?.id
                );
                // If entry exists, grab the user that deleted the message.
                let executor;
                //if the author of the message deleted it, there is no audit log event emitted
                if (auditEntry && auditEntry.executor) {
                    executor = auditEntry.executor.tag;
                    executor = executor.concat(`\n <${auditEntry.executor.id}>`);
                }

                const timestamp = new Date(Date.now());
                const delete_embed = new MessageEmbed()
                    .setTitle("DELETED MESSAGE")
                    .setColor("#fc3c3c")
                    .addField("Author", message.author?.tag.concat("\n", `<${message.author?.id}>`) || "Unknown\n", true)
                    .addField("Deleted By",executor || "Unknown\nUnknown", true)
                    .addField("Channel", `<#${message.channel.id}>`, true)
                    .addField("Message Content", message.content || "None")
                    .addField("Message ID", `<${message.id}>`, true)
                    .setFooter(`${timestamp.toLocaleString('en-GB', {timeZone: 'UTC', timeZoneName: 'short'})}`)

                delete_channel.send({embeds: [delete_embed]});
            }
        })
    }

    @On("messageUpdate")
    onMessageEdit([old_message, new_message]: ArgsOf<"messageUpdate">, client: Client) {
        if (!old_message.guild) {
            return;
        }
        // check if delete channel exists, if not return immediately
        const delete_channel: AnyChannel | undefined = client.channels.cache.find(
            channel => channel.id === "895047746359279646")
        if (!delete_channel?.isText()) {
            return;
        }

        if (!old_message.author?.bot) {
            console.log(
                "Message Modified:", old_message.author?.username, old_message.author?.id,
                old_message.content, new_message.author?.username, new_message.author?.id, new_message.content);
            const edit_embed = new MessageEmbed()
                .setTitle("MODIFIED MESSAGE")
                .setColor("#FFD700")
                .addField("Author", old_message.author?.tag.concat(
                    "\n", old_message.author?.id) || "Unknown\nUnknown", true)
                .addField("Channel", `<#${new_message.channel.id}>`, true)
                .addField("Old Message", old_message.content || "<Unknown>", true)
                .addField("New Message", new_message.content?.concat(
                    "\n", `[${new_message.id}](https://discord.com/channels/${new_message.guildId}/${new_message.channelId}/${new_message.id})`) || "<Unknown>\n", true)
                .setFooter(`${new_message.createdAt.toLocaleString('en-GB', {timeZone: 'UTC', timeZoneName: 'short'})}`);

            delete_channel.send({embeds: [edit_embed]});
        } else{
            console.log("bot message edited")
        }
    }
}