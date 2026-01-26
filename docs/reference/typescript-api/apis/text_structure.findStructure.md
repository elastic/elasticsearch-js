# Client.text_structure.findStructure

Find the structure of a text file. The text file must contain data that is suitable to be ingested into Elasticsearch. This API provides a starting point for ingesting data into Elasticsearch in a format that is suitable for subsequent use with other Elastic Stack functionality. Unlike other Elasticsearch endpoints, the data that is posted to this endpoint does not need to be UTF-8 encoded and in JSON format. It must, however, be text; binary text formats are not currently supported. The size is limited to the Elasticsearch HTTP receive buffer size, which defaults to 100 Mb. The response from the API contains: * A couple of messages from the beginning of the text. * Statistics that reveal the most common values for all fields detected within the text and basic numeric statistics for numeric fields. * Information about the structure of the text, which is useful when you write ingest configurations to index it or similarly formatted text. * Appropriate mappings for an Elasticsearch index, which you could use to ingest the text. All this information can be calculated by the structure finder with no guidance. However, you can optionally override some of the decisions about the text structure by specifying one or more query parameters.

## Method Signature

```typescript
client.text_structure.findStructure(this: That, params: T.TextStructureFindStructureRequest<TJsonDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.TextStructureFindStructureResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TextStructureFindStructureRequest`](../types/TextStructureFindStructureRequest.md)<TJsonDocument> | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TextStructureFindStructureResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
