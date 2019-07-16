import React from 'react'
import {Query} from 'react-apollo'
import {GET_SPRITES} from '../Queries'
import {Link} from 'react-router-dom'
import { IEvolution } from '../Interfaces';

export default function Evolution(props: IEvolution): JSX.Element {
  let pokemonName: string = props.name.charAt(0).toUpperCase() + props.name.slice(1)
  let pokemonUrl: string = props.url.split('v2')[1].split('-species').join('');
  
  return (
    <div>
      <Query 
        query={GET_SPRITES} 
        fetchPolicy={"no-cache"}
        variables={{
          path: pokemonUrl
        }}
      >
        {({loading, error, data}: {[key: string]: any}) => {
          if (loading) return <p>Loading...</p>
          if (error)  return <p>Error: {error.message}</p>
          if (!data) return <p className="text-gray-700">Error: {error.message}</p>
          const {evolution} = data
          
          return (
            <Link to={`/pokemon/${props.name}`}>
              <div className='flex flex-col justify-center items-center'>
                <img 
                  className="w-24 h-24 bg-red-500 border-4 border-gray-200 rounded-full shadow-md"
                  src={evolution.sprites.front_default} 
                  alt={pokemonName} 
                />
                <h1>{pokemonName}</h1>
              </div>
            </Link>
          )
        }}
      </Query>
    </div>
  )
}
