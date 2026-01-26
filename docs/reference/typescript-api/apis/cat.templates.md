# Client.cat.templates

Get index template information. Get information about the index templates in a cluster. You can use index templates to apply index settings and field mappings to new indices at creation. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get index template API.

## Method Signature

```typescript
client.cat.templates(this: That, params?: T.CatTemplatesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatTemplatesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatTemplatesRequest`](../types/CatTemplatesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatTemplatesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
