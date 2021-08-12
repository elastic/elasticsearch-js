import Client from './Client';
export interface HelpersOptions {
    client: Client;
    metaHeader: string;
    maxRetries: number;
}
declare const kClient: unique symbol;
declare const kMetaHeader: unique symbol;
declare const kMaxRetries: unique symbol;
export default class Helpers {
    [kClient]: Client;
    [kMetaHeader]: string;
    [kMaxRetries]: number;
    constructor(opts: HelpersOptions);
}
export {};
