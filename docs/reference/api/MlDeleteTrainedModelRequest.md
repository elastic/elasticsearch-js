# `MlDeleteTrainedModelRequest` [interface-MlDeleteTrainedModelRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; force?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `force` | boolean | Forcefully deletes a trained model that is referenced by ingest pipelines or has a started deployment. |
| `model_id` | [Id](./Id.md) | The unique identifier of the trained model. |
| `querystring` | { [key: string]: any; } & { model_id?: never; force?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
