import * as contentful from 'contentful';

let client = contentful.createClient({
    accessToken :'kbyubKNdDL3-WwTH-0AJB0A_MgWKHSbLsWg2k9GwW0c',
    space : 'kwe1w6au29t3'
})

export const getSinglePost = slug =>
  client.getEntries({
      
      'fields.slug': slug,
        content_type: 'blog'
    })
    .then(response => response.items)
    .catch(console.error)

// You can use hook to mutate the client, for example if you need to fetch the API key from a database
export const useClient = () => [client, (newClient) => client = newClient]