## Interface `NodesCgroupCpu`

| Name | Type | Description |
| - | - | - |
| `cfs_period_micros` | [integer](./integer.md) | The period of time, in microseconds, for how regularly all tasks in the same cgroup as the Elasticsearch process should have their access to CPU resources reallocated. |
| `cfs_quota_micros` | [integer](./integer.md) | The total amount of time, in microseconds, for which all tasks in the same cgroup as the Elasticsearch process can run during one period `cfs_period_micros`. |
| `control_group` | string | The `cpu` control group to which the Elasticsearch process belongs. |
| `stat` | [NodesCgroupCpuStat](./NodesCgroupCpuStat.md) | Contains CPU statistics for the node. |
