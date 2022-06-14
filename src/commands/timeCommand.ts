import {
    Discord,
    SimpleCommand,
    SimpleCommandMessage,
} from "discordx";

import {format} from "date-fns";

@Discord()
export class TimeCommand {
    @SimpleCommand("time", {
        aliases: ["t"],
        argSplitter: "\n"
    })

    time(
        command: SimpleCommandMessage
    ) {
        let message;
        try {
            message = format(new Date(), 'dd/MM/yyy HH:mm:ss zzzz');
        }
        catch (e) {
           message = `An Error has occurred: ${e}`;
        }
        finally {
            command.message.reply({
                content: message,
                allowedMentions: {
                    repliedUser: false
                }
            });
        }
    }
}