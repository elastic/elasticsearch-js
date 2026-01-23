# MlStopTrainedModelDeploymentRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | [`Id`](Id.md) | The unique identifier of the trained model. |
| `id?` | [`Id`](Id.md) | If provided, must be the same identifier as in the path. |
| `allow_no_match?` | `boolean` | Specifies what to do when the request: contains wildcard expressions and there are no deployments that match;
contains the  `_all` string or no identifiers and there are no matches; or contains wildcard expressions and
there are only partial matches. By default, it returns an empty array when there are no matches and the subset of results when there are partial matches.
If `false`, the request returns a 404 status code when there are no matches or only partial matches. |
| `force?` | `boolean` | Forcefully stops the deployment, even if it is used by ingest pipelines. You can't use these pipelines until you
restart the model deployment. |
| `body?` | `string | { [key: string]: any } & { model_id?: never, id?: never, allow_no_match?: never, force?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { model_id?: never, id?: never, allow_no_match?: never, force?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
