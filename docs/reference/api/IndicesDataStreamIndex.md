## Interface `IndicesDataStreamIndex`

| Name | Type | Description |
| - | - | - |
| `ilm_policy` | [Name](./Name.md) | Name of the current ILM lifecycle policy configured for this backing index. |
| `index_mode` | [IndicesIndexMode](./IndicesIndexMode.md) | The index mode of this backing index of the data stream. |
| `index_name` | [IndexName](./IndexName.md) | Name of the backing index. |
| `index_uuid` | [Uuid](./Uuid.md) | Universally unique identifier (UUID) for the index. |
| `managed_by` | [IndicesManagedBy](./IndicesManagedBy.md) | Name of the lifecycle system that's currently managing this backing index. |
| `prefer_ilm` | boolean | Indicates if ILM should take precedence over DSL in case both are configured to manage this index. |
