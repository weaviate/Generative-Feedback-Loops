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

const csvFile = 'AB_NYC_2019.csv';
const csvData = fs.readFileSync(csvFile, 'utf8');

type RowType = {
  [key: string]: number | string | null;
};

Papa.parse<RowType>(csvData, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function (results) {
    const sanitizedData: RowType[] = results.data.map((row) => {
      return _.mapValues(row, (value) => {
        if (value === Infinity || value === -Infinity || Number.isNaN(value)) {
          return null;
        }
        return value;
      });
    });

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
import { v4 as uuidv4 } from 'uuid';

client.batch.objectsBatcher()
  .configure({
    batchSize: 16,
    dynamic: true,
    timeoutRetries: 3,
    callback: null,
  });

const limit = 100;

for (const data_obj of data_list.slice(0, limit)) {
  const data_properties: Record<string, string | number | null> = {
    name: data_obj['name'],
    host_name: data_obj['host_name'],
    neighbourhood: data_obj['neighbourhood'],
    neighbourhood_group: data_obj['neighbourhood_group'],
    latitude: String(data_obj['latitude']),
    latitude_number: data_obj['latitude'],
    longitude: String(data_obj['longitude']),
    longitude_number: data_obj['longitude'],
    room_type: data_obj['room_type'],
    price: String(data_obj['price']),
    price_number: data_obj['price'],
    minimum_nights: String(data_obj['minimum_nights']),
    minimum_nights_int: data_obj['minimum_nights'],
    number_of_reviews: String(data_obj['number_of_reviews']),
    number_of_reviews_int: data_obj['number_of_reviews'],
    last_review: String(data_obj['last_review']),
    last_review_date: data_obj['last_review'],
    reviews_per_month: String(data_obj['reviews_per_month']),
    reviews_per_month_number: data_obj['reviews_per_month'],
    calculated_host_listings_count: String(data_obj['calculated_host_listings_count']),
    calculated_host_listings_count_int: data_obj['calculated_host_listings_count'],
    availability_365: String(data_obj['availability_365']),
    availability_365_int: data_obj['availability_365'],
    org_id: data_obj['id'],
  };

  const id = uuidv4();

  client.batch
    .objectsBatcher()
    .withObject(
      client.data
        .creator()
        .withClassName('Listing')
        .withId(id)
        .withProperties(data_properties)
        .payload(),
    )
    .withConsistencyLevel(weaviate.replication.ConsistencyLevel.ALL)
    .do()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
}
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
const generatePrompt = `
Please write a description for the following AirBnb Listing in english:
Name: {name}
Neighbourhood: {neighbourhood}
Neighbhourhood Group: {neighbourhood_group}
Latitude: {latitude}
Longitude: {longitude}
Room Type: {room_type}
Price: {price}
Minimum Nights: {minimum_nights}
Number of Reviews: {number_of_reviews}
Last Review: {last_review}
Reviews per Month: {reviews_per_month}
Calculated Host Listings Count: {calculated_host_listings_count}
Availability_365: {availability_365}

Please do not make up any information about the property in your description.`;

const properties_str = 'name neighbourhood neighbourhood_group latitude longitude room_type price minimum_nights number_of_reviews last_review reviews_per_month calculated_host_listings_count availability_365';

client.graphql
  .get()
  .withClassName('Listing')
  .withFields(properties_str)
  
  // add withAdditional here
  
  .withGenerate({
    singlePrompt: generatePrompt,
  })
  .withLimit(5)
  .do()
  .then(results => {
    console.log(results)
  })
  .catch(err => {
    console.error(err)
  });
  
// to do loop through results saving them as the description property linked with the uuid
```
