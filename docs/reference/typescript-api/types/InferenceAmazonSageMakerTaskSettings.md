# InferenceAmazonSageMakerTaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `custom_attributes?` | `string` | The AWS custom attributes passed verbatim through to the model running in the SageMaker Endpoint.
Values will be returned in the `X-elastic-sagemaker-custom-attributes` header. |
| `enable_explanations?` | `string` | The optional JMESPath expression used to override the EnableExplanations provided during endpoint creation. |
| `inference_id?` | `string` | The capture data ID when enabled in the endpoint. |
| `session_id?` | `string` | The stateful session identifier for a new or existing session.
New sessions will be returned in the `X-elastic-sagemaker-new-session-id` header.
Closed sessions will be returned in the `X-elastic-sagemaker-closed-session-id` header. |
| `target_variant?` | `string` | Specifies the variant when running with multi-variant Endpoints. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
