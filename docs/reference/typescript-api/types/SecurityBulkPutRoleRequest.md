# SecurityBulkPutRoleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `refresh?` | [`Refresh`](Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `roles` | `Record<string, SecurityRoleDescriptor>` | A dictionary of role name to RoleDescriptor objects to add or update |
| `body?` | `string | { [key: string]: any } & { refresh?: never, roles?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { refresh?: never, roles?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
