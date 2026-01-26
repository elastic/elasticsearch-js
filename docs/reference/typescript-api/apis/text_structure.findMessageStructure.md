# Client.text_structure.findMessageStructure

Find the structure of text messages. Find the structure of a list of text messages. The messages must contain data that is suitable to be ingested into Elasticsearch. This API provides a starting point for ingesting data into Elasticsearch in a format that is suitable for subsequent use with other Elastic Stack functionality. Use this API rather than the find text structure API if your input text has already been split up into separate messages by some other process. The response from the API contains: * Sample messages. * Statistics that reveal the most common values for all fields detected within the text and basic numeric statistics for numeric fields. * Information about the structure of the text, which is useful when you write ingest configurations to index it or similarly formatted text. Appropriate mappings for an Elasticsearch index, which you could use to ingest the text. All this information can be calculated by the structure finder with no guidance. However, you can optionally override some of the decisions about the text structure by specifying one or more query parameters. If the structure finder produces unexpected results, specify the `explain` query parameter and an explanation will appear in the response. It helps determine why the returned structure was chosen.

## Method Signature

```typescript
client.text_structure.findMessageStructure(this: That, params: T.TextStructureFindMessageStructureRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TextStructureFindMessageStructureResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TextStructureFindMessageStructureRequest`](../types/TextStructureFindMessageStructureRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TextStructureFindMessageStructureResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
