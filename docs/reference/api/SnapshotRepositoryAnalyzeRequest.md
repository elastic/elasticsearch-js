# `SnapshotRepositoryAnalyzeRequest` [interface-SnapshotRepositoryAnalyzeRequest]

| Name | Type | Description |
| - | - | - |
| `blob_count` | [integer](./integer.md) | The total number of blobs to write to the repository during the test. For realistic experiments, you should set it to at least `2000`. |
| `body` | string | ({ [key: string]: any; } & { name?: never; blob_count?: never; concurrency?: never; detailed?: never; early_read_node_count?: never; max_blob_size?: never; max_total_data_size?: never; rare_action_probability?: never; rarely_abort_writes?: never; read_node_count?: never; register_operation_count?: never; seed?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `concurrency` | [integer](./integer.md) | The number of operations to run concurrently during the test. |
| `detailed` | boolean | Indicates whether to return detailed results, including timing information for every operation performed during the analysis. If false, it returns only a summary of the analysis. |
| `early_read_node_count` | [integer](./integer.md) | The number of nodes on which to perform an early read operation while writing each blob. Early read operations are only rarely performed. |
| `max_blob_size` | [ByteSize](./ByteSize.md) | The maximum size of a blob to be written during the test. For realistic experiments, you should set it to at least `2gb`. |
| `max_total_data_size` | [ByteSize](./ByteSize.md) | An upper limit on the total size of all the blobs written during the test. For realistic experiments, you should set it to at least `1tb`. |
| `name` | [Name](./Name.md) | The name of the repository. |
| `querystring` | { [key: string]: any; } & { name?: never; blob_count?: never; concurrency?: never; detailed?: never; early_read_node_count?: never; max_blob_size?: never; max_total_data_size?: never; rare_action_probability?: never; rarely_abort_writes?: never; read_node_count?: never; register_operation_count?: never; seed?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `rare_action_probability` | [double](./double.md) | The probability of performing a rare action such as an early read, an overwrite, or an aborted write on each blob. |
| `rarely_abort_writes` | boolean | Indicates whether to rarely cancel writes before they complete. |
| `read_node_count` | [integer](./integer.md) | The number of nodes on which to read a blob after writing. |
| `register_operation_count` | [integer](./integer.md) | The minimum number of linearizable register operations to perform in total. For realistic experiments, you should set it to at least `100`. |
| `seed` | [integer](./integer.md) | The seed for the pseudo-random number generator used to generate the list of operations performed during the test. To repeat the same set of operations in multiple experiments, use the same seed in each experiment. Note that the operations are performed concurrently so might not always happen in the same order on each run. |
| `timeout` | [Duration](./Duration.md) | The period of time to wait for the test to complete. If no response is received before the timeout expires, the test is cancelled and returns an error. |
