## Interface `IndicesDataStream`

| Name | Type | Description |
| - | - | - |
| `_meta` | [Metadata](./Metadata.md) | Custom metadata for the stream, copied from the `_meta` object of the stream’s matching index template. If empty, the response omits this property. |
| `allow_custom_routing` | boolean | If `true`, the data stream allows custom routing on write request. |
| `failure_store` | [IndicesFailureStore](./IndicesFailureStore.md) | Information about failure store backing indices |
| `generation` | [integer](./integer.md) | Current generation for the data stream. This number acts as a cumulative count of the stream’s rollovers, starting at 1. |
| `hidden` | boolean | If `true`, the data stream is hidden. |
| `ilm_policy` | [Name](./Name.md) | Name of the current ILM lifecycle policy in the stream’s matching index template. This lifecycle policy is set in the `index.lifecycle.name` setting. If the template does not include a lifecycle policy, this property is not included in the response. NOTE: A data stream’s backing indices may be assigned different lifecycle policies. To retrieve the lifecycle policy for individual backing indices, use the get index settings API. |
| `index_mode` | [IndicesIndexMode](./IndicesIndexMode.md) | The index mode for the data stream that will be used for newly created backing indices. |
| `indices` | [IndicesDataStreamIndex](./IndicesDataStreamIndex.md)[] | Array of objects containing information about the data stream’s backing indices. The last item in this array contains information about the stream’s current write index. |
| `lifecycle` | [IndicesDataStreamLifecycleWithRollover](./IndicesDataStreamLifecycleWithRollover.md) | Contains the configuration for the data stream lifecycle of this data stream. |
| `name` | [DataStreamName](./DataStreamName.md) | Name of the data stream. |
| `next_generation_managed_by` | [IndicesManagedBy](./IndicesManagedBy.md) | Name of the lifecycle system that'll manage the next generation of the data stream. |
| `prefer_ilm` | boolean | Indicates if ILM should take precedence over DSL in case both are configured to managed this data stream. |
| `replicated` | boolean | If `true`, the data stream is created and managed by cross-cluster replication and the local cluster can not write into this data stream or change its mappings. |
| `rollover_on_write` | boolean | If `true`, the next write to this data stream will trigger a rollover first and the document will be indexed in the new backing index. If the rollover fails the indexing request will fail too. |
| `status` | [HealthStatus](./HealthStatus.md) | Health status of the data stream. This health status is based on the state of the primary and replica shards of the stream’s backing indices. |
| `system` | boolean | If `true`, the data stream is created and managed by an Elastic stack component and cannot be modified through normal user interaction. |
| `template` | [Name](./Name.md) | Name of the index template used to create the data stream’s backing indices. The template’s index pattern must match the name of this data stream. |
| `timestamp_field` | [IndicesDataStreamTimestampField](./IndicesDataStreamTimestampField.md) | Information about the `@timestamp` field in the data stream. |
