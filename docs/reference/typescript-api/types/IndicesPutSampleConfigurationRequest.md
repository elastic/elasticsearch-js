# IndicesPutSampleConfigurationRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | The name of the index or data stream. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is
received before the timeout expires, the request fails and returns an
error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `rate` | [`SpecUtilsStringified`](SpecUtilsStringified.md)<double> | The fraction of documents to sample. Must be greater than 0 and less than or equal to 1.
Can be specified as a number or a string. |
| `max_samples?` | [`integer`](integer.md) | The maximum number of documents to sample. Must be greater than 0 and less than or equal to 10,000. |
| `max_size?` | [`ByteSize`](ByteSize.md) | The maximum total size of sampled documents. Must be greater than 0 and less than or equal to 5GB. |
| `time_to_live?` | [`Duration`](Duration.md) | The duration for which the sampled documents should be retained.
Must be greater than 0 and less than or equal to 30 days. |
| `if?` | `string` | An optional condition script that sampled documents must satisfy. |
| `body?` | `string | { [key: string]: any } & { index?: never, master_timeout?: never, timeout?: never, rate?: never, max_samples?: never, max_size?: never, time_to_live?: never, if?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, master_timeout?: never, timeout?: never, rate?: never, max_samples?: never, max_size?: never, time_to_live?: never, if?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
