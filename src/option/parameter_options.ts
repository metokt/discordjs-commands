export enum CommandParameterTypes {
    String = "string",
    Number = "number",
    User = "user",
    Member = "member",
    Channel = "channel",
    Role = "role"
}

export type CommandParameters =
    "string" |
    "number" |
    "user" |
    "member" |
    "channel" |
    "role";

export interface CommandParameterOptions {
    name: string;
    type: CommandParameters | CommandParameterTypes;
    isLongText?: boolean | undefined;
    value?: any | undefined;
}