# LogstashPipelineSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `'pipeline.workers'` | `integer` | The number of workers that will, in parallel, execute the filter and output stages of the pipeline. |
| `'pipeline.batch.size'` | `integer` | The maximum number of events an individual worker thread will collect from inputs before attempting to execute its filters and outputs. |
| `'pipeline.batch.delay'` | `integer` | When creating pipeline event batches, how long in milliseconds to wait for each event before dispatching an undersized batch to pipeline workers. |
| `'queue.type'` | `string` | The internal queuing model to use for event buffering. |
| `'queue.max_bytes'` | `string` | The total capacity of the queue (`queue.type: persisted`) in number of bytes. |
| `'queue.checkpoint.writes'` | `integer` | The maximum number of written events before forcing a checkpoint when persistent queues are enabled (`queue.type: persisted`). |

## See Also

- [All Types](./)
- [API Methods](../index.md)
