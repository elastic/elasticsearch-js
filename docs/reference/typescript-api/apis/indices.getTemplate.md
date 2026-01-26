# Client.indices.getTemplate

Get legacy index templates. Get information about one or more index templates. IMPORTANT: This documentation is about legacy index templates, which are deprecated and will be replaced by the composable templates introduced in Elasticsearch 7.8.

## Method Signature

```typescript
client.indices.getTemplate(this: That, params?: T.IndicesGetTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesGetTemplateRequest`](../types/IndicesGetTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
