# EsqlEsqlResult

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `took?` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `is_partial?` | `boolean` | - |
| `all_columns?` | [`EsqlEsqlColumnInfo`](EsqlEsqlColumnInfo.md)[] | - |
| `columns` | [`EsqlEsqlColumnInfo`](EsqlEsqlColumnInfo.md)[] | - |
| `values` | [`FieldValue`](FieldValue.md)[][] | - |
| `_clusters?` | [`EsqlEsqlClusterInfo`](EsqlEsqlClusterInfo.md) | Cross-cluster search information. Present if `include_ccs_metadata` was `true` in the request
and a cross-cluster search was performed. |
| `profile?` | `any` | Profiling information. Present if `profile` was `true` in the request.
The contents of this field are currently unstable. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
