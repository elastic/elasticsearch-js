# ClusterHealthHealthResponseBody

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `active_primary_shards` | `integer` | The number of active primary shards. |
| `active_shards` | `integer` | The total number of active primary and replica shards. |
| `active_shards_percent?` | `string` | The ratio of active shards in the cluster expressed as a string formatted percentage. |
| `active_shards_percent_as_number` | `double` | The ratio of active shards in the cluster expressed as a percentage. |
| `cluster_name` | [`Name`](Name.md) | The name of the cluster. |
| `delayed_unassigned_shards` | `integer` | The number of shards whose allocation has been delayed by the timeout settings. |
| `indices?` | `Record<IndexName, ClusterHealthIndexHealthStats>` | - |
| `initializing_shards` | `integer` | The number of shards that are under initialization. |
| `number_of_data_nodes` | `integer` | The number of nodes that are dedicated data nodes. |
| `number_of_in_flight_fetch` | `integer` | The number of unfinished fetches. |
| `number_of_nodes` | `integer` | The number of nodes within the cluster. |
| `number_of_pending_tasks` | `integer` | The number of cluster-level changes that have not yet been executed. |
| `relocating_shards` | `integer` | The number of shards that are under relocation. |
| `status` | [`HealthStatus`](HealthStatus.md) | - |
| `task_max_waiting_in_queue?` | [`Duration`](Duration.md) | The time since the earliest initiated task is waiting for being performed. |
| `task_max_waiting_in_queue_millis` | `DurationValue<UnitMillis>` | The time expressed in milliseconds since the earliest initiated task is waiting for being performed. |
| `timed_out` | `boolean` | If false the response returned within the period of time that is specified by the timeout parameter (30s by default) |
| `unassigned_primary_shards` | `integer` | The number of primary shards that are not allocated. |
| `unassigned_shards` | `integer` | The number of shards that are not allocated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
