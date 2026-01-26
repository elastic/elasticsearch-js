# Client.ilm.moveToStep

Move to a lifecycle step. Manually move an index into a specific step in the lifecycle policy and run that step. WARNING: This operation can result in the loss of data. Manually moving an index into a specific step runs that step even if it has already been performed. This is a potentially destructive action and this should be considered an expert level API. You must specify both the current step and the step to be executed in the body of the request. The request will fail if the current step does not match the step currently running for the index This is to prevent the index from being moved from an unexpected step into the next step. When specifying the target (`next_step`) to which the index will be moved, either the name or both the action and name fields are optional. If only the phase is specified, the index will move to the first step of the first action in the target phase. If the phase and action are specified, the index will move to the first step of the specified action in the specified phase. Only actions specified in the ILM policy are considered valid. An index cannot move to a step that is not part of its policy.

## Method Signature

```typescript
client.ilm.moveToStep(this: That, params: T.IlmMoveToStepRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmMoveToStepResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IlmMoveToStepRequest`](../types/IlmMoveToStepRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmMoveToStepResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
