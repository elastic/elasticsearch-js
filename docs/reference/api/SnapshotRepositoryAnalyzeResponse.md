## Interface `SnapshotRepositoryAnalyzeResponse`

| Name | Type | Description |
| - | - | - |
| `blob_count` | [integer](./integer.md) | The number of blobs written to the repository during the test. |
| `blob_path` | string | The path in the repository under which all the blobs were written during the test. |
| `concurrency` | [integer](./integer.md) | The number of write operations performed concurrently during the test. |
| `coordinating_node` | [SnapshotRepositoryAnalyzeSnapshotNodeInfo](./SnapshotRepositoryAnalyzeSnapshotNodeInfo.md) | The node that coordinated the analysis and performed the final cleanup. |
| `delete_elapsed_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The time it took to delete all the blobs in the container, in nanoseconds. |
| `delete_elapsed` | [Duration](./Duration.md) | The time it took to delete all the blobs in the container. |
| `details` | [SnapshotRepositoryAnalyzeDetailsInfo](./SnapshotRepositoryAnalyzeDetailsInfo.md) | A description of every read and write operation performed during the test. |
| `early_read_node_count` | [integer](./integer.md) | The limit on the number of nodes on which early read operations were performed after writing each blob. |
| `issues_detected` | string[] | A list of correctness issues detected, which is empty if the API succeeded. It is included to emphasize that a successful response does not guarantee correct behaviour in future. |
| `listing_elapsed_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The time it took to retrieve a list of all the blobs in the container, in nanoseconds. |
| `listing_elapsed` | [Duration](./Duration.md) | The time it took to retrieve a list of all the blobs in the container. |
| `max_blob_size_bytes` | [long](./long.md) | The limit, in bytes, on the size of a blob written during the test. |
| `max_blob_size` | [ByteSize](./ByteSize.md) | The limit on the size of a blob written during the test. |
| `max_total_data_size_bytes` | [long](./long.md) | The limit, in bytes, on the total size of all blob written during the test. |
| `max_total_data_size` | [ByteSize](./ByteSize.md) | The limit on the total size of all blob written during the test. |
| `rare_action_probability` | [double](./double.md) | The probability of performing rare actions during the test. |
| `read_node_count` | [integer](./integer.md) | The limit on the number of nodes on which read operations were performed after writing each blob. |
| `repository` | string | The name of the repository that was the subject of the analysis. |
| `seed` | [long](./long.md) | The seed for the pseudo-random number generator used to generate the operations used during the test. |
| `summary` | [SnapshotRepositoryAnalyzeSummaryInfo](./SnapshotRepositoryAnalyzeSummaryInfo.md) | A collection of statistics that summarize the results of the test. |
