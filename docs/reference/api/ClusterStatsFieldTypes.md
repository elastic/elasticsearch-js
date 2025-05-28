# `ClusterStatsFieldTypes` [interface-ClusterStatsFieldTypes]

| Name | Type | Description |
| - | - | - |
| `count` | [integer](./integer.md) | The number of occurrences of the field type in selected nodes. |
| `index_count` | [integer](./integer.md) | The number of indices containing the field type in selected nodes. |
| `indexed_vector_count` | [long](./long.md) | For dense_vector field types, number of indexed vector types in selected nodes. |
| `indexed_vector_dim_max` | [long](./long.md) | For dense_vector field types, the maximum dimension of all indexed vector types in selected nodes. |
| `indexed_vector_dim_min` | [long](./long.md) | For dense_vector field types, the minimum dimension of all indexed vector types in selected nodes. |
| `name` | [Name](./Name.md) | The name for the field type in selected nodes. |
| `script_count` | [integer](./integer.md) | The number of fields that declare a script. |
