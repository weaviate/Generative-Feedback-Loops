import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';
import fetch, { Response } from 'node-fetch';
import fs from 'fs';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: {
    'X-Cohere-Api-Key': ''
  }
});

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
      //console.log(res)
  })
  .catch(err => {
      //console.error(err)
  });

const listings = fs.readFileSync('AB_NYC_2019.csv',{
  encoding: 'utf-8'
})
.split('\n')
.map((row: string): string[] => {
  return row.split(',');
})

let counter: number = 0;
let success_counter: number = 0;

for (let i: number = 0; i < 50; i++) {
  for (let j: number = 0; j < 50; j++) {
    if (listings[i][j]){
      listings[i][j] = listings[i][j].replace(/\\/g, '').replace(/"/g, '');
    }
    else {
      listings[i][j] = " ";
    }
  }
  // need to remove \ from all strings

  const data_obj: any = listings[i];
  const obj: {[key: string]: string|number} = {};
  //console.log(data_obj);
  obj["name"] = String(data_obj[1]);
  obj["host_name"] = String(data_obj[3]);
  obj["neighbourhood"] = String(data_obj[6]);
  obj["neighbourhood_group"] = String(data_obj[7]);
  obj["latitude"] = String(data_obj[7]);
  obj["longitude"] = String(data_obj[8]);
  obj["room_type"] = String(data_obj[9]);
  obj["price"] = String(data_obj[10]);

  //console.log(obj);

  client.data.creator()
  .withClassName('Listing')
  .withProperties(obj)
  .do()
  .then(res => {
    //console.log(res);
    success_counter += 1;
  })
  .catch(err => {
    //console.error(err);
  });
}

//let uuid_to_generated_property: {[key: string]: string}; sorry beautiful typescript dictionary, not needed anymore.

const generate_prompt: string = 'Please write a description for the following AirBnB Listing in English. NAME: {name} HOST_NAME {host_name} NEIGHBOURHOOD {neighbourhood} NEIGHBOURHOOD_GROUP {neighbourhood_group} PRICE {price}. Please do not make up any information about the property in your description.';

const properties_str = 'name host_name neighbourhood neighbourhood_group price _additional{ id }';

client.graphql
  .get()
  .withClassName('Listing')
  .withFields(properties_str)  
  .withGenerate({
    singlePrompt: generate_prompt,
  })
  .withLimit(5)
  .do()
  .then(results => {
    //loop through results to add to `generated_descriptions`
    let generated_data = results["data"]["Get"]["Listing"];
    for (let i = 0; i < 5; i++) {
      let uuid = generated_data[i]["_additional"]["id"]; 
      let generated_result = generated_data[i]["_additional"]["generate"]["singleResult"];
      let new_description_property = {
        "description": generated_result
      };
      console.log(new_description_property);
      client.data
        .getterById()
        .withClassName('Listing')
        .withId(uuid)
        .do()
        .then(res => {
          client.data
            .updater()
            .withId(uuid)
            .withClassName('Listing')
            .withProperties(new_description_property)
            .do();
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        });
    }
  })
  .catch(err => {
    console.error(err);
  });
