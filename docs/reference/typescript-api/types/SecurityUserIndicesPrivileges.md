# SecurityUserIndicesPrivileges

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field_security?` | [`SecurityFieldSecurity`](SecurityFieldSecurity.md)[] | The document fields that the owners of the role have read access to. |
| `names` | `IndexName | IndexName[]` | A list of indices (or index name patterns) to which the permissions in this entry apply. |
| `privileges` | [`SecurityIndexPrivilege`](SecurityIndexPrivilege.md)[] | The index level privileges that owners of the role have on the specified indices. |
| `query?` | [`SecurityIndicesPrivilegesQuery`](SecurityIndicesPrivilegesQuery.md)[] | Search queries that define the documents the user has access to. A document within the specified indices must match these queries for it to be accessible by the owners of the role. |
| `allow_restricted_indices` | `boolean` | Set to `true` if using wildcard or regular expressions for patterns that cover restricted indices. Implicitly, restricted indices have limited privileges that can cause pattern tests to fail. If restricted indices are explicitly included in the `names` list, Elasticsearch checks privileges against these indices regardless of the value set for `allow_restricted_indices`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
