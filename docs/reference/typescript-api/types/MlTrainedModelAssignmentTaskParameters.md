# MlTrainedModelAssignmentTaskParameters

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_bytes` | [`ByteSize`](ByteSize.md) | The size of the trained model in bytes. |
| `model_id` | [`Id`](Id.md) | The unique identifier for the trained model. |
| `deployment_id` | [`Id`](Id.md) | The unique identifier for the trained model deployment. |
| `cache_size?` | [`ByteSize`](ByteSize.md) | The size of the trained model cache. |
| `number_of_allocations` | [`integer`](integer.md) | The total number of allocations this model is assigned across ML nodes. |
| `priority` | [`MlTrainingPriority`](MlTrainingPriority.md) | - |
| `per_deployment_memory_bytes` | [`ByteSize`](ByteSize.md) | - |
| `per_allocation_memory_bytes` | [`ByteSize`](ByteSize.md) | - |
| `queue_capacity` | [`integer`](integer.md) | Number of inference requests are allowed in the queue at a time. |
| `threads_per_allocation` | [`integer`](integer.md) | Number of threads per allocation. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
