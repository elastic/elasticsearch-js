# InferenceChatCompletionUnifiedRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `inference_id` | [`Id`](Id.md) | The inference Id |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference request to complete. |
| `chat_completion_request?` | [`InferenceRequestChatCompletion`](InferenceRequestChatCompletion.md) | - |
| `body?` | `string | { [key: string]: any } & { inference_id?: never, timeout?: never, chat_completion_request?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { inference_id?: never, timeout?: never, chat_completion_request?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
