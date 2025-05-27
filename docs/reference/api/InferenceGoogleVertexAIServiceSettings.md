## Interface `InferenceGoogleVertexAIServiceSettings`

| Name | Type | Description |
| - | - | - |
| `location` | string | The name of the location to use for the inference task. Refer to the Google documentation for the list of supported locations. |
| `model_id` | string | The name of the model to use for the inference task. Refer to the Google documentation for the list of supported models. |
| `project_id` | string | The name of the project to use for the inference task. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Google Vertex AI. By default, the `googlevertexai` service sets the number of requests allowed per minute to 30.000. |
| `service_account_json` | string | A valid service account in JSON format for the Google Vertex AI API. |
