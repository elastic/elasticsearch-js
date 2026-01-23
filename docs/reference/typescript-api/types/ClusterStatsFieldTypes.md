# ClusterStatsFieldTypes

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | The name for the field type in selected nodes. |
| `count` | `integer` | The number of occurrences of the field type in selected nodes. |
| `index_count` | `integer` | The number of indices containing the field type in selected nodes. |
| `indexed_vector_count?` | `integer` | For dense_vector field types, number of indexed vector types in selected nodes. |
| `indexed_vector_dim_max?` | `integer` | For dense_vector field types, the maximum dimension of all indexed vector types in selected nodes. |
| `indexed_vector_dim_min?` | `integer` | For dense_vector field types, the minimum dimension of all indexed vector types in selected nodes. |
| `script_count?` | `integer` | The number of fields that declare a script. |
| `vector_index_type_count?` | `Record<Name, integer>` | For dense_vector field types, count of mappings by index type |
| `vector_similarity_type_count?` | `Record<Name, integer>` | For dense_vector field types, count of mappings by similarity |
| `vector_element_type_count?` | `Record<Name, integer>` | For dense_vector field types, count of mappings by element type |

## See Also

- [All Types](./)
- [API Methods](../index.md)
