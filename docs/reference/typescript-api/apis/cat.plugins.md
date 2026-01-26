# Client.cat.plugins

Get plugin information. Get a list of plugins running on each node of a cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

## Method Signature

```typescript
client.cat.plugins(this: That, params?: T.CatPluginsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatPluginsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatPluginsRequest`](../types/CatPluginsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatPluginsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
