## Interface `FleetGlobalCheckpointsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; wait_for_advance?: never; wait_for_index?: never; checkpoints?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `checkpoints` | [FleetCheckpoint](./FleetCheckpoint.md)[] | A comma separated list of previous global checkpoints. When used in combination with `wait_for_advance`, the API will only return once the global checkpoints advances past the checkpoints. Providing an empty list will cause Elasticsearch to immediately return the current global checkpoints. |
| `index` | [IndexName](./IndexName.md) | [IndexAlias](./IndexAlias.md) | A single index or index alias that resolves to a single index. |
| `querystring` | { [key: string]: any; } & { index?: never; wait_for_advance?: never; wait_for_index?: never; checkpoints?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a global checkpoints to advance past `checkpoints`. |
| `wait_for_advance` | boolean | A boolean value which controls whether to wait (until the timeout) for the global checkpoints to advance past the provided `checkpoints`. |
| `wait_for_index` | boolean | A boolean value which controls whether to wait (until the timeout) for the target index to exist and all primary shards be active. Can only be true when `wait_for_advance` is true. |
