## Interface `EsqlEsqlResult`

| Name | Type | Description |
| - | - | - |
| `_clusters` | [EsqlEsqlClusterInfo](./EsqlEsqlClusterInfo.md) | Cross-cluster search information. Present if `include_ccs_metadata` was `true` in the request and a cross-cluster search was performed. |
| `all_columns` | [EsqlEsqlColumnInfo](./EsqlEsqlColumnInfo.md)[] | &nbsp; |
| `columns` | [EsqlEsqlColumnInfo](./EsqlEsqlColumnInfo.md)[] | &nbsp; |
| `is_partial` | boolean | &nbsp; |
| `profile` | any | Profiling information. Present if `profile` was `true` in the request. The contents of this field are currently unstable. |
| `took` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `values` | [FieldValue](./FieldValue.md)[][] | &nbsp; |
