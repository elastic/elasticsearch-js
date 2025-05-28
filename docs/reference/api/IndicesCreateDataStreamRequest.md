# `IndicesCreateDataStreamRequest` [interface-IndicesCreateDataStreamRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [DataStreamName](./DataStreamName.md) | Name of the data stream, which must meet the following criteria: Lowercase only; Cannot include `\`, `/`, `*`, `?`, `"`, `<`, `>`, `|`, `,`, `#`, `:`, or a space character; Cannot start with `-`, `_`, `+`, or `.ds-`; Cannot be `.` or `..`; Cannot be longer than 255 bytes. Multi-byte characters count towards this limit faster. |
| `querystring` | { [key: string]: any; } & { name?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
