import { Client } from "discord.js";
import { PrefixCommandBuilder, PrefixCommandBuilderSettings } from "../builder/command_builder";
import { CommandContext } from "../context/command_context";

export class PrefixCommandManager {
    public client: Client;
    public options: PrefixCommandBuilderSettings;

    public constructor(client: Client, options: PrefixCommandBuilderSettings) {
        this.client = client;
        this.options = options;
    }

    public registerCommands(...commands: PrefixCommandBuilder[]) {
        this.client.on("messageCreate", (msg) => {
            for (const command of commands) {
                const context = new CommandContext(msg, command);
                command.setContext(context);
                const args = msg.content.trim().split(" ");
                const isCommand = (): boolean => {
                    for (const alias of command.aliases) {
                        if (args.includes(`${this.options.prefix}${alias}`)) 
                            return true;
                    }

                    if (args.includes(`${this.options.prefix}${command.name}`))
                        return true;

                    return false;
                }

                if (isCommand()) {
                    context.prepareOptionValues();
                    command.prepareCommand();
                    break;
                }
            }
        })
    }
}