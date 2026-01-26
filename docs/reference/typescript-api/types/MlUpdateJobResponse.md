# MlUpdateJobResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `allow_lazy_open` | `boolean` | - |
| `analysis_config` | [`MlAnalysisConfigRead`](MlAnalysisConfigRead.md) | - |
| `analysis_limits` | [`MlAnalysisLimits`](MlAnalysisLimits.md) | - |
| `background_persist_interval?` | [`Duration`](Duration.md) | - |
| `create_time` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `finished_time?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `custom_settings?` | `Record<string, string>` | - |
| `daily_model_snapshot_retention_after_days` | [`long`](long.md) | - |
| `data_description` | [`MlDataDescription`](MlDataDescription.md) | - |
| `datafeed_config?` | [`MlDatafeed`](MlDatafeed.md) | - |
| `description?` | `string` | - |
| `groups?` | `string`[] | - |
| `job_id` | [`Id`](Id.md) | - |
| `job_type` | `string` | - |
| `job_version` | [`VersionString`](VersionString.md) | - |
| `model_plot_config?` | [`MlModelPlotConfig`](MlModelPlotConfig.md) | - |
| `model_snapshot_id?` | [`Id`](Id.md) | - |
| `model_snapshot_retention_days` | [`long`](long.md) | - |
| `renormalization_window_days?` | [`long`](long.md) | - |
| `results_index_name` | [`IndexName`](IndexName.md) | - |
| `results_retention_days?` | [`long`](long.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
