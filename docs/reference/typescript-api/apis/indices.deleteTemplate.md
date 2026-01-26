# Client.indices.deleteTemplate

Delete a legacy index template. IMPORTANT: This documentation is about legacy index templates, which are deprecated and will be replaced by the composable templates introduced in Elasticsearch 7.8.

## Method Signature

```typescript
client.indices.deleteTemplate(this: That, params: T.IndicesDeleteTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesDeleteTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesDeleteTemplateRequest`](../types/IndicesDeleteTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesDeleteTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
