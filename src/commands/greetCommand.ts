import {
    Discord,
    SimpleCommand,
    SimpleCommandMessage,
} from "discordx";

@Discord()
export class GreetCommand {
    @SimpleCommand("greet", {
        aliases: [],
        argSplitter: "\n"
    })

    greet(
        command: SimpleCommandMessage
    ) {
        let message;
        try {
            message = `hello, ${command.message.author.username}!`;
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