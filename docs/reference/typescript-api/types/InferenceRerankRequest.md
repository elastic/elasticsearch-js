# InferenceRerankRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `inference_id` | [`Id`](Id.md) | The unique identifier for the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | The amount of time to wait for the inference request to complete. |
| `query` | `string` | Query input. |
| `input` | `string[]` | The documents to rank. |
| `return_documents?` | `boolean` | Include the document text in the response. |
| `top_n?` | `integer` | Limit the response to the top N documents. |
| `task_settings?` | [`InferenceTaskSettings`](InferenceTaskSettings.md) | Task settings for the individual inference request.
These settings are specific to the task type you specified and override the task settings specified when initializing the service. |
| `body?` | `string | { [key: string]: any } & { inference_id?: never, timeout?: never, query?: never, input?: never, return_documents?: never, top_n?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { inference_id?: never, timeout?: never, query?: never, input?: never, return_documents?: never, top_n?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
