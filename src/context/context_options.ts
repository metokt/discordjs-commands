import { Channel, ClientUser, GuildMember, Role, User } from "discord.js";
import { CommandParameterOptions, CommandParameters, CommandParameterTypes } from "../option/parameter_options";
import { ParameterError } from "../util/errors";

export class ContextOptions {
    private specialOptionList: CommandParameterOptions[] = [];

    public addOptions(...optionList: CommandParameterOptions[]) {
        this.specialOptionList = optionList;
    }

    public getStringOption(name: string): string | undefined {
        const option = this.getOption(name);
        const type = this.getOptionType(name);
        if (!option || !type) return undefined;

        if (type != "string") {
            throw new ParameterError(`The type of the '${name}' option is ${type}, but it is not being called as ${type}. Are you making a mistake?`);
        }

        return String(option);
    }

    public getNumberOption(name: string): number | undefined {
        const option = this.getOption(name);
        const type = this.getOptionType(name);
        if (!option || !type) return undefined;

        if (type != "number") {
            throw new ParameterError(`The type of the '${name}' option is ${type}, but it is not being called as ${type}. Are you making a mistake?`);
        }

        return Number(option);
    }

    public getUserOption(name: string): User | ClientUser | undefined {
        const option = this.getOption(name);
        const type = this.getOptionType(name);
        if (!option || !type) return undefined;

        if (type != "user") {
            throw new ParameterError(`The type of the '${name}' option is ${type}, but it is not being called as ${type}. Are you making a mistake?`);
        }

        return option as User | ClientUser;
    }

    public getMemberOption(name: string): GuildMember | ClientUser | undefined {
        const option = this.getOption(name);
        const type = this.getOptionType(name);
        if (!option || !type) return undefined;

        if (type != "member") {
            throw new ParameterError(`The type of the '${name}' option is ${type}, but it is not being called as ${type}. Are you making a mistake?`);
        }

        return option as GuildMember | ClientUser;
    }

    public getChannelOption(name: string): Channel | undefined {
        const option = this.getOption(name);
        const type = this.getOptionType(name);
        if (!option || !type) return undefined;

        if (type != "channel") {
            throw new ParameterError(`The type of the '${name}' option is ${type}, but it is not being called as ${type}. Are you making a mistake?`);
        }

        return option as Channel;
    }

    public getRoleOption(name: string): Role | undefined {
        const option = this.getOption(name);
        const type = this.getOptionType(name);
        if (!option || !type) return undefined;

        if (type != "role") {
            throw new ParameterError(`The type of the '${name}' option is ${type}, but it is not being called as ${type}. Are you making a mistake?`);
        }

        return option as Role;
    }

    private getOption(name: string): any | undefined {
        if (this.specialOptionList.length < 1) return undefined;

        for (const option of this.specialOptionList) {
            if (!option.name.trim()) throw new ParameterError(`The option name cannot be empty.`);

            if (option.name === name) return option.value;
        }

        throw new ParameterError(`There is no such option: '${name}'`);
    }

    private getOptionType(name: string): CommandParameters | CommandParameterTypes | undefined {
        if (this.specialOptionList.length < 1) return undefined;

        for (const option of this.specialOptionList) {
            if (!option.name.trim()) throw new ParameterError(`The option name cannot be empty.`);
            if (!option.type) throw new ParameterError(`The option type cannot be empty.`);

            if (option.name === name) return option.type;
        }

        throw new ParameterError(`There is no such option: '${name}'`);
    }
}