# `MlDeleteForecastRequest` [interface-MlDeleteForecastRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_forecasts` | boolean | Specifies whether an error occurs when there are no forecasts. In particular, if this parameter is set to `false` and there are no forecasts associated with the job, attempts to delete all forecasts return an error. |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; forecast_id?: never; allow_no_forecasts?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `forecast_id` | [Id](./Id.md) | A comma-separated list of forecast identifiers. If you do not specify this optional parameter or if you specify `_all` or `*` the API deletes all forecasts from the job. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `querystring` | { [key: string]: any; } & { job_id?: never; forecast_id?: never; allow_no_forecasts?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Specifies the period of time to wait for the completion of the delete operation. When this period of time elapses, the API fails and returns an error. |
