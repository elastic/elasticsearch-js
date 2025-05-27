## Interface `LogstashPipelineSettings`

| Name | Type | Description |
| - | - | - |
| `"pipeline.batch.delay"` | [integer](./integer.md) | When creating pipeline event batches, how long in milliseconds to wait for each event before dispatching an undersized batch to pipeline workers. |
| `"pipeline.batch.size"` | [integer](./integer.md) | The maximum number of events an individual worker thread will collect from inputs before attempting to execute its filters and outputs. |
| `"pipeline.workers"` | [integer](./integer.md) | The number of workers that will, in parallel, execute the filter and output stages of the pipeline. |
| `"queue.checkpoint.writes"` | [integer](./integer.md) | The maximum number of written events before forcing a checkpoint when persistent queues are enabled ( `queue.type: persisted`). |
| `"queue.max_bytes"` | string | The total capacity of the queue ( `queue.type: persisted`) in number of bytes. |
| `"queue.type"` | string | The internal queuing model to use for event buffering. |
