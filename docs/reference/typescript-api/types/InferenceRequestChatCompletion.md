# InferenceRequestChatCompletion

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `messages` | [`InferenceMessage`](InferenceMessage.md)[] | A list of objects representing the conversation.
Requests should generally only add new messages from the user (role `user`).
The other message roles (`assistant`, `system`, or `tool`) should generally only be copied from the response to a previous completion request, such that the messages array is built up throughout a conversation. |
| `model?` | `string` | The ID of the model to use. By default, the model ID is set to the value included when creating the inference endpoint. |
| `max_completion_tokens?` | [`long`](long.md) | The upper bound limit for the number of tokens that can be generated for a completion request. |
| `stop?` | `string[]` | A sequence of strings to control when the model should stop generating additional tokens. |
| `temperature?` | [`float`](float.md) | The sampling temperature to use. |
| `tool_choice?` | [`InferenceCompletionToolType`](InferenceCompletionToolType.md) | Controls which tool is called by the model.
String representation: One of `auto`, `none`, or `requrired`. `auto` allows the model to choose between calling tools and generating a message. `none` causes the model to not call any tools. `required` forces the model to call one or more tools.
Example (object representation):
```
{
  "tool_choice": {
      "type": "function",
      "function": {
          "name": "get_current_weather"
      }
  }
}
``` |
| `tools?` | [`InferenceCompletionTool`](InferenceCompletionTool.md)[] | A list of tools that the model can call.
Example:
```
{
  "tools": [
      {
          "type": "function",
          "function": {
              "name": "get_price_of_item",
              "description": "Get the current price of an item",
              "parameters": {
                  "type": "object",
                  "properties": {
                      "item": {
                          "id": "12345"
                      },
                      "unit": {
                          "type": "currency"
                      }
                  }
              }
          }
      }
  ]
}
``` |
| `top_p?` | [`float`](float.md) | Nucleus sampling, an alternative to sampling with temperature. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
