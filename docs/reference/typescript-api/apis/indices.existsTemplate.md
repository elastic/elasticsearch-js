# Client.indices.existsTemplate

Check existence of index templates. Get information about whether index templates exist. Index templates define settings, mappings, and aliases that can be applied automatically to new indices. IMPORTANT: This documentation is about legacy index templates, which are deprecated and will be replaced by the composable templates introduced in Elasticsearch 7.8.

## Method Signature

```typescript
client.indices.existsTemplate(this: That, params: T.IndicesExistsTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesExistsTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesExistsTemplateRequest`](../types/IndicesExistsTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesExistsTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
