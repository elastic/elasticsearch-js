# Client.cat.transforms

Get transform information. Get configuration and usage information about transforms. CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get transform statistics API.

## Method Signature

```typescript
client.cat.transforms(this: That, params?: T.CatTransformsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatTransformsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatTransformsRequest`](../types/CatTransformsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatTransformsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
