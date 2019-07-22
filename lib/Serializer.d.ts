// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

export default class Serializer {
  serialize(object: any): string;
  deserialize(json: string): any;
  ndserialize(array: any[]): string;
  qserialize(object: any): string;
}
