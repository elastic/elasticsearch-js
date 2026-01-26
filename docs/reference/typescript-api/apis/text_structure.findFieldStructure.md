# Client.text_structure.findFieldStructure

Find the structure of a text field. Find the structure of a text field in an Elasticsearch index. This API provides a starting point for extracting further information from log messages already ingested into Elasticsearch. For example, if you have ingested data into a very simple index that has just `@timestamp` and message fields, you can use this API to see what common structure exists in the message field. The response from the API contains: * Sample messages. * Statistics that reveal the most common values for all fields detected within the text and basic numeric statistics for numeric fields. * Information about the structure of the text, which is useful when you write ingest configurations to index it or similarly formatted text. * Appropriate mappings for an Elasticsearch index, which you could use to ingest the text. All this information can be calculated by the structure finder with no guidance. However, you can optionally override some of the decisions about the text structure by specifying one or more query parameters. If the structure finder produces unexpected results, specify the `explain` query parameter and an explanation will appear in the response. It helps determine why the returned structure was chosen.

## Method Signature

```typescript
client.text_structure.findFieldStructure(this: That, params: T.TextStructureFindFieldStructureRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TextStructureFindFieldStructureResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TextStructureFindFieldStructureRequest`](../types/TextStructureFindFieldStructureRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TextStructureFindFieldStructureResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
