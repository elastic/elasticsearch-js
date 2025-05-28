# `MlTrainedModelStats` [interface-MlTrainedModelStats]

| Name | Type | Description |
| - | - | - |
| `deployment_stats` | [MlTrainedModelDeploymentStats](./MlTrainedModelDeploymentStats.md) | A collection of deployment stats, which is present when the models are deployed. |
| `inference_stats` | [MlTrainedModelInferenceStats](./MlTrainedModelInferenceStats.md) | A collection of inference stats fields. |
| `ingest` | Record<string, any> | A collection of ingest stats for the model across all nodes. The values are summations of the individual node statistics. The format matches the ingest section in the nodes stats API. |
| `model_id` | [Id](./Id.md) | The unique identifier of the trained model. |
| `model_size_stats` | [MlTrainedModelSizeStats](./MlTrainedModelSizeStats.md) | A collection of model size stats. |
| `pipeline_count` | [integer](./integer.md) | The number of ingest pipelines that currently refer to the model. |
