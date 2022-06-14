import Command from "../interfaces/command";
import { Message } from "discord.js";
import { format } from "date-fns";

export class RestartCommand implements Command {
    commandNames = ["restart"];

    help(commandPrefix: string): string {
        return `Use ${commandPrefix}restart to restart.`;
    }

    async run(message: Message): Promise<void> {
        const currentTime = new Date();
        await message.channel.send('Restart Request received at: ' + format(currentTime, 'dd/MM/yyy HH:mm:ss zzzz'));
    }
}