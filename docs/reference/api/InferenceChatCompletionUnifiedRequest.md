## Interface `InferenceChatCompletionUnifiedRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { inference_id?: never; timeout?: never; chat_completion_request?: never; }) | All values in `body` will be added to the request body. |
| `chat_completion_request` | [InferenceRequestChatCompletion](./InferenceRequestChatCompletion.md) | &nbsp; |
| `inference_id` | [Id](./Id.md) | The inference Id |
| `querystring` | { [key: string]: any; } & { inference_id?: never; timeout?: never; chat_completion_request?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Specifies the amount of time to wait for the inference request to complete. |
