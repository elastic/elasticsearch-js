# `MlUpdateTrainedModelDeploymentRequest` [interface-MlUpdateTrainedModelDeploymentRequest]

| Name | Type | Description |
| - | - | - |
| `adaptive_allocations` | [MlAdaptiveAllocationsSettings](./MlAdaptiveAllocationsSettings.md) | Adaptive allocations configuration. When enabled, the number of allocations is set based on the current load. If adaptive_allocations is enabled, do not set the number of allocations manually. |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; number_of_allocations?: never; adaptive_allocations?: never; }) | All values in `body` will be added to the request body. |
| `model_id` | [Id](./Id.md) | The unique identifier of the trained model. Currently, only PyTorch models are supported. |
| `number_of_allocations` | [integer](./integer.md) | The number of model allocations on each node where the model is deployed. All allocations on a node share the same copy of the model in memory but use a separate set of threads to evaluate the model. Increasing this value generally increases the throughput. If this setting is greater than the number of hardware threads it will automatically be changed to a value less than the number of hardware threads. If adaptive_allocations is enabled, do not set this value, because it’s automatically set. |
| `querystring` | { [key: string]: any; } & { model_id?: never; number_of_allocations?: never; adaptive_allocations?: never; } | All values in `querystring` will be added to the request querystring. |
