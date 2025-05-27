## Interface `MlDeleteDataFrameAnalyticsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; force?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `force` | boolean | If `true`, it deletes a job that is not stopped; this method is quicker than stopping and deleting the job. |
| `id` | [Id](./Id.md) | Identifier for the data frame analytics job. |
| `querystring` | { [key: string]: any; } & { id?: never; force?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | The time to wait for the job to be deleted. |
