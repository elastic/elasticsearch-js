# MtermvectorsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`IndexName`](IndexName.md) | The name of the index that contains the documents. |
| `fields?` | [`Fields`](Fields.md) | A comma-separated list or wildcard expressions of fields to include in the statistics.
It is used as the default list unless a specific field list is provided in the `completion_fields` or `fielddata_fields` parameters. |
| `field_statistics?` | `boolean` | If `true`, the response includes the document count, sum of document frequencies, and sum of total term frequencies. |
| `offsets?` | `boolean` | If `true`, the response includes term offsets. |
| `payloads?` | `boolean` | If `true`, the response includes term payloads. |
| `positions?` | `boolean` | If `true`, the response includes term positions. |
| `preference?` | `string` | The node or shard the operation should be performed on.
It is random by default. |
| `realtime?` | `boolean` | If true, the request is real-time as opposed to near-real-time. |
| `routing?` | [`Routing`](Routing.md) | A custom value used to route operations to a specific shard. |
| `term_statistics?` | `boolean` | If true, the response includes term frequency and document frequency. |
| `version?` | [`VersionNumber`](VersionNumber.md) | If `true`, returns the document version as part of a hit. |
| `version_type?` | [`VersionType`](VersionType.md) | The version type. |
| `docs?` | `MtermvectorsOperation[]` | An array of existing or artificial documents. |
| `ids?` | `Id[]` | A simplified syntax to specify documents by their ID if they're in the same index. |
| `body?` | `string | { [key: string]: any } & { index?: never, fields?: never, field_statistics?: never, offsets?: never, payloads?: never, positions?: never, preference?: never, realtime?: never, routing?: never, term_statistics?: never, version?: never, version_type?: never, docs?: never, ids?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, fields?: never, field_statistics?: never, offsets?: never, payloads?: never, positions?: never, preference?: never, realtime?: never, routing?: never, term_statistics?: never, version?: never, version_type?: never, docs?: never, ids?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
