# Client.ingest.processorGrok

Run a grok processor. Extract structured fields out of a single text field within a document. You must choose which field to extract matched fields from, as well as the grok pattern you expect will match. A grok pattern is like a regular expression that supports aliased expressions that can be reused.

## Method Signature

```typescript
client.ingest.processorGrok(this: That, params?: T.IngestProcessorGrokRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestProcessorGrokResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IngestProcessorGrokRequest`](../types/IngestProcessorGrokRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IngestProcessorGrokResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
