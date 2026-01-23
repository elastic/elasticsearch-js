# SecurityRemoteIndicesPrivileges

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `clusters` | [`Names`](Names.md) | A list of cluster aliases to which the permissions in this entry apply. |
| `field_security?` | [`SecurityFieldSecurity`](SecurityFieldSecurity.md) | The document fields that the owners of the role have read access to. |
| `names` | `IndexName | IndexName[]` | A list of indices (or index name patterns) to which the permissions in this entry apply. |
| `privileges` | `SecurityIndexPrivilege[]` | The index level privileges that owners of the role have on the specified indices. |
| `query?` | [`SecurityIndicesPrivilegesQuery`](SecurityIndicesPrivilegesQuery.md) | A search query that defines the documents the owners of the role have access to. A document within the specified indices must match this query for it to be accessible by the owners of the role. |
| `allow_restricted_indices?` | `boolean` | Set to `true` if using wildcard or regular expressions for patterns that cover restricted indices. Implicitly, restricted indices have limited privileges that can cause pattern tests to fail. If restricted indices are explicitly included in the `names` list, Elasticsearch checks privileges against these indices regardless of the value set for `allow_restricted_indices`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
