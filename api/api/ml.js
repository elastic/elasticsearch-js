/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['allow_no_match', 'allow_no_jobs', 'force', 'timeout', 'pretty', 'human', 'error_trace', 'source', 'filter_path', 'requests_per_second', 'allow_no_forecasts', 'wait_for_completion', 'lines_to_sample', 'line_merge_size_limit', 'charset', 'format', 'has_header_row', 'column_names', 'delimiter', 'quote', 'should_trim_fields', 'grok_pattern', 'timestamp_field', 'timestamp_format', 'explain', 'calc_interim', 'start', 'end', 'advance_time', 'skip_time', 'duration', 'expires_in', 'max_model_memory', 'expand', 'exclude_interim', 'from', 'size', 'anomaly_score', 'sort', 'desc', 'job_id', 'partition_field_value', 'exclude_generated', 'verbose', 'allow_no_datafeeds', 'influencer_score', 'top_n', 'bucket_span', 'overall_score', 'record_score', 'include', 'include_model_definition', 'decompress_definition', 'tags', 'reset_start', 'reset_end', 'ignore_unavailable', 'allow_no_indices', 'ignore_throttled', 'expand_wildcards', 'defer_definition_decompression', 'reassign', 'delete_intervening_results', 'enabled']
const snakeCase = { allowNoMatch: 'allow_no_match', allowNoJobs: 'allow_no_jobs', errorTrace: 'error_trace', filterPath: 'filter_path', requestsPerSecond: 'requests_per_second', allowNoForecasts: 'allow_no_forecasts', waitForCompletion: 'wait_for_completion', linesToSample: 'lines_to_sample', lineMergeSizeLimit: 'line_merge_size_limit', hasHeaderRow: 'has_header_row', columnNames: 'column_names', shouldTrimFields: 'should_trim_fields', grokPattern: 'grok_pattern', timestampField: 'timestamp_field', timestampFormat: 'timestamp_format', calcInterim: 'calc_interim', advanceTime: 'advance_time', skipTime: 'skip_time', expiresIn: 'expires_in', maxModelMemory: 'max_model_memory', excludeInterim: 'exclude_interim', anomalyScore: 'anomaly_score', jobId: 'job_id', partitionFieldValue: 'partition_field_value', excludeGenerated: 'exclude_generated', allowNoDatafeeds: 'allow_no_datafeeds', influencerScore: 'influencer_score', topN: 'top_n', bucketSpan: 'bucket_span', overallScore: 'overall_score', recordScore: 'record_score', includeModelDefinition: 'include_model_definition', decompressDefinition: 'decompress_definition', resetStart: 'reset_start', resetEnd: 'reset_end', ignoreUnavailable: 'ignore_unavailable', allowNoIndices: 'allow_no_indices', ignoreThrottled: 'ignore_throttled', expandWildcards: 'expand_wildcards', deferDefinitionDecompression: 'defer_definition_decompression', deleteInterveningResults: 'delete_intervening_results' }

function MlApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

