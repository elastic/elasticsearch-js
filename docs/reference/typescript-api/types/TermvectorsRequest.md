# TermvectorsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | The name of the index that contains the document. |
| `id?` | [`Id`](Id.md) | A unique identifier for the document. |
| `preference?` | `string` | The node or shard the operation should be performed on.
It is random by default. |
| `realtime?` | `boolean` | If true, the request is real-time as opposed to near-real-time. |
| `doc?` | [`TDocument`](TDocument.md) | An artificial document (a document not present in the index) for which you want to retrieve term vectors. |
| `filter?` | [`TermvectorsFilter`](TermvectorsFilter.md) | Filter terms based on their tf-idf scores.
This could be useful in order find out a good characteristic vector of a document.
This feature works in a similar manner to the second phase of the More Like This Query. |
| `per_field_analyzer?` | `Record<Field, string>` | Override the default per-field analyzer.
This is useful in order to generate term vectors in any fashion, especially when using artificial documents.
When providing an analyzer for a field that already stores term vectors, the term vectors will be regenerated. |
| `fields?` | `Field[]` | A list of fields to include in the statistics.
It is used as the default list unless a specific field list is provided in the `completion_fields` or `fielddata_fields` parameters. |
| `field_statistics?` | `boolean` | If `true`, the response includes:

* The document count (how many documents contain this field).
* The sum of document frequencies (the sum of document frequencies for all terms in this field).
* The sum of total term frequencies (the sum of total term frequencies of each term in this field). |
| `offsets?` | `boolean` | If `true`, the response includes term offsets. |
| `payloads?` | `boolean` | If `true`, the response includes term payloads. |
| `positions?` | `boolean` | If `true`, the response includes term positions. |
| `term_statistics?` | `boolean` | If `true`, the response includes:

* The total term frequency (how often a term occurs in all documents).
* The document frequency (the number of documents containing the current term).

By default these values are not returned since term statistics can have a serious performance impact. |
| `routing?` | [`Routing`](Routing.md) | A custom value that is used to route operations to a specific shard. |
| `version?` | [`VersionNumber`](VersionNumber.md) | If `true`, returns the document version as part of a hit. |
| `version_type?` | [`VersionType`](VersionType.md) | The version type. |
| `body?` | `string | { [key: string]: any } & { index?: never, id?: never, preference?: never, realtime?: never, doc?: never, filter?: never, per_field_analyzer?: never, fields?: never, field_statistics?: never, offsets?: never, payloads?: never, positions?: never, term_statistics?: never, routing?: never, version?: never, version_type?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, id?: never, preference?: never, realtime?: never, doc?: never, filter?: never, per_field_analyzer?: never, fields?: never, field_statistics?: never, offsets?: never, payloads?: never, positions?: never, term_statistics?: never, routing?: never, version?: never, version_type?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
