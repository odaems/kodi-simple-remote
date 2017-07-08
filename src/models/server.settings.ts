export class ServerSettings {
    host: string;
    port: number;
    userName: string;
    password: string;

    constructor(host: string, port: number, userName: string, password: string) {
        this.host = host;
        this.port = port;
        this.userName = userName;
        this.password = password;
    }
}