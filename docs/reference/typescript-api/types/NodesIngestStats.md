# NodesIngestStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | [`long`](long.md) | Total number of documents ingested during the lifetime of this node. |
| `current` | [`long`](long.md) | Total number of documents currently being ingested. |
| `failed` | [`long`](long.md) | Total number of failed ingest operations during the lifetime of this node. |
| `processors` | `Record<string, NodesKeyedProcessor>[]` | Total number of ingest processors. |
| `time_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | Total time, in milliseconds, spent preprocessing ingest documents during the lifetime of this node. |
| `ingested_as_first_pipeline_in_bytes` | [`long`](long.md) | Total number of bytes of all documents ingested by the pipeline.
This field is only present on pipelines which are the first to process a document.
Thus, it is not present on pipelines which only serve as a final pipeline after a default pipeline, a pipeline run after a reroute processor, or pipelines in pipeline processors. |
| `produced_as_first_pipeline_in_bytes` | [`long`](long.md) | Total number of bytes of all documents produced by the pipeline.
This field is only present on pipelines which are the first to process a document.
Thus, it is not present on pipelines which only serve as a final pipeline after a default pipeline, a pipeline run after a reroute processor, or pipelines in pipeline processors.
In situations where there are subsequent pipelines, the value represents the size of the document after all pipelines have run. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
