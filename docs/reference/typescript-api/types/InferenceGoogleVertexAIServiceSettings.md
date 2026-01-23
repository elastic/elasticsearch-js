# InferenceGoogleVertexAIServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `provider?` | [`InferenceGoogleModelGardenProvider`](InferenceGoogleModelGardenProvider.md) | The name of the Google Model Garden Provider for `completion` and `chat_completion` tasks.
In order for a Google Model Garden endpoint to be used `provider` must be defined and be other than `google`.
Modes:
- Google Model Garden (third-party models): set `provider` to a supported non-`google` value and provide `url` and/or `streaming_url`.
- Google Vertex AI: omit `provider` or set it to `google`. In this mode, do not set `url` or `streaming_url` and Elastic will construct the endpoint url from `location`, `model_id`, and `project_id` parameters. |
| `url?` | `string` | The URL for non-streaming `completion` requests to a Google Model Garden provider endpoint.
If both `url` and `streaming_url` are provided, each is used for its respective mode.
If `streaming_url` is not provided, `url` is also used for streaming `completion` and `chat_completion`.
If `provider` is not provided or set to `google` (Google Vertex AI), do not set `url` (or `streaming_url`).
At least one of `url` or `streaming_url` must be provided for Google Model Garden endpoint usage.
Certain providers require separate URLs for streaming and non-streaming operations (e.g., Anthropic, Mistral, AI21). Others support both operation types through a single URL (e.g., Meta, Hugging Face).
Information on constructing the URL for various providers can be found in the Google Model Garden documentation for the model, or on the endpoint’s `Sample request` page. The request examples also illustrate the proper formatting for the `url`. |
| `streaming_url?` | `string` | The URL for streaming `completion` and `chat_completion` requests to a Google Model Garden provider endpoint.
If both `streaming_url` and `url` are provided, each is used for its respective mode.
If `url` is not provided, `streaming_url` is also used for non-streaming `completion` requests.
If `provider` is not provided or set to `google` (Google Vertex AI), do not set `streaming_url` (or `url`).
At least one of `streaming_url` or `url` must be provided for Google Model Garden endpoint usage.
Certain providers require separate URLs for streaming and non-streaming operations (e.g., Anthropic, Mistral, AI21). Others support both operation types through a single URL (e.g., Meta, Hugging Face).
Information on constructing the URL for various providers can be found in the Google Model Garden documentation for the model, or on the endpoint’s `Sample request` page. The request examples also illustrate the proper formatting for the `streaming_url`. |
| `location?` | `string` | The name of the location to use for the inference task for the Google Vertex AI inference task.
For Google Vertex AI, when `provider` is omitted or `google` `location` is mandatory.
For Google Model Garden's `completion` and `chat_completion` tasks, when `provider` is a supported non-`google` value - `location` is ignored.
Refer to the Google documentation for the list of supported locations. |
| `model_id?` | `string` | The name of the model to use for the inference task.
For Google Vertex AI `model_id` is mandatory.
For Google Model Garden's `completion` and `chat_completion` tasks, when `provider` is a supported non-`google` value - `model_id` will be used for some providers that require it, otherwise - ignored.
Refer to the Google documentation for the list of supported models for Google Vertex AI. |
| `project_id?` | `string` | The name of the project to use for the Google Vertex AI inference task.
For Google Vertex AI `project_id` is mandatory.
For Google Model Garden's `completion` and `chat_completion` tasks, when `provider` is a supported non-`google` value - `project_id` is ignored. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Google Vertex AI.
By default, the `googlevertexai` service sets the number of requests allowed per minute to 30.000. |
| `service_account_json` | `string` | A valid service account in JSON format for the Google Vertex AI API. |
| `dimensions?` | [`integer`](integer.md) | For a `text_embedding` task, the number of dimensions the resulting output embeddings should have.
By default, the model's standard output dimension is used.
Refer to the Google documentation for more information. |
| `max_batch_size?` | [`integer`](integer.md) | Only applicable for the `text_embedding` task type.
Controls the batch size of chunked inference requests sent to Google Vertex AI.

Setting this parameter lower reduces the risk of exceeding token limits but may result in more API calls. Setting it higher increases throughput but may risk hitting token limits.

To estimate a safe `max_batch_size` value, you can use it together with the `max_chunk_size` parameter using the following formula:
`max_batch_size ≈ max_chunk_size × 1.3 × 512 ÷ 20000`

Where:
- `1.3` is an approximate tokens-per-word ratio
- `512` is the maximum number of chunks that can be generated per document
- `20000` is the Google Vertex AI token limit per request

This estimate assumes the worst-case scenario with a document generating the maximum 512 chunks. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
