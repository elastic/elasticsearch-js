# Client.cat.repositories

Get snapshot repository information. Get a list of snapshot repositories for a cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get snapshot repository API.

## Method Signature

```typescript
client.cat.repositories(this: That, params?: T.CatRepositoriesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatRepositoriesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatRepositoriesRequest`](../types/CatRepositoriesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatRepositoriesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
