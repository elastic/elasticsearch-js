# `ClusterRerouteRequest` [interface-ClusterRerouteRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { dry_run?: never; explain?: never; metric?: never; retry_failed?: never; master_timeout?: never; timeout?: never; commands?: never; }) | All values in `body` will be added to the request body. |
| `commands` | [ClusterRerouteCommand](./ClusterRerouteCommand.md)[] | Defines the commands to perform. |
| `dry_run` | boolean | If true, then the request simulates the operation. It will calculate the result of applying the commands to the current cluster state and return the resulting cluster state after the commands (and rebalancing) have been applied; it will not actually perform the requested changes. |
| `explain` | boolean | If true, then the response contains an explanation of why the commands can or cannot run. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `metric` | [Metrics](./Metrics.md) | Limits the information returned to the specified metrics. |
| `querystring` | { [key: string]: any; } & { dry_run?: never; explain?: never; metric?: never; retry_failed?: never; master_timeout?: never; timeout?: never; commands?: never; } | All values in `querystring` will be added to the request querystring. |
| `retry_failed` | boolean | If true, then retries allocation of shards that are blocked due to too many subsequent allocation failures. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
