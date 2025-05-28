# `NodesCgroupMemory` [interface-NodesCgroupMemory]

| Name | Type | Description |
| - | - | - |
| `control_group` | string | The `memory` control group to which the Elasticsearch process belongs. |
| `limit_in_bytes` | string | The maximum amount of user memory (including file cache) allowed for all tasks in the same cgroup as the Elasticsearch process. This value can be too big to store in a `long`, so is returned as a string so that the value returned can exactly match what the underlying operating system interface returns. Any value that is too large to parse into a `long` almost certainly means no limit has been set for the cgroup. |
| `usage_in_bytes` | string | The total current memory usage by processes in the cgroup, in bytes, by all tasks in the same cgroup as the Elasticsearch process. This value is stored as a string for consistency with `limit_in_bytes`. |