MlApi.prototype.closeJob = function mlCloseJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_close'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteCalendar = function mlDeleteCalendarApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.calendar_id == null && params.calendarId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: calendar_id or calendarId')
    return handleError(err, callback)
  }

  let { method, body, calendarId, calendar_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteCalendarEvent = function mlDeleteCalendarEventApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.calendar_id == null && params.calendarId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: calendar_id or calendarId')
    return handleError(err, callback)
  }
  if (params.event_id == null && params.eventId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: event_id or eventId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.event_id != null || params.eventId != null) && ((params.calendar_id == null && params.calendarId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: calendar_id')
    return handleError(err, callback)
  }

  let { method, body, calendarId, calendar_id, eventId, event_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId) + '/' + 'events' + '/' + encodeURIComponent(event_id || eventId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteCalendarJob = function mlDeleteCalendarJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.calendar_id == null && params.calendarId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: calendar_id or calendarId')
    return handleError(err, callback)
  }
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.job_id != null || params.jobId != null) && ((params.calendar_id == null && params.calendarId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: calendar_id')
    return handleError(err, callback)
  }

  let { method, body, calendarId, calendar_id, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId) + '/' + 'jobs' + '/' + encodeURIComponent(job_id || jobId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteDataFrameAnalytics = function mlDeleteDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteDatafeed = function mlDeleteDatafeedApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.datafeed_id == null && params.datafeedId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: datafeed_id or datafeedId')
    return handleError(err, callback)
  }

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteExpiredData = function mlDeleteExpiredDataApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((job_id || jobId) != null) {
    if (method == null) method = 'DELETE'
    path = '/' + '_ml' + '/' + '_delete_expired_data' + '/' + encodeURIComponent(job_id || jobId)
  } else {
    if (method == null) method = 'DELETE'
    path = '/' + '_ml' + '/' + '_delete_expired_data'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteFilter = function mlDeleteFilterApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.filter_id == null && params.filterId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: filter_id or filterId')
    return handleError(err, callback)
  }

  let { method, body, filterId, filter_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'filters' + '/' + encodeURIComponent(filter_id || filterId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteForecast = function mlDeleteForecastApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.forecast_id != null || params.forecastId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, forecastId, forecast_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((job_id || jobId) != null && (forecast_id || forecastId) != null) {
    if (method == null) method = 'DELETE'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_forecast' + '/' + encodeURIComponent(forecast_id || forecastId)
  } else {
    if (method == null) method = 'DELETE'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_forecast'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteJob = function mlDeleteJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteModelSnapshot = function mlDeleteModelSnapshotApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.snapshot_id == null && params.snapshotId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot_id or snapshotId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.snapshot_id != null || params.snapshotId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteTrainedModel = function mlDeleteTrainedModelApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.model_id == null && params.modelId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: model_id or modelId')
    return handleError(err, callback)
  }

  let { method, body, modelId, model_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'trained_models' + '/' + encodeURIComponent(model_id || modelId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.deleteTrainedModelAlias = function mlDeleteTrainedModelAliasApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.model_alias == null && params.modelAlias == null) {
    const err = new this[kConfigurationError]('Missing required parameter: model_alias or modelAlias')
    return handleError(err, callback)
  }
  if (params.model_id == null && params.modelId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: model_id or modelId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.model_alias != null || params.modelAlias != null) && ((params.model_id == null && params.modelId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: model_id')
    return handleError(err, callback)
  }

  let { method, body, modelAlias, model_alias, modelId, model_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_ml' + '/' + 'trained_models' + '/' + encodeURIComponent(model_id || modelId) + '/' + 'model_aliases' + '/' + encodeURIComponent(model_alias || modelAlias)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.estimateModelMemory = function mlEstimateModelMemoryApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + '_estimate_model_memory'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.evaluateDataFrame = function mlEvaluateDataFrameApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'data_frame' + '/' + '_evaluate'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.explainDataFrameAnalytics = function mlExplainDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((id) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id) + '/' + '_explain'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + '_explain'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.findFileStructure = function mlFindFileStructureApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'find_file_structure'

  // build request object
  const request = {
    method,
    path,
    bulkBody: body,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.flushJob = function mlFlushJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_flush'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.forecast = function mlForecastApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_forecast'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getBuckets = function mlGetBucketsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  // check required url components
  if (params.timestamp != null && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, timestamp, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((job_id || jobId) != null && (timestamp) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'buckets' + '/' + encodeURIComponent(timestamp)
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'buckets'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getCalendarEvents = function mlGetCalendarEventsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.calendar_id == null && params.calendarId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: calendar_id or calendarId')
    return handleError(err, callback)
  }

  let { method, body, calendarId, calendar_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId) + '/' + 'events'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getCalendars = function mlGetCalendarsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, calendarId, calendar_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((calendar_id || calendarId) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId)
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'calendars'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getCategories = function mlGetCategoriesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.category_id != null || params.categoryId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, categoryId, category_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((job_id || jobId) != null && (category_id || categoryId) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'categories' + '/' + encodeURIComponent(category_id || categoryId)
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'categories'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getDataFrameAnalytics = function mlGetDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((id) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getDataFrameAnalyticsStats = function mlGetDataFrameAnalyticsStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((id) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id) + '/' + '_stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + '_stats'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getDatafeedStats = function mlGetDatafeedStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((datafeed_id || datafeedId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId) + '/' + '_stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'datafeeds' + '/' + '_stats'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getDatafeeds = function mlGetDatafeedsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((datafeed_id || datafeedId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'datafeeds'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getFilters = function mlGetFiltersApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, filterId, filter_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((filter_id || filterId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'filters' + '/' + encodeURIComponent(filter_id || filterId)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'filters'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getInfluencers = function mlGetInfluencersApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = body == null ? 'GET' : 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'influencers'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getJobStats = function mlGetJobStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((job_id || jobId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + '_stats'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getJobs = function mlGetJobsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((job_id || jobId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'anomaly_detectors'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getModelSnapshotUpgradeStats = function mlGetModelSnapshotUpgradeStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.snapshot_id == null && params.snapshotId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot_id or snapshotId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.snapshot_id != null || params.snapshotId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId) + '/' + '_upgrade' + '/' + '_stats'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getModelSnapshots = function mlGetModelSnapshotsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.snapshot_id != null || params.snapshotId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((job_id || jobId) != null && (snapshot_id || snapshotId) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId)
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getOverallBuckets = function mlGetOverallBucketsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = body == null ? 'GET' : 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'overall_buckets'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getRecords = function mlGetRecordsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = body == null ? 'GET' : 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'records'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getTrainedModels = function mlGetTrainedModelsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, modelId, model_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((model_id || modelId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'trained_models' + '/' + encodeURIComponent(model_id || modelId)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'trained_models'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.getTrainedModelsStats = function mlGetTrainedModelsStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, modelId, model_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((model_id || modelId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'trained_models' + '/' + encodeURIComponent(model_id || modelId) + '/' + '_stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ml' + '/' + 'trained_models' + '/' + '_stats'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.info = function mlInfoApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_ml' + '/' + 'info'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.openJob = function mlOpenJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_open'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.postCalendarEvents = function mlPostCalendarEventsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.calendar_id == null && params.calendarId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: calendar_id or calendarId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, calendarId, calendar_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId) + '/' + 'events'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.postData = function mlPostDataApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_data'

  // build request object
  const request = {
    method,
    path,
    bulkBody: body,
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.previewDataFrameAnalytics = function mlPreviewDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((id) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id) + '/' + '_preview'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + '_preview'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.previewDatafeed = function mlPreviewDatafeedApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((datafeed_id || datafeedId) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId) + '/' + '_preview'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_ml' + '/' + 'datafeeds' + '/' + '_preview'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putCalendar = function mlPutCalendarApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.calendar_id == null && params.calendarId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: calendar_id or calendarId')
    return handleError(err, callback)
  }

  let { method, body, calendarId, calendar_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putCalendarJob = function mlPutCalendarJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.calendar_id == null && params.calendarId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: calendar_id or calendarId')
    return handleError(err, callback)
  }
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.job_id != null || params.jobId != null) && ((params.calendar_id == null && params.calendarId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: calendar_id')
    return handleError(err, callback)
  }

  let { method, body, calendarId, calendar_id, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId) + '/' + 'jobs' + '/' + encodeURIComponent(job_id || jobId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putDataFrameAnalytics = function mlPutDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putDatafeed = function mlPutDatafeedApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.datafeed_id == null && params.datafeedId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: datafeed_id or datafeedId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putFilter = function mlPutFilterApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.filter_id == null && params.filterId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: filter_id or filterId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, filterId, filter_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'filters' + '/' + encodeURIComponent(filter_id || filterId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putJob = function mlPutJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putTrainedModel = function mlPutTrainedModelApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.model_id == null && params.modelId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: model_id or modelId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, modelId, model_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'trained_models' + '/' + encodeURIComponent(model_id || modelId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.putTrainedModelAlias = function mlPutTrainedModelAliasApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.model_alias == null && params.modelAlias == null) {
    const err = new this[kConfigurationError]('Missing required parameter: model_alias or modelAlias')
    return handleError(err, callback)
  }
  if (params.model_id == null && params.modelId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: model_id or modelId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.model_alias != null || params.modelAlias != null) && ((params.model_id == null && params.modelId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: model_id')
    return handleError(err, callback)
  }

  let { method, body, modelAlias, model_alias, modelId, model_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_ml' + '/' + 'trained_models' + '/' + encodeURIComponent(model_id || modelId) + '/' + 'model_aliases' + '/' + encodeURIComponent(model_alias || modelAlias)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.resetJob = function mlResetJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_reset'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.revertModelSnapshot = function mlRevertModelSnapshotApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.snapshot_id == null && params.snapshotId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot_id or snapshotId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.snapshot_id != null || params.snapshotId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId) + '/' + '_revert'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.setUpgradeMode = function mlSetUpgradeModeApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'set_upgrade_mode'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.startDataFrameAnalytics = function mlStartDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id) + '/' + '_start'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.startDatafeed = function mlStartDatafeedApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.datafeed_id == null && params.datafeedId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: datafeed_id or datafeedId')
    return handleError(err, callback)
  }

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId) + '/' + '_start'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.stopDataFrameAnalytics = function mlStopDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id) + '/' + '_stop'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.stopDatafeed = function mlStopDatafeedApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.datafeed_id == null && params.datafeedId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: datafeed_id or datafeedId')
    return handleError(err, callback)
  }

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId) + '/' + '_stop'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.updateDataFrameAnalytics = function mlUpdateDataFrameAnalyticsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id) + '/' + '_update'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.updateDatafeed = function mlUpdateDatafeedApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.datafeed_id == null && params.datafeedId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: datafeed_id or datafeedId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, datafeedId, datafeed_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId) + '/' + '_update'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.updateFilter = function mlUpdateFilterApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.filter_id == null && params.filterId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: filter_id or filterId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, filterId, filter_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'filters' + '/' + encodeURIComponent(filter_id || filterId) + '/' + '_update'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.updateJob = function mlUpdateJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_update'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.updateModelSnapshot = function mlUpdateModelSnapshotApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.snapshot_id == null && params.snapshotId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot_id or snapshotId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.snapshot_id != null || params.snapshotId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId) + '/' + '_update'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.upgradeJobSnapshot = function mlUpgradeJobSnapshotApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.job_id == null && params.jobId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: job_id or jobId')
    return handleError(err, callback)
  }
  if (params.snapshot_id == null && params.snapshotId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot_id or snapshotId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.snapshot_id != null || params.snapshotId != null) && ((params.job_id == null && params.jobId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: job_id')
    return handleError(err, callback)
  }

  let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId) + '/' + '_upgrade'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.validate = function mlValidateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + '_validate'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

MlApi.prototype.validateDetector = function mlValidateDetectorApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + '_validate' + '/' + 'detector'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(MlApi.prototype, {
  close_job: { get () { return this.closeJob } },
  delete_calendar: { get () { return this.deleteCalendar } },
  delete_calendar_event: { get () { return this.deleteCalendarEvent } },
  delete_calendar_job: { get () { return this.deleteCalendarJob } },
  delete_data_frame_analytics: { get () { return this.deleteDataFrameAnalytics } },
  delete_datafeed: { get () { return this.deleteDatafeed } },
  delete_expired_data: { get () { return this.deleteExpiredData } },
  delete_filter: { get () { return this.deleteFilter } },
  delete_forecast: { get () { return this.deleteForecast } },
  delete_job: { get () { return this.deleteJob } },
  delete_model_snapshot: { get () { return this.deleteModelSnapshot } },
  delete_trained_model: { get () { return this.deleteTrainedModel } },
  delete_trained_model_alias: { get () { return this.deleteTrainedModelAlias } },
  estimate_model_memory: { get () { return this.estimateModelMemory } },
  evaluate_data_frame: { get () { return this.evaluateDataFrame } },
  explain_data_frame_analytics: { get () { return this.explainDataFrameAnalytics } },
  find_file_structure: { get () { return this.findFileStructure } },
  flush_job: { get () { return this.flushJob } },
  get_buckets: { get () { return this.getBuckets } },
  get_calendar_events: { get () { return this.getCalendarEvents } },
  get_calendars: { get () { return this.getCalendars } },
  get_categories: { get () { return this.getCategories } },
  get_data_frame_analytics: { get () { return this.getDataFrameAnalytics } },
  get_data_frame_analytics_stats: { get () { return this.getDataFrameAnalyticsStats } },
  get_datafeed_stats: { get () { return this.getDatafeedStats } },
  get_datafeeds: { get () { return this.getDatafeeds } },
  get_filters: { get () { return this.getFilters } },
  get_influencers: { get () { return this.getInfluencers } },
  get_job_stats: { get () { return this.getJobStats } },
  get_jobs: { get () { return this.getJobs } },
  get_model_snapshot_upgrade_stats: { get () { return this.getModelSnapshotUpgradeStats } },
  get_model_snapshots: { get () { return this.getModelSnapshots } },
  get_overall_buckets: { get () { return this.getOverallBuckets } },
  get_records: { get () { return this.getRecords } },
  get_trained_models: { get () { return this.getTrainedModels } },
  get_trained_models_stats: { get () { return this.getTrainedModelsStats } },
  open_job: { get () { return this.openJob } },
  post_calendar_events: { get () { return this.postCalendarEvents } },
  post_data: { get () { return this.postData } },
  preview_data_frame_analytics: { get () { return this.previewDataFrameAnalytics } },
  preview_datafeed: { get () { return this.previewDatafeed } },
  put_calendar: { get () { return this.putCalendar } },
  put_calendar_job: { get () { return this.putCalendarJob } },
  put_data_frame_analytics: { get () { return this.putDataFrameAnalytics } },
  put_datafeed: { get () { return this.putDatafeed } },
  put_filter: { get () { return this.putFilter } },
  put_job: { get () { return this.putJob } },
  put_trained_model: { get () { return this.putTrainedModel } },
  put_trained_model_alias: { get () { return this.putTrainedModelAlias } },
  reset_job: { get () { return this.resetJob } },
  revert_model_snapshot: { get () { return this.revertModelSnapshot } },
  set_upgrade_mode: { get () { return this.setUpgradeMode } },
  start_data_frame_analytics: { get () { return this.startDataFrameAnalytics } },
  start_datafeed: { get () { return this.startDatafeed } },
  stop_data_frame_analytics: { get () { return this.stopDataFrameAnalytics } },
  stop_datafeed: { get () { return this.stopDatafeed } },
  update_data_frame_analytics: { get () { return this.updateDataFrameAnalytics } },
  update_datafeed: { get () { return this.updateDatafeed } },
  update_filter: { get () { return this.updateFilter } },
  update_job: { get () { return this.updateJob } },
  update_model_snapshot: { get () { return this.updateModelSnapshot } },
  upgrade_job_snapshot: { get () { return this.upgradeJobSnapshot } },
  validate_detector: { get () { return this.validateDetector } }
})

module.exports = MlApi
