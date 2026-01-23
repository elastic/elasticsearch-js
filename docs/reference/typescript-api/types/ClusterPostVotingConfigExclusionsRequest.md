# ClusterPostVotingConfigExclusionsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node_names?` | [`Names`](Names.md) | A comma-separated list of the names of the nodes to exclude from the
voting configuration. If specified, you may not also specify node_ids. |
| `node_ids?` | [`Ids`](Ids.md) | A comma-separated list of the persistent ids of the nodes to exclude
from the voting configuration. If specified, you may not also specify node_names. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | When adding a voting configuration exclusion, the API waits for the
specified nodes to be excluded from the voting configuration before
returning. If the timeout expires before the appropriate condition
is satisfied, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { node_names?: never, node_ids?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { node_names?: never, node_ids?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
