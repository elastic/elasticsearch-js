# SlmPutLifecycleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `policy_id` | [`Name`](Name.md) | The identifier for the snapshot lifecycle policy you want to create or update. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error.
To indicate that the request should never timeout, set it to `-1`. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error.
To indicate that the request should never timeout, set it to `-1`. |
| `config?` | [`SlmConfiguration`](SlmConfiguration.md) | Configuration for each snapshot created by the policy. |
| `name?` | [`Name`](Name.md) | Name automatically assigned to each snapshot created by the policy. Date math is supported. To prevent conflicting snapshot names, a UUID is automatically appended to each snapshot name. |
| `repository?` | `string` | Repository used to store snapshots created by this policy. This repository must exist prior to the policy’s creation. You can create a repository using the snapshot repository API. |
| `retention?` | [`SlmRetention`](SlmRetention.md) | Retention rules used to retain and delete snapshots created by the policy. |
| `schedule?` | [`WatcherCronExpression`](WatcherCronExpression.md) | Periodic or absolute schedule at which the policy creates snapshots. SLM applies schedule changes immediately. |
| `body?` | `string | { [key: string]: any } & { policy_id?: never, master_timeout?: never, timeout?: never, config?: never, name?: never, repository?: never, retention?: never, schedule?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { policy_id?: never, master_timeout?: never, timeout?: never, config?: never, name?: never, repository?: never, retention?: never, schedule?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
