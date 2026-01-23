# SecurityUpdateUserProfileDataRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `uid` | [`SecurityUserProfileId`](SecurityUserProfileId.md) | A unique identifier for the user profile. |
| `if_seq_no?` | [`SequenceNumber`](SequenceNumber.md) | Only perform the operation if the document has this sequence number. |
| `if_primary_term?` | [`long`](long.md) | Only perform the operation if the document has this primary term. |
| `refresh?` | [`Refresh`](Refresh.md) | If 'true', Elasticsearch refreshes the affected shards to make this operation
visible to search.
If 'wait_for', it waits for a refresh to make this operation visible to search.
If 'false', nothing is done with refreshes. |
| `labels?` | `Record<string, any>` | Searchable data that you want to associate with the user profile.
This field supports a nested data structure.
Within the labels object, top-level keys cannot begin with an underscore (`_`) or contain a period (`.`). |
| `data?` | `Record<string, any>` | Non-searchable data that you want to associate with the user profile.
This field supports a nested data structure.
Within the `data` object, top-level keys cannot begin with an underscore (`_`) or contain a period (`.`).
The data object is not searchable, but can be retrieved with the get user profile API. |
| `body?` | `string | { [key: string]: any } & { uid?: never, if_seq_no?: never, if_primary_term?: never, refresh?: never, labels?: never, data?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { uid?: never, if_seq_no?: never, if_primary_term?: never, refresh?: never, labels?: never, data?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
