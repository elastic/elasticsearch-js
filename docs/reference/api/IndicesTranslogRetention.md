# `IndicesTranslogRetention` [interface-IndicesTranslogRetention]

| Name | Type | Description |
| - | - | - |
| `age` | [Duration](./Duration.md) | This controls the maximum duration for which translog files are kept by each shard. Keeping more translog files increases the chance of performing an operation based sync when recovering replicas. If the translog files are not sufficient, replica recovery will fall back to a file based sync. This setting is ignored, and should not be set, if soft deletes are enabled. Soft deletes are enabled by default in indices created in Elasticsearch versions 7.0.0 and later. |
| `size` | [ByteSize](./ByteSize.md) | This controls the total size of translog files to keep for each shard. Keeping more translog files increases the chance of performing an operation based sync when recovering a replica. If the translog files are not sufficient, replica recovery will fall back to a file based sync. This setting is ignored, and should not be set, if soft deletes are enabled. Soft deletes are enabled by default in indices created in Elasticsearch versions 7.0.0 and later. |
