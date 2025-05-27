## Interface `TransformSource`

| Name | Type | Description |
| - | - | - |
| `index` | [Indices](./Indices.md) | The source indices for the transform. It can be a single index, an index pattern (for example, `"my-index-*""`), an array of indices (for example, `["my-index-000001", "my-index-000002"]`), or an array of index patterns (for example, `["my-index-*", "my-other-index-*"]`. For remote indices use the syntax `"remote_name:index_name"`. If any indices are in remote clusters then the master node and at least one transform node must have the `remote_cluster_client` node role. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | A query clause that retrieves a subset of data from the source index. |
| `runtime_mappings` | [MappingRuntimeFields](./MappingRuntimeFields.md) | Definitions of search-time runtime fields that can be used by the transform. For search runtime fields all data nodes, including remote nodes, must be 7.12 or later. |
