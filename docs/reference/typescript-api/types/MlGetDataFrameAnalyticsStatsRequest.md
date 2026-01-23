# MlGetDataFrameAnalyticsStatsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | Identifier for the data frame analytics job. If you do not specify this
option, the API returns information for the first hundred data frame
analytics jobs. |
| `allow_no_match?` | `boolean` | Specifies what to do when the request:

1. Contains wildcard expressions and there are no data frame analytics
jobs that match.
2. Contains the `_all` string or no identifiers and there are no matches.
3. Contains wildcard expressions and there are only partial matches.

The default value returns an empty data_frame_analytics array when there
are no matches and the subset of results when there are partial matches.
If this parameter is `false`, the request returns a 404 status code when
there are no matches or only partial matches. |
| `from?` | `integer` | Skips the specified number of data frame analytics jobs. |
| `size?` | `integer` | Specifies the maximum number of data frame analytics jobs to obtain. |
| `verbose?` | `boolean` | Defines whether the stats response should be verbose. |
| `body?` | `string | { [key: string]: any } & { id?: never, allow_no_match?: never, from?: never, size?: never, verbose?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, allow_no_match?: never, from?: never, size?: never, verbose?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
