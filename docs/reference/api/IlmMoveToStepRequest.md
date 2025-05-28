# `IlmMoveToStepRequest` [interface-IlmMoveToStepRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; current_step?: never; next_step?: never; }) | All values in `body` will be added to the request body. |
| `current_step` | [IlmMoveToStepStepKey](./IlmMoveToStepStepKey.md) | The step that the index is expected to be in. |
| `index` | [IndexName](./IndexName.md) | The name of the index whose lifecycle step is to change |
| `next_step` | [IlmMoveToStepStepKey](./IlmMoveToStepStepKey.md) | The step that you want to run. |
| `querystring` | { [key: string]: any; } & { index?: never; current_step?: never; next_step?: never; } | All values in `querystring` will be added to the request querystring. |
