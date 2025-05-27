## Interface `NodesCpuAcct`

| Name | Type | Description |
| - | - | - |
| `control_group` | string | The `cpuacct` control group to which the Elasticsearch process belongs. |
| `usage_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The total CPU time, in nanoseconds, consumed by all tasks in the same cgroup as the Elasticsearch process. |
