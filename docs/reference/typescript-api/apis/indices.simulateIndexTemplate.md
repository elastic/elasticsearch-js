# Client.indices.simulateIndexTemplate

Simulate an index. Get the index configuration that would be applied to the specified index from an existing index template.

## Method Signature

```typescript
client.indices.simulateIndexTemplate(this: That, params: T.IndicesSimulateIndexTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesSimulateIndexTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesSimulateIndexTemplateRequest`](../types/IndicesSimulateIndexTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesSimulateIndexTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
