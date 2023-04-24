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

Create schema

```typescript
let listingObj = {
  'class': 'Listing',
  'description': '',
  'vectorizeClassName': false,
  'vectorizer': 'text2vec-openai',
  'properties': [
    {
      'dataType': ['text'],
      'name': 'description',
      'description': 'The description of the apartment listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': false,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'name',
      'description': 'A short description of the listing written by the lister.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'host_name',
      'description': 'The name of the host of the apartment listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'neighbourhood',
      'description': 'The neighbourhood group of the apartment listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'neighbourhood_group',
      'description': 'The neighbourhood group of the apartment listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'latitude',
      'description': 'The latitude of the listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'longitude',
      'description': 'The longitude of the listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'room_type',
      'description': 'The type of room of the listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'price',
      'description': 'The price of the listing',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'minimum_nights',
      'description': 'The minimum of nights to stay at the listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'number_of_reviews',
      'description': 'The number of reviews for this listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'last_review',
      'description': 'The last review date',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'reviews_per_month',
      'description': 'The number of reviews per month.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'calculated_host_listings_count',
      'description': 'The number of listings from this host.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
    {
      'dataType': ['text'],
      'name': 'availability_365',
      'description': 'The availability of the listing out of the year.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-openai': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    },
  ]
}

client.schema
      .classCreator()
      .withClass(listingObj)
      .do()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      });
```

Upload data

```typescript

```

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
