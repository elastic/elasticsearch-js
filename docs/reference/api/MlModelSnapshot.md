# `MlModelSnapshot` [interface-MlModelSnapshot]

| Name | Type | Description |
| - | - | - |
| `description` | string | An optional description of the job. |
| `job_id` | [Id](./Id.md) | A numerical character string that uniquely identifies the job that the snapshot was created for. |
| `latest_record_time_stamp` | [integer](./integer.md) | The timestamp of the latest processed record. |
| `latest_result_time_stamp` | [integer](./integer.md) | The timestamp of the latest bucket result. |
| `min_version` | [VersionString](./VersionString.md) | The minimum version required to be able to restore the model snapshot. |
| `model_size_stats` | [MlModelSizeStats](./MlModelSizeStats.md) | Summary information describing the model. |
| `retain` | boolean | If true, this snapshot will not be deleted during automatic cleanup of snapshots older than model_snapshot_retention_days. However, this snapshot will be deleted when the job is deleted. The default value is false. |
| `snapshot_doc_count` | [long](./long.md) | For internal use only. |
| `snapshot_id` | [Id](./Id.md) | A numerical character string that uniquely identifies the model snapshot. |
| `timestamp` | [long](./long.md) | The creation timestamp for the snapshot. |
