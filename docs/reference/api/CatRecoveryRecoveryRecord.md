## Interface `CatRecoveryRecoveryRecord`

| Name | Type | Description |
| - | - | - |
| `b` | string | The number of bytes to recover. bytes |
| `bp` | [Percentage](./Percentage.md) | The ratio of bytes recovered. bytes_percent |
| `br` | string | The bytes recovered. bytes_recovered |
| `bytes_percent` | [Percentage](./Percentage.md) | The ratio of bytes recovered. |
| `bytes_recovered` | string | The bytes recovered. |
| `bytes_total` | string | The total number of bytes. |
| `bytes` | string | The number of bytes to recover. |
| `f` | string | The number of files to recover. files |
| `files_percent` | [Percentage](./Percentage.md) | The ratio of files recovered. |
| `files_recovered` | string | The files recovered. |
| `files_total` | string | The total number of files. |
| `files` | string | The number of files to recover. |
| `fp` | [Percentage](./Percentage.md) | The ratio of files recovered. files_percent |
| `fr` | string | The files recovered. files_recovered |
| `i` | [IndexName](./IndexName.md) | The index name. index |
| `idx` | [IndexName](./IndexName.md) | The index name. index |
| `index` | [IndexName](./IndexName.md) | The index name. |
| `rep` | string | The repository name. repository |
| `repository` | string | The repository name. |
| `s` | string | The shard name. shard |
| `sh` | string | The shard name. shard |
| `shard` | string | The shard name. |
| `shost` | string | The source host. source_host |
| `snap` | string | The snapshot name. snapshot |
| `snapshot` | string | The snapshot name. |
| `snode` | string | The source node name. source_node |
| `source_host` | string | The source host. |
| `source_node` | string | The source node name. |
| `st` | string | The recovery stage. stage |
| `stage` | string | The recovery stage. |
| `start_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The recovery start time in epoch milliseconds. start_time_millis |
| `start_time_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The recovery start time in epoch milliseconds. |
| `start_time` | [DateTime](./DateTime.md) | The recovery start time. |
| `start` | [DateTime](./DateTime.md) | The recovery start time. start_time |
| `stop_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The recovery stop time in epoch milliseconds. stop_time_millis |
| `stop_time_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The recovery stop time in epoch milliseconds. |
| `stop_time` | [DateTime](./DateTime.md) | The recovery stop time. |
| `stop` | [DateTime](./DateTime.md) | The recovery stop time. stop_time |
| `t` | [Duration](./Duration.md) | The recovery time. time |
| `target_host` | string | The target host. |
| `target_node` | string | The target node name. |
| `tb` | string | The total number of bytes. bytes_total |
| `tf` | string | The total number of files. files_total |
| `thost` | string | The target host. target_host |
| `ti` | [Duration](./Duration.md) | The recovery time. time |
| `time` | [Duration](./Duration.md) | The recovery time. |
| `tnode` | string | The target node name. target_node |
| `to` | string | The number of translog operations to recover. translog_ops |
| `top` | [Percentage](./Percentage.md) | The ratio of translog operations recovered. translog_ops_percent |
| `tor` | string | The translog operations recovered. translog_ops_recovered |
| `translog_ops_percent` | [Percentage](./Percentage.md) | The ratio of translog operations recovered. |
| `translog_ops_recovered` | string | The translog operations recovered. |
| `translog_ops` | string | The number of translog operations to recover. |
| `ty` | string | The recovery type. type |
| `type` | string | The recovery type. |
