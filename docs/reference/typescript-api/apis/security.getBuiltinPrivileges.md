# Client.security.getBuiltinPrivileges

Get builtin privileges. Get the list of cluster privileges and index privileges that are available in this version of Elasticsearch.

## Method Signature

```typescript
client.security.getBuiltinPrivileges(this: That, params?: T.SecurityGetBuiltinPrivilegesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetBuiltinPrivilegesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetBuiltinPrivilegesRequest`](../types/SecurityGetBuiltinPrivilegesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetBuiltinPrivilegesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
