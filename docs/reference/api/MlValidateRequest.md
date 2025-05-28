# `MlValidateRequest` [interface-MlValidateRequest]

| Name | Type | Description |
| - | - | - |
| `analysis_config` | [MlAnalysisConfig](./MlAnalysisConfig.md) | &nbsp; |
| `analysis_limits` | [MlAnalysisLimits](./MlAnalysisLimits.md) | &nbsp; |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; analysis_config?: never; analysis_limits?: never; data_description?: never; description?: never; model_plot?: never; model_snapshot_id?: never; model_snapshot_retention_days?: never; results_index_name?: never; }) | All values in `body` will be added to the request body. |
| `data_description` | [MlDataDescription](./MlDataDescription.md) | &nbsp; |
| `description` | string | &nbsp; |
| `job_id` | [Id](./Id.md) | &nbsp; |
| `model_plot` | [MlModelPlotConfig](./MlModelPlotConfig.md) | &nbsp; |
| `model_snapshot_id` | [Id](./Id.md) | &nbsp; |
| `model_snapshot_retention_days` | [long](./long.md) | &nbsp; |
| `querystring` | { [key: string]: any; } & { job_id?: never; analysis_config?: never; analysis_limits?: never; data_description?: never; description?: never; model_plot?: never; model_snapshot_id?: never; model_snapshot_retention_days?: never; results_index_name?: never; } | All values in `querystring` will be added to the request querystring. |
| `results_index_name` | [IndexName](./IndexName.md) | &nbsp; |
