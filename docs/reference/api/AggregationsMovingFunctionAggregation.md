# `AggregationsMovingFunctionAggregation` [interface-AggregationsMovingFunctionAggregation]

| Name | Type | Description |
| - | - | - |
| `script` | string | The script that should be executed on each window of data. |
| `shift` | [integer](./integer.md) | By default, the window consists of the last n values excluding the current bucket. Increasing `shift` by 1, moves the starting window position by 1 to the right. |
| `window` | [integer](./integer.md) | The size of window to "slide" across the histogram. |
