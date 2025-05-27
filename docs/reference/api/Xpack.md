## `Xpack`

### Constructor

:::
new Xpack(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `info` | `info(this: [That](./That.md), params?: [XpackInfoRequest](./XpackInfoRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[XpackInfoResponse](./XpackInfoResponse.md)>;` | Get information. The information provided by the API includes: * Build information including the build number and timestamp. * License information about the currently installed license. * Feature information for the features that are currently enabled and available under the current license. || `info` | `info(this: [That](./That.md), params?: [XpackInfoRequest](./XpackInfoRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[XpackInfoResponse](./XpackInfoResponse.md), unknown>>;` | &nbsp; || `info` | `info(this: [That](./That.md), params?: [XpackInfoRequest](./XpackInfoRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[XpackInfoResponse](./XpackInfoResponse.md)>;` | &nbsp; || `usage` | `usage(this: [That](./That.md), params?: [XpackUsageRequest](./XpackUsageRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[XpackUsageResponse](./XpackUsageResponse.md)>;` | Get usage information. Get information about the features that are currently enabled and available under the current license. The API also provides some usage statistics. || `usage` | `usage(this: [That](./That.md), params?: [XpackUsageRequest](./XpackUsageRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[XpackUsageResponse](./XpackUsageResponse.md), unknown>>;` | &nbsp; || `usage` | `usage(this: [That](./That.md), params?: [XpackUsageRequest](./XpackUsageRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[XpackUsageResponse](./XpackUsageResponse.md)>;` | &nbsp; |