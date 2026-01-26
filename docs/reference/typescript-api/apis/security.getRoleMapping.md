# Client.security.getRoleMapping

Get role mappings. Role mappings define which roles are assigned to each user. The role mapping APIs are generally the preferred way to manage role mappings rather than using role mapping files. The get role mappings API cannot retrieve role mappings that are defined in role mapping files.

## Method Signature

```typescript
client.security.getRoleMapping(this: That, params?: T.SecurityGetRoleMappingRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetRoleMappingResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetRoleMappingRequest`](../types/SecurityGetRoleMappingRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetRoleMappingResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
