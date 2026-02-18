import { CommandContext } from "../context/command_context";
import { CommandParameterOptions } from "../option/parameter_options";


export class PrefixCommandBuilderSettings {
    prefix?: string | undefined;
    useHelpCommand?: boolean | undefined;
}

export class PrefixCommandBuilder {
    public name?: string;
    public aliases: string[] = [];
    private requiredContext?: CommandContext;
    private optionList: CommandParameterOptions[] = [];
    private executor?: (ctx: CommandContext) => void;

    public setContext(context: CommandContext) {
        this.requiredContext = context;
    }

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public addAliases(...aliases: string[]) {
        this.aliases.push(...aliases);
        return this;
    }

    public runCommand(executor?: (ctx: CommandContext) => void) {
        this.executor = executor;
        return this;
    }

    public prepareCommand() {
        if (this.executor && this.requiredContext)
            this.executor(this.requiredContext);

    }

    public addOptions(...options: CommandParameterOptions[]) {
        this.optionList.push(...options);
        return this;
    }

    public getOptionList() {
        return this.optionList;
    }

    public forEachOptions(callback: (option: CommandParameterOptions, index: number) => void) {
        this.optionList.forEach(callback);
    }
}