## Interface `MlInferTrainedModelRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { model_id?: never; timeout?: never; docs?: never; inference_config?: never; }) | All values in `body` will be added to the request body. |
| `docs` | Record<string, any>[] | An array of objects to pass to the model for inference. The objects should contain a fields matching your configured trained model input. Typically, for NLP models, the field name is `text_field`. Currently, for NLP models, only a single value is allowed. |
| `inference_config` | [MlInferenceConfigUpdateContainer](./MlInferenceConfigUpdateContainer.md) | The inference configuration updates to apply on the API call |
| `model_id` | [Id](./Id.md) | The unique identifier of the trained model. |
| `querystring` | { [key: string]: any; } & { model_id?: never; timeout?: never; docs?: never; inference_config?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Controls the amount of time to wait for inference results. |
