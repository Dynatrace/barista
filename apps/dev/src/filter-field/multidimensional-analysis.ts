/**
 * @license
 * Copyright 2019 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const MULTIDIMENSIONAL_ANALYSIS = {
  autocomplete: [
    {
      name: 'Topology',
      options: [
        {
          id: 'ENTITY_TAG',
          name: 'Tag',
          async: true,
          type: 0,
          group: 'Topology',
          suggestions: [],
          distinct: true,
        },
        {
          id: 'CALL_METHOD_ID',
          name: 'Request',
          type: 0,
          group: 'Topology',
          suggestions: [],
          distinct: true,
        },
        {
          unique: true,
          id: 'SERVICE_NAME',
          name: 'Service name',
          distinct: true,
          type: 0,
          group: 'Topology',
          suggestions: [],
        },
      ],
    },
    {
      name: 'Request Property',
      options: [
        {
          unique: true,
          id: 'DATABASE_VENDOR',
          name: 'Database vendor',
          distinct: true,
          type: 0,
          group: 'Request Property',
          suggestions: [
            { data: 'Adabas', name: 'Adabas' },
            { data: 'Amazon Redshift', name: 'Amazon Redshift' },
            { data: 'ApacheHive', name: 'ApacheHive' },
            { data: 'Cache', name: 'Cache' },
            { data: 'Cloudscape', name: 'Cloudscape' },
            { data: 'ColdFusion IMQ', name: 'ColdFusion IMQ' },
            { data: 'DB2', name: 'DB2' },
            { data: 'Derby Client', name: 'Derby Client' },
            { data: 'Derby Embedded', name: 'Derby Embedded' },
            { data: 'EnterpriseDB', name: 'EnterpriseDB' },
            { data: 'Filemaker', name: 'Filemaker' },
            { data: 'Firebird', name: 'Firebird' },
            { data: 'FirstSQL', name: 'FirstSQL' },
            { data: 'H2', name: 'H2' },
            { data: 'HSQLDB', name: 'HSQLDB' },
            { data: 'Informix', name: 'Informix' },
            { data: 'Ingres', name: 'Ingres' },
            { data: 'InstantDb', name: 'InstantDb' },
            { data: 'Interbase', name: 'Interbase' },
            { data: 'MariaDB', name: 'MariaDB' },
            { data: 'MaxDB', name: 'MaxDB' },
            { data: 'MongoDB', name: 'MongoDB' },
            { data: 'MySQL', name: 'MySQL' },
            { data: 'Netezza', name: 'Netezza' },
            { data: 'Oracle', name: 'Oracle' },
            { data: 'Pervasive', name: 'Pervasive' },
            { data: 'Pointbase', name: 'Pointbase' },
            { data: 'PostgreSQL', name: 'PostgreSQL' },
            { data: 'Progress', name: 'Progress' },
            { data: 'SQL Server', name: 'SQL Server' },
            { data: 'sqlite', name: 'sqlite' },
            { data: 'Sybase', name: 'Sybase' },
            { data: 'Teradata', name: 'Teradata' },
            { data: 'Vertica', name: 'Vertica' },
          ],
        },
        {
          id: 'CALL_TAG',
          unique: false,
          name: 'Request attribute',
          distinct: false,
          currentFilter: {
            valueOnly: false,
            multipleAllowed: true,
            value: [
              '0ecbabe1-5211-4e80-8562-2196dc6034b6',
              '',
              '1',
              '3',
              '1',
              '1',
              '2500',
            ],
          },
          type: 2,
          group: 'Request Property',
          autocomplete: [
            {
              options: [
                {
                  id: 'CALL_TAG',
                  type: 2,
                  unique: true,
                  distinct: true,
                  group: 'Request Property',
                  name: 'ContentLength',
                  data: '0ecbabe1-5211-4e80-8562-2196dc6034b6',
                  range: {
                    operators: {
                      range: true,
                      equal: true,
                      lessThanEqual: true,
                      greaterThanEqual: true,
                    },
                  },
                },
                {
                  id: 'CALL_TAG',
                  type: 2,
                  unique: true,
                  distinct: true,
                  group: 'Request Property',
                  name: 'User-Agent',
                  data: 'e817db8e-a468-4a6d-9f17-bdab7a005aa4',
                  suggestions: [{ name: 'All' }],
                },
              ],
              data: 'Request attribute',
              name: 'Request attribute',
            },
          ],
        },
        {
          unique: true,
          id: 'DATABASE_STATEMENT',
          name: 'Database statement',
          type: 0,
          group: 'Request Property',
          suggestions: [],
          distinct: true,
        },
        {
          unique: true,
          id: 'TRACE_ID',
          name: 'W3C trace ID',
          distinct: true,
          type: 0,
          group: 'Request Property',
          suggestions: [],
          validators: [
            {
              error:
                'Invalid W3C trace ID. Expected 32 character hexadecimal sequence.',
            },
          ],
        },
        {
          unique: true,
          id: 'SERVICE_URL',
          name: 'Web request URL',
          distinct: true,
          type: 0,
          group: 'Request Property',
          suggestions: [],
        },
        {
          unique: true,
          id: 'CALL_SERVICE_TYPE',
          name: 'Service type',
          distinct: true,
          type: 1,
          group: 'Request Property',
          autocomplete: [
            { name: 'Database', data: '0' },
            { name: 'Custom service', data: '4' },
            { name: 'Messaging service', data: '3' },
            { name: 'Background activity', data: '5' },
            { name: 'Web request service', data: '1' },
            { name: 'Web service', data: '2' },
            { name: 'RMI service', data: '8' },
            { name: 'Key value store', data: '7' },
            { name: 'Queue listener service', data: '6' },
            { name: 'RPC service', data: '9' },
            { name: 'CICS service', data: '10' },
            { name: 'IMS service', data: '11' },
            { name: 'IBM Integration Bus service', data: '12' },
          ],
        },
        {
          id: 'RESPONSE_CODE',
          name: 'HTTP response code',
          type: 0,
          distinct: true,
          unique: true,
          validators: [{ error: 'Invalid response code format' }],
          group: 'Request Property',
          suggestions: [
            { name: 'No response', data: '-1' },
            { name: '4xx', data: '400-499' },
            { name: '5xx', data: '500-599' },
          ],
        },
        {
          unique: true,
          id: 'DATABASE_TABLE',
          name: 'Database table',
          type: 0,
          group: 'Request Property',
          suggestions: [],
          distinct: true,
        },
        {
          unique: true,
          id: 'HTTP_METHOD',
          name: 'HTTP method',
          distinct: true,
          type: 1,
          group: 'Request Property',
          autocomplete: [
            { name: 'POST', data: '2' },
            { name: 'GET', data: '0' },
            { name: 'PUT', data: '3' },
            { name: 'DELETE', data: '4' },
            { name: 'OPTIONS', data: '6' },
            { name: 'PATCH', data: '8' },
            { name: 'CONNECT', data: '7' },
            { name: 'TRACE', data: '5' },
            { name: 'HEAD', data: '1' },
          ],
        },
        {
          unique: true,
          id: 'DATABASE_NAME',
          name: 'Database name',
          distinct: true,
          type: 0,
          group: 'Request Property',
          suggestions: [],
        },
        {
          unique: true,
          id: 'PROXY',
          name: 'Proxied by',
          distinct: true,
          type: 0,
          group: 'Request Property',
          suggestions: [],
        },
      ],
    },
    {
      name: 'Failure state',
      options: [
        {
          unique: true,
          id: 'FAILED_STATE',
          name: 'Failed state',
          distinct: true,
          type: 1,
          group: 'Failure state',
          autocomplete: [
            { name: 'only failed', data: '0' },
            { name: 'only successful', data: '1' },
          ],
        },
        {
          unique: true,
          id: 'EXCEPTION',
          name: 'Exception',
          type: 0,
          distinct: true,
          group: 'Failure state',
          suggestions: [
            { name: 'Any exception', data: '0' },
            { name: 'No exception', data: '1' },
          ],
        },
      ],
    },
    {
      name: 'Timing',
      options: [
        {
          unique: true,
          id: 'DISK_IO_TIME',
          name: 'Disk I/O time',
          distinct: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          unique: true,
          id: 'SUSPENSION_TIME',
          name: 'Suspension time',
          distinct: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          id: 'TIME_SPENT_IN_NON_DB_CALLS',
          name: 'Time spent in calls to services',
          distinct: true,
          unique: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          id: 'TIME_SPENT_IN_DB_CALLS',
          name: 'Time spent in database calls',
          distinct: true,
          unique: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          unique: true,
          id: 'WAIT_TIME',
          name: 'Wait time',
          distinct: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          unique: true,
          id: 'SYNC_TIME',
          name: 'Lock time',
          distinct: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          unique: true,
          id: 'CPU_TIME',
          name: 'CPU time',
          distinct: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          unique: true,
          id: 'RESPONSE_TIME',
          name: 'Response time',
          distinct: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          id: 'PROCESSING_TIME',
          name: 'Processing time',
          distinct: true,
          unique: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
        {
          unique: true,
          id: 'NETWORK_IO_TIME',
          name: 'Network I/O time',
          distinct: true,
          type: 4,
          group: 'Timing',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: 'ms',
          },
        },
      ],
    },
    {
      name: 'Other',
      options: [
        {
          id: 'NUMBER_OF_DB_CALLS',
          name: 'Number of calls to databases',
          distinct: true,
          unique: true,
          type: 4,
          group: 'Other',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: '',
          },
        },
        {
          id: 'NUMBER_OF_NON_DB_CALLS',
          name: 'Number of calls to services',
          distinct: true,
          unique: true,
          type: 4,
          group: 'Other',
          range: {
            operators: {
              range: true,
              equal: false,
              lessThanEqual: true,
              greaterThanEqual: true,
            },
            unit: '',
          },
        },
        {
          unique: true,
          id: 'FLAWS',
          name: 'PurePath diagnostic messages',
          distinct: true,
          type: 1,
          group: 'Other',
          autocomplete: [
            { name: 'in request data', data: '1' },
            { name: 'none in request data', data: '0' },
          ],
        },
      ],
    },
  ],
  distinct: true,
};
