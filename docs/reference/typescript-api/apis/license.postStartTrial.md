# Client.license.postStartTrial

Start a trial. Start a 30-day trial, which gives access to all subscription features. NOTE: You are allowed to start a trial only if your cluster has not already activated a trial for the current major product version. For example, if you have already activated a trial for v8.0, you cannot start a new trial until v9.0. You can, however, request an extended trial at https://www.elastic.co/trialextension. To check the status of your trial, use the get trial status API.

## Method Signature

```typescript
client.license.postStartTrial(this: That, params?: T.LicensePostStartTrialRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LicensePostStartTrialResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`LicensePostStartTrialRequest`](../types/LicensePostStartTrialRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.LicensePostStartTrialResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
