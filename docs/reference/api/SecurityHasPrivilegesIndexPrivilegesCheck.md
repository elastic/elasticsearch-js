# `SecurityHasPrivilegesIndexPrivilegesCheck` [interface-SecurityHasPrivilegesIndexPrivilegesCheck]

| Name | Type | Description |
| - | - | - |
| `allow_restricted_indices` | boolean | This needs to be set to `true` (default is `false`) if using wildcards or regexps for patterns that cover restricted indices. Implicitly, restricted indices do not match index patterns because restricted indices usually have limited privileges and including them in pattern tests would render most such tests false. If restricted indices are explicitly included in the names list, privileges will be checked against them regardless of the value of `allow_restricted_indices`. |
| `names` | [Indices](./Indices.md) | A list of indices. |
| `privileges` | [SecurityIndexPrivilege](./SecurityIndexPrivilege.md)[] | A list of the privileges that you want to check for the specified indices. |
