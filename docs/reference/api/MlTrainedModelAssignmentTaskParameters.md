## Interface `MlTrainedModelAssignmentTaskParameters`

| Name | Type | Description |
| - | - | - |
| `cache_size` | [ByteSize](./ByteSize.md) | The size of the trained model cache. |
| `deployment_id` | [Id](./Id.md) | The unique identifier for the trained model deployment. |
| `model_bytes` | [ByteSize](./ByteSize.md) | The size of the trained model in bytes. |
| `model_id` | [Id](./Id.md) | The unique identifier for the trained model. |
| `number_of_allocations` | [integer](./integer.md) | The total number of allocations this model is assigned across ML nodes. |
| `per_allocation_memory_bytes` | [ByteSize](./ByteSize.md) | &nbsp; |
| `per_deployment_memory_bytes` | [ByteSize](./ByteSize.md) | &nbsp; |
| `priority` | [MlTrainingPriority](./MlTrainingPriority.md) | &nbsp; |
| `queue_capacity` | [integer](./integer.md) | Number of inference requests are allowed in the queue at a time. |
| `threads_per_allocation` | [integer](./integer.md) | Number of threads per allocation. |
