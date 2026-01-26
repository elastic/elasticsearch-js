# Client.cat.componentTemplates

Get component templates. Get information about component templates in a cluster. Component templates are building blocks for constructing index templates that specify index mappings, settings, and aliases. IMPORTANT: CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get component template API.

## Method Signature

```typescript
client.cat.componentTemplates(this: That, params?: T.CatComponentTemplatesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatComponentTemplatesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatComponentTemplatesRequest`](../types/CatComponentTemplatesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatComponentTemplatesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
