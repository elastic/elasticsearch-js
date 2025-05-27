## Interface `InferenceCompletionToolFunction`

| Name | Type | Description |
| - | - | - |
| `description` | string | A description of what the function does. This is used by the model to choose when and how to call the function. |
| `name` | string | The name of the function. |
| `parameters` | any | The parameters the functional accepts. This should be formatted as a JSON object. |
| `strict` | boolean | Whether to enable schema adherence when generating the function call. |
