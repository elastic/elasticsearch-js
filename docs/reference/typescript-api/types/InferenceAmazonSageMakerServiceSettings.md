# InferenceAmazonSageMakerServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `access_key` | `string` | A valid AWS access key that has permissions to use Amazon SageMaker and access to models for invoking requests. |
| `endpoint_name` | `string` | The name of the SageMaker endpoint. |
| `api` | [`InferenceAmazonSageMakerApi`](InferenceAmazonSageMakerApi.md) | The API format to use when calling SageMaker.
Elasticsearch will convert the POST _inference request to this data format when invoking the SageMaker endpoint. |
| `region` | `string` | The region that your endpoint or Amazon Resource Name (ARN) is deployed in.
The list of available regions per model can be found in the Amazon SageMaker documentation. |
| `secret_key` | `string` | A valid AWS secret key that is paired with the `access_key`.
For information about creating and managing access and secret keys, refer to the AWS documentation. |
| `target_model?` | `string` | The model ID when calling a multi-model endpoint. |
| `target_container_hostname?` | `string` | The container to directly invoke when calling a multi-container endpoint. |
| `inference_component_name?` | `string` | The inference component to directly invoke when calling a multi-component endpoint. |
| `batch_size?` | `integer` | The maximum number of inputs in each batch. This value is used by inference ingestion pipelines
when processing semantic values. It correlates to the number of times the SageMaker endpoint is
invoked (one per batch of input). |
| `dimensions?` | `integer` | The number of dimensions returned by the text embedding models. If this value is not provided, then
it is guessed by making invoking the endpoint for the `text_embedding` task. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
