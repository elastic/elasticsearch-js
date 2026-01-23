# MlValidateRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id?` | [`Id`](Id.md) | - |
| `analysis_config?` | [`MlAnalysisConfig`](MlAnalysisConfig.md) | - |
| `analysis_limits?` | [`MlAnalysisLimits`](MlAnalysisLimits.md) | - |
| `data_description?` | [`MlDataDescription`](MlDataDescription.md) | - |
| `description?` | `string` | - |
| `model_plot?` | [`MlModelPlotConfig`](MlModelPlotConfig.md) | - |
| `model_snapshot_id?` | [`Id`](Id.md) | - |
| `model_snapshot_retention_days?` | `long` | - |
| `results_index_name?` | [`IndexName`](IndexName.md) | - |
| `body?` | `string | { [key: string]: any } & { job_id?: never, analysis_config?: never, analysis_limits?: never, data_description?: never, description?: never, model_plot?: never, model_snapshot_id?: never, model_snapshot_retention_days?: never, results_index_name?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, analysis_config?: never, analysis_limits?: never, data_description?: never, description?: never, model_plot?: never, model_snapshot_id?: never, model_snapshot_retention_days?: never, results_index_name?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
