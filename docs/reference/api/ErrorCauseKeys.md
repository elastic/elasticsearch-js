# `ErrorCauseKeys` [interface-ErrorCauseKeys]

| Name | Type | Description |
| - | - | - |
| `caused_by` | [ErrorCause](./ErrorCause.md) | &nbsp; |
| `reason` | string | A human-readable explanation of the error, in English. |
| `root_cause` | [ErrorCause](./ErrorCause.md)[] | &nbsp; |
| `stack_trace` | string | The server stack trace. Present only if the `error_trace=true` parameter was sent with the request. |
| `suppressed` | [ErrorCause](./ErrorCause.md)[] | &nbsp; |
| `type` | string | The type of error |
