## Interface `SlmConfiguration`

| Name | Type | Description |
| - | - | - |
| `feature_states` | string[] | A list of feature states to be included in this snapshot. A list of features available for inclusion in the snapshot and their descriptions be can be retrieved using the get features API. Each feature state includes one or more system indices containing data necessary for the function of that feature. Providing an empty array will include no feature states in the snapshot, regardless of the value of include_global_state. By default, all available feature states will be included in the snapshot if include_global_state is true, or no feature states if include_global_state is false. |
| `ignore_unavailable` | boolean | If false, the snapshot fails if any data stream or index in indices is missing or closed. If true, the snapshot ignores missing or closed data streams and indices. |
| `include_global_state` | boolean | If true, the current global state is included in the snapshot. |
| `indices` | [Indices](./Indices.md) | A comma-separated list of data streams and indices to include in the snapshot. Multi-index syntax is supported. By default, a snapshot includes all data streams and indices in the cluster. If this argument is provided, the snapshot only includes the specified data streams and clusters. |
| `metadata` | [Metadata](./Metadata.md) | Attaches arbitrary metadata to the snapshot, such as a record of who took the snapshot, why it was taken, or any other useful data. Metadata must be less than 1024 bytes. |
| `partial` | boolean | If false, the entire snapshot will fail if one or more indices included in the snapshot do not have all primary shards available. |
