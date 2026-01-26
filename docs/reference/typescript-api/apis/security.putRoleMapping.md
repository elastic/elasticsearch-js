# Client.security.putRoleMapping

Create or update role mappings. Role mappings define which roles are assigned to each user. Each mapping has rules that identify users and a list of roles that are granted to those users. The role mapping APIs are generally the preferred way to manage role mappings rather than using role mapping files. The create or update role mappings API cannot update role mappings that are defined in role mapping files. NOTE: This API does not create roles. Rather, it maps users to existing roles. Roles can be created by using the create or update roles API or roles files. **Role templates** The most common use for role mappings is to create a mapping from a known value on the user to a fixed role name. For example, all users in the `cn=admin,dc=example,dc=com` LDAP group should be given the superuser role in Elasticsearch. The `roles` field is used for this purpose. For more complex needs, it is possible to use Mustache templates to dynamically determine the names of the roles that should be granted to the user. The `role_templates` field is used for this purpose. NOTE: To use role templates successfully, the relevant scripting feature must be enabled. Otherwise, all attempts to create a role mapping with role templates fail. All of the user fields that are available in the role mapping rules are also available in the role templates. Thus it is possible to assign a user to a role that reflects their username, their groups, or the name of the realm to which they authenticated. By default a template is evaluated to produce a single string that is the name of the role which should be assigned to the user. If the format of the template is set to "json" then the template is expected to produce a JSON string or an array of JSON strings for the role names.

## Method Signature

```typescript
client.security.putRoleMapping(this: That, params: T.SecurityPutRoleMappingRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityPutRoleMappingResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityPutRoleMappingRequest`](../types/SecurityPutRoleMappingRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityPutRoleMappingResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
