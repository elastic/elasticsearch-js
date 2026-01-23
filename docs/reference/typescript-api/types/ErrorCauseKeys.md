# ErrorCauseKeys

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | The type of error |
| `reason?` | `string | null` | A human-readable explanation of the error, in English. |
| `stack_trace?` | `string` | The server stack trace. Present only if the `error_trace=true` parameter was sent with the request. |
| `caused_by?` | [`ErrorCause`](ErrorCause.md) | - |
| `root_cause?` | `ErrorCause[]` | - |
| `suppressed?` | `ErrorCause[]` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
