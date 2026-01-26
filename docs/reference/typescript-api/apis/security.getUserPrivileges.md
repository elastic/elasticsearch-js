# Client.security.getUserPrivileges

Get user privileges. Get the security privileges for the logged in user. All users can use this API, but only to determine their own privileges. To check the privileges of other users, you must use the run as feature. To check whether a user has a specific list of privileges, use the has privileges API.

## Method Signature

```typescript
client.security.getUserPrivileges(this: That, params?: T.SecurityGetUserPrivilegesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetUserPrivilegesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetUserPrivilegesRequest`](../types/SecurityGetUserPrivilegesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetUserPrivilegesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
