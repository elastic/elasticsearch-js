# MlStartTrainedModelDeploymentRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | [`Id`](Id.md) | The unique identifier of the trained model. Currently, only PyTorch models are supported. |
| `cache_size?` | [`ByteSize`](ByteSize.md) | The inference cache size (in memory outside the JVM heap) per node for the model.
The default value is the same size as the `model_size_bytes`. To disable the cache,
`0b` can be provided. |
| `deployment_id?` | `string` | A unique identifier for the deployment of the model. |
| `number_of_allocations?` | [`integer`](integer.md) | The number of model allocations on each node where the model is deployed.
All allocations on a node share the same copy of the model in memory but use
a separate set of threads to evaluate the model.
Increasing this value generally increases the throughput.
If this setting is greater than the number of hardware threads
it will automatically be changed to a value less than the number of hardware threads.
If adaptive_allocations is enabled, do not set this value, because it’s automatically set. |
| `priority?` | [`MlTrainingPriority`](MlTrainingPriority.md) | The deployment priority |
| `queue_capacity?` | [`integer`](integer.md) | Specifies the number of inference requests that are allowed in the queue. After the number of requests exceeds
this value, new requests are rejected with a 429 error. |
| `threads_per_allocation?` | [`integer`](integer.md) | Sets the number of threads used by each model allocation during inference. This generally increases
the inference speed. The inference process is a compute-bound process; any number
greater than the number of available hardware threads on the machine does not increase the
inference speed. If this setting is greater than the number of hardware threads
it will automatically be changed to a value less than the number of hardware threads. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the model to deploy. |
| `wait_for?` | [`MlDeploymentAllocationState`](MlDeploymentAllocationState.md) | Specifies the allocation status to wait for before returning. |
| `adaptive_allocations?` | [`MlAdaptiveAllocationsSettings`](MlAdaptiveAllocationsSettings.md) | Adaptive allocations configuration. When enabled, the number of allocations
is set based on the current load.
If adaptive_allocations is enabled, do not set the number of allocations manually. |
| `body?` | `string | { [key: string]: any } & { model_id?: never, cache_size?: never, deployment_id?: never, number_of_allocations?: never, priority?: never, queue_capacity?: never, threads_per_allocation?: never, timeout?: never, wait_for?: never, adaptive_allocations?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { model_id?: never, cache_size?: never, deployment_id?: never, number_of_allocations?: never, priority?: never, queue_capacity?: never, threads_per_allocation?: never, timeout?: never, wait_for?: never, adaptive_allocations?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
