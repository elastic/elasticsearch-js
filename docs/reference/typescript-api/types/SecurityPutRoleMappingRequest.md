# SecurityPutRoleMappingRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | The distinct name that identifies the role mapping.
The name is used solely as an identifier to facilitate interaction via the API; it does not affect the behavior of the mapping in any way. |
| `refresh?` | [`Refresh`](Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `enabled?` | `boolean` | Mappings that have `enabled` set to `false` are ignored when role mapping is performed. |
| `metadata?` | [`Metadata`](Metadata.md) | Additional metadata that helps define which roles are assigned to each user.
Within the metadata object, keys beginning with `_` are reserved for system usage. |
| `roles?` | `string[]` | A list of role names that are granted to the users that match the role mapping rules.
Exactly one of `roles` or `role_templates` must be specified. |
| `role_templates?` | [`SecurityRoleTemplate`](SecurityRoleTemplate.md)[] | A list of Mustache templates that will be evaluated to determine the roles names that should granted to the users that match the role mapping rules.
Exactly one of `roles` or `role_templates` must be specified. |
| `rules?` | [`SecurityRoleMappingRule`](SecurityRoleMappingRule.md) | The rules that determine which users should be matched by the mapping.
A rule is a logical condition that is expressed by using a JSON DSL. |
| `run_as?` | `string[]` | - |
| `body?` | `string | { [key: string]: any } & { name?: never, refresh?: never, enabled?: never, metadata?: never, roles?: never, role_templates?: never, rules?: never, run_as?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, refresh?: never, enabled?: never, metadata?: never, roles?: never, role_templates?: never, rules?: never, run_as?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
