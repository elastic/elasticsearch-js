# Client.security.hasPrivileges

Check user privileges. Determine whether the specified user has a specified list of privileges. All users can use this API, but only to determine their own privileges. To check the privileges of other users, you must use the run as feature.

## Method Signature

```typescript
client.security.hasPrivileges(this: That, params?: T.SecurityHasPrivilegesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityHasPrivilegesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityHasPrivilegesRequest`](../types/SecurityHasPrivilegesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityHasPrivilegesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
