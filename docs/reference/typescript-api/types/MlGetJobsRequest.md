# MlGetJobsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id?` | [`Ids`](Ids.md) | Identifier for the anomaly detection job. It can be a job identifier, a
group name, or a wildcard expression. If you do not specify one of these
options, the API returns information for all anomaly detection jobs. |
| `allow_no_match?` | `boolean` | Specifies what to do when the request:

1. Contains wildcard expressions and there are no jobs that match.
2. Contains the _all string or no identifiers and there are no matches.
3. Contains wildcard expressions and there are only partial matches.

The default value is `true`, which returns an empty `jobs` array when
there are no matches and the subset of results when there are partial
matches. If this parameter is `false`, the request returns a `404` status
code when there are no matches or only partial matches. |
| `exclude_generated?` | `boolean` | Indicates if certain fields should be removed from the configuration on
retrieval. This allows the configuration to be in an acceptable format to
be retrieved and then added to another cluster. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, allow_no_match?: never, exclude_generated?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, allow_no_match?: never, exclude_generated?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
