# Client.inference.chatCompletionUnified

Perform chat completion inference on the service. The chat completion inference API enables real-time responses for chat completion tasks by delivering answers incrementally, reducing response times during computation. It only works with the `chat_completion` task type. NOTE: The `chat_completion` task type is only available within the _stream API and only supports streaming. The Chat completion inference API and the Stream inference API differ in their response structure and capabilities. The Chat completion inference API provides more comprehensive customization options through more fields and function calling support. To determine whether a given inference service supports this task type, please see the page for that service.

## Method Signature

```typescript
client.inference.chatCompletionUnified(this: That, params: T.InferenceChatCompletionUnifiedRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferenceChatCompletionUnifiedResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferenceChatCompletionUnifiedRequest`](../types/InferenceChatCompletionUnifiedRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferenceChatCompletionUnifiedResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
