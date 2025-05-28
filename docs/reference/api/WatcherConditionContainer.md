# `WatcherConditionContainer` [interface-WatcherConditionContainer]

| Name | Type | Description |
| - | - | - |
| `always` | [WatcherAlwaysCondition](./WatcherAlwaysCondition.md) | &nbsp; |
| `array_compare` | [Partial](./Partial.md)<Record<string, [WatcherArrayCompareCondition](./WatcherArrayCompareCondition.md)>> | &nbsp; |
| `compare` | [Partial](./Partial.md)<Record<string, [Partial](./Partial.md)<Record<[WatcherConditionOp](./WatcherConditionOp.md), [FieldValue](./FieldValue.md)>>>> | &nbsp; |
| `never` | [WatcherNeverCondition](./WatcherNeverCondition.md) | &nbsp; |
| `script` | [WatcherScriptCondition](./WatcherScriptCondition.md) | &nbsp; |
