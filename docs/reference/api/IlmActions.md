## Interface `IlmActions`

| Name | Type | Description |
| - | - | - |
| `allocate` | [IlmAllocateAction](./IlmAllocateAction.md) | Phases allowed: warm, cold. |
| `delete` | [IlmDeleteAction](./IlmDeleteAction.md) | Phases allowed: delete. |
| `downsample` | [IlmDownsampleAction](./IlmDownsampleAction.md) | Phases allowed: hot, warm, cold. |
| `forcemerge` | [IlmForceMergeAction](./IlmForceMergeAction.md) | Phases allowed: hot, warm. |
| `freeze` | [EmptyObject](./EmptyObject.md) | The freeze action is a noop in 8.x |
| `migrate` | [IlmMigrateAction](./IlmMigrateAction.md) | Phases allowed: warm, cold. |
| `readonly` | [EmptyObject](./EmptyObject.md) | Phases allowed: hot, warm, cold. |
| `rollover` | [IlmRolloverAction](./IlmRolloverAction.md) | Phases allowed: hot. |
| `searchable_snapshot` | [IlmSearchableSnapshotAction](./IlmSearchableSnapshotAction.md) | Phases allowed: hot, cold, frozen. |
| `set_priority` | [IlmSetPriorityAction](./IlmSetPriorityAction.md) | Phases allowed: hot, warm, cold. |
| `shrink` | [IlmShrinkAction](./IlmShrinkAction.md) | Phases allowed: hot, warm. |
| `unfollow` | [EmptyObject](./EmptyObject.md) | Phases allowed: hot, warm, cold, frozen. |
| `wait_for_snapshot` | [IlmWaitForSnapshotAction](./IlmWaitForSnapshotAction.md) | Phases allowed: delete. |
