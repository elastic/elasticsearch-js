# Client.security.deleteRoleMapping

Delete role mappings. Role mappings define which roles are assigned to each user. The role mapping APIs are generally the preferred way to manage role mappings rather than using role mapping files. The delete role mappings API cannot remove role mappings that are defined in role mapping files.

## Method Signature

```typescript
client.security.deleteRoleMapping(this: That, params: T.SecurityDeleteRoleMappingRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityDeleteRoleMappingResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityDeleteRoleMappingRequest`](../types/SecurityDeleteRoleMappingRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityDeleteRoleMappingResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
