import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';
import fetch, { Response } from 'node-fetch';
import fs from 'fs';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: {
    'X-Cohere-Api-Key': 'cJuzSJQDgzm5vJXoxo77c8DTNPT9CmPdFiYq4EoY'
  }
});

/*

console.log("HERE");

let listingObj = {
  'class': 'Listing',
  'description': '',
  'vectorizeClassName': false,
  'vectorizer': 'text2vec-transformers',
  'properties': [
    {
      'dataType': ['text'],
      'name': 'description',
      'description': 'The description of the apartment listing.',
      'vectorizePropertyName': false,
      'moduleConfig': {
        'text2vec-transformers': {
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
        'text2vec-transformers': {
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
        'text2vec-transformers': {
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
        'text2vec-transformers': {
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
        'text2vec-transformers': {
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
        'text2vec-transformers': {
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
        'text2vec-transformers': {
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
        'text2vec-transformers': {
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
        'text2vec-transformers': {
          'skip': true,
          'vectorizePropertyName': false
        }
      }
    }
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

console.log("LANDED");

*/

const listings = fs.readFileSync('AB_NYC_2019.csv',{
  encoding: 'utf-8'
})
.split('\n')
.map((row: string): string[] => {
  return row.split(',');
})

let counter: number = 0;
let success_counter: number = 0;

for (let data_obj of listings) {
  const obj: {[key: string]: string|number} = {};
  obj["name"] = String(data_obj[1]);
  obj["host_name"] = String(data_obj[3]);
  obj["neighbourhood"] = String(data_obj[6]);
  obj["neighbourhood_group"] = String(data_obj[7]);
  obj["latitude"] = String(data_obj[7]);
  obj["longitude"] = String(data_obj[8]);
  obj["room_type"] = String(data_obj[9]);
  obj["price"] = String(data_obj[10]);

  console.log(obj);

  client.data.creator()
  .withClassName('Listing')
  .withProperties(obj)
  .do()
  .then(res => {
    console.log(res);
    success_counter += 1;
  })
  .catch(err => {
    console.error(err);
  });

}

console.log("SUCCESS COUNTER!!!");
console.log(success_counter);
