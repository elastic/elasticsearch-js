export default class Serializer {
    serialize(object: any): string;
    deserialize(json: string): any;
    ndserialize(array: any[]): string;
    qserialize(object: any): string;
}
