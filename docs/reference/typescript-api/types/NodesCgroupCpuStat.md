# NodesCgroupCpuStat

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `number_of_elapsed_periods?` | `long` | The number of reporting periods (as specified by `cfs_period_micros`) that have elapsed. |
| `number_of_times_throttled?` | `long` | The number of times all tasks in the same cgroup as the Elasticsearch process have been throttled. |
| `time_throttled_nanos?` | `DurationValue<UnitNanos>` | The total amount of time, in nanoseconds, for which all tasks in the same cgroup as the Elasticsearch process have been throttled. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
