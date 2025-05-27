## Interface `MgetResponse`

| Name | Type | Description |
| - | - | - |
| `docs` | [MgetResponseItem](./MgetResponseItem.md)<TDocument>[] | The response includes a docs array that contains the documents in the order specified in the request. The structure of the returned documents is similar to that returned by the get API. If there is a failure getting a particular document, the error is included in place of the document. |
