# InferencePutAmazonsagemakerRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceTaskTypeAmazonSageMaker`](InferenceTaskTypeAmazonSageMaker.md) | The type of the inference task that the model will perform. |
| `amazonsagemaker_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `chunking_settings?` | [`InferenceInferenceChunkingSettings`](InferenceInferenceChunkingSettings.md) | The chunking configuration object.
Applies only to the `sparse_embedding` or `text_embedding` task types.
Not applicable to the `rerank`, `completion`, or `chat_completion` task types. |
| `service` | [`InferenceAmazonSageMakerServiceType`](InferenceAmazonSageMakerServiceType.md) | The type of service supported for the specified task type. In this case, `amazon_sagemaker`. |
| `service_settings` | [`InferenceAmazonSageMakerServiceSettings`](InferenceAmazonSageMakerServiceSettings.md) | Settings used to install the inference model.
These settings are specific to the `amazon_sagemaker` service and `service_settings.api` you specified. |
| `task_settings?` | [`InferenceAmazonSageMakerTaskSettings`](InferenceAmazonSageMakerTaskSettings.md) | Settings to configure the inference task.
These settings are specific to the task type and `service_settings.api` you specified. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, amazonsagemaker_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, amazonsagemaker_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
