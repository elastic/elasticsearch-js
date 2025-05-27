## `Profiling`

### Constructor

:::
new Profiling(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `flamegraph` | `flamegraph(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[TODO](./TODO.md)>;` | Extracts a UI-optimized structure to render flamegraphs from Universal Profiling. || `flamegraph` | `flamegraph(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[TODO](./TODO.md), unknown>>;` | &nbsp; || `flamegraph` | `flamegraph(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[TODO](./TODO.md)>;` | &nbsp; || `stacktraces` | `stacktraces(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[TODO](./TODO.md)>;` | Extracts raw stacktrace information from Universal Profiling. || `stacktraces` | `stacktraces(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[TODO](./TODO.md), unknown>>;` | &nbsp; || `stacktraces` | `stacktraces(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[TODO](./TODO.md)>;` | &nbsp; || `status` | `status(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[TODO](./TODO.md)>;` | Returns basic information about the status of Universal Profiling. || `status` | `status(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[TODO](./TODO.md), unknown>>;` | &nbsp; || `status` | `status(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[TODO](./TODO.md)>;` | &nbsp; || `topnFunctions` | `topnFunctions(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[TODO](./TODO.md)>;` | Extracts a list of topN functions from Universal Profiling. || `topnFunctions` | `topnFunctions(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[TODO](./TODO.md), unknown>>;` | &nbsp; || `topnFunctions` | `topnFunctions(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[TODO](./TODO.md)>;` | &nbsp; |