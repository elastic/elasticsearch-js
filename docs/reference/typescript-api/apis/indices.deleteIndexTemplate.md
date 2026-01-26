# Client.indices.deleteIndexTemplate

Delete an index template. The provided <index-template> may contain multiple template names separated by a comma. If multiple template names are specified then there is no wildcard support and the provided names should match completely with existing templates.

## Method Signature

```typescript
client.indices.deleteIndexTemplate(this: That, params: T.IndicesDeleteIndexTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesDeleteIndexTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesDeleteIndexTemplateRequest`](../types/IndicesDeleteIndexTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesDeleteIndexTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
