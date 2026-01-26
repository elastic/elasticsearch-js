# Client.indices.migrateToDataStream

Convert an index alias to a data stream. Converts an index alias to a data stream. You must have a matching index template that is data stream enabled. The alias must meet the following criteria: The alias must have a write index; All indices for the alias must have a `@timestamp` field mapping of a `date` or `date_nanos` field type; The alias must not have any filters; The alias must not use custom routing. If successful, the request removes the alias and creates a data stream with the same name. The indices for the alias become hidden backing indices for the stream. The write index for the alias becomes the write index for the stream.

## Method Signature

```typescript
client.indices.migrateToDataStream(this: That, params: T.IndicesMigrateToDataStreamRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesMigrateToDataStreamResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesMigrateToDataStreamRequest`](../types/IndicesMigrateToDataStreamRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesMigrateToDataStreamResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
