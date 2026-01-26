# Client.security.putPrivileges

Create or update application privileges. To use this API, you must have one of the following privileges: * The `manage_security` cluster privilege (or a greater privilege such as `all`). * The "Manage Application Privileges" global privilege for the application being referenced in the request. Application names are formed from a prefix, with an optional suffix that conform to the following rules: * The prefix must begin with a lowercase ASCII letter. * The prefix must contain only ASCII letters or digits. * The prefix must be at least 3 characters long. * If the suffix exists, it must begin with either a dash `-` or `_`. * The suffix cannot contain any of the following characters: `\`, `/`, `*`, `?`, `"`, `<`, `>`, `|`, `,`, `*`. * No part of the name can contain whitespace. Privilege names must begin with a lowercase ASCII letter and must contain only ASCII letters and digits along with the characters `_`, `-`, and `.`. Action names can contain any number of printable ASCII characters and must contain at least one of the following characters: `/`, `*`, `:`.

## Method Signature

```typescript
client.security.putPrivileges(this: That, params: T.SecurityPutPrivilegesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityPutPrivilegesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityPutPrivilegesRequest`](../types/SecurityPutPrivilegesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityPutPrivilegesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
