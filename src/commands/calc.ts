import {
    Discord,
    SimpleCommand,
    SimpleCommandMessage,
    SimpleCommandOption,
} from "discordx";

import {evaluate} from 'mathjs';

@Discord()
export class Calc {
    @SimpleCommand("calc", {
        aliases: ["eval", "evaluate", "calculate"],
        argSplitter: "\n"
    })
    calc(
        @SimpleCommandOption("expression") expr: string,
        command: SimpleCommandMessage
    ) {
        let result = expr + ' is not a valid expression.'
        try {
            result = `${evaluate(expr)}`
        }
        catch (e) {}
        finally {
            command.message.reply({
                content: result,
                allowedMentions: {
                    repliedUser: false
                }
            });
        }
    }
}
