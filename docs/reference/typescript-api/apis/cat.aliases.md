# Client.cat.aliases

Get aliases. Get the cluster's index aliases, including filter and routing information. This API does not return data stream aliases. IMPORTANT: CAT APIs are only intended for human consumption using the command line or the Kibana console. They are not intended for use by applications. For application consumption, use the aliases API.

## Method Signature

```typescript
client.cat.aliases(this: That, params?: T.CatAliasesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatAliasesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatAliasesRequest`](../types/CatAliasesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatAliasesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
