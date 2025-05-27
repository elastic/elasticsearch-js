## Interface `IndicesDataStreamLifecycle`

| Name | Type | Description |
| - | - | - |
| `data_retention` | [Duration](./Duration.md) | If defined, every document added to this data stream will be stored at least for this time frame. Any time after this duration the document could be deleted. When empty, every document in this data stream will be stored indefinitely. |
| `downsampling` | [IndicesDataStreamLifecycleDownsampling](./IndicesDataStreamLifecycleDownsampling.md) | The downsampling configuration to execute for the managed backing index after rollover. |
| `enabled` | boolean | If defined, it turns data stream lifecycle on/off ( `true`/ `false`) for this data stream. A data stream lifecycle that's disabled (enabled: `false`) will have no effect on the data stream. |
