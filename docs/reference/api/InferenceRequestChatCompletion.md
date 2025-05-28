# `InferenceRequestChatCompletion` [interface-InferenceRequestChatCompletion]

| Name | Type | Description |
| - | - | - |
| `max_completion_tokens` | [long](./long.md) | The upper bound limit for the number of tokens that can be generated for a completion request. |
| `messages` | [InferenceMessage](./InferenceMessage.md)[] | A list of objects representing the conversation. Requests should generally only add new messages from the user (role `user`). The other message roles ( `assistant`, `system`, or `tool`) should generally only be copied from the response to a previous completion request, such that the messages array is built up throughout a conversation. |
| `model` | string | The ID of the model to use. |
| `stop` | string[] | A sequence of strings to control when the model should stop generating additional tokens. |
| `temperature` | [float](./float.md) | The sampling temperature to use. |
| `tool_choice` | [InferenceCompletionToolType](./InferenceCompletionToolType.md) | Controls which tool is called by the model. |
| `tools` | [InferenceCompletionTool](./InferenceCompletionTool.md)[] | A list of tools that the model can call. |
| `top_p` | [float](./float.md) | Nucleus sampling, an alternative to sampling with temperature. |
