# Client.security.clearCachedPrivileges

Clear the privileges cache. Evict privileges from the native application privilege cache. The cache is also automatically cleared for applications that have their privileges updated.

## Method Signature

```typescript
client.security.clearCachedPrivileges(this: That, params: T.SecurityClearCachedPrivilegesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityClearCachedPrivilegesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityClearCachedPrivilegesRequest`](../types/SecurityClearCachedPrivilegesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityClearCachedPrivilegesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
