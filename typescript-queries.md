Translation of the python client examples to TypeScript:

Import Weaviate Client

```typescript
import weaviate from 'weaviate-ts-client';
```

Instantiate Weaviate Embedded with API Key

```typescript
const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:6666',
  headers: {
    'X-OpenAI-Api-Key': '<THE-KEY>'
  },
  embedded: new weaviate.EmbeddedOptions({
    port: 6666,
  }),
});
```

load csv (using papaparse lodash)

```typescript
import * as fs from 'fs';
import * as Papa from 'papaparse';
import * as _ from 'lodash';

// Read CSV file
const csvFile = 'AB_NYC_2019.csv';
const csvData = fs.readFileSync(csvFile, 'utf8');

// Define the type for rows
type RowType = {
  [key: string]: number | string | null;
};

// Parse CSV data
Papa.parse<RowType>(csvData, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function (results) {
    // Replace 'Infinity', '-Infinity', and 'NaN' values with 'null'
    const sanitizedData: RowType[] = results.data.map((row) => {
      return _.mapValues(row, (value) => {
        if (value === Infinity || value === -Infinity || Number.isNaN(value)) {
          return null;
        }
        return value;
      });
    });

    // Convert data to a list of dictionaries
    const data_list = sanitizedData;
    console.log(data_list);
  },
});
```

Both of these are uglier than need be bc of the str() typecasting for `generate` might be worth fixing first.

Create schema (moved to its own file bc very long)
Upload data

Get Listings

```typescript
client.graphql.get()
              .withClassName("Listing")
              .withFields("price")
              .withLimit(1)
              .do()
```

Add Ad Schema

```typescript
let ad_schema = {
  'class': 'Ad',
  'description': 'An advertisement for AirBnB.',
  'vectorizeClassName': true,
  'properties': [
    {
      'dataType': ['string'],
      'description': 'The advertisement text.',
      'name': 'content'
    }
  ]
}

client.schema.classCreator()
             .withClass(ad_schema)
             .do()
             .then(res => {
               console.log(res)
             })
             .catch(err => {
                console.error(err)
             });
```

Add Cross-Reference: Listing -- (hasAd) --> Ad

```typescript
const hasAd_cref = {
  dataType: ['Ad'].
  name: 'hasAd',
};

client.schema
      .propertyCreator()
      .withClassName('Listing')
      .withProperty(prop)
      .do()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err)
      });
```

Generate a Description

```typescript

```
