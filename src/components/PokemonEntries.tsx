import React from 'react'
import { Query } from 'react-apollo'
import {GET_SPRITES} from '../Queries'
import { Link } from 'react-router-dom';
// import Favorite from './Favorite';

export default function PokemonEntries(props:any): JSX.Element {
  return (
    <div className='mb-10 w-3/4 mx-auto laptop:flex laptop:flex-row laptop:flex-wrap laptop:justify-around'>
      {
        props.pokemon.map((pokemon: any, i: number) => {
          const pokemonID = pokemon.url.split('s/')[1];
          // console.log(pokemonID)
          // return <p>hello</p>
          return (
            <Query 
              query={GET_SPRITES}
              fetchPolicy={"no-cache"}
              variables={{
                path: `/pokemon/${pokemonID}`
              }}
              key={i}
            >
              {({loading, error, data}: {[key:string]:any}) => {
                if (loading) return loading;
                if (error) return error;
                if (!data) return error;
                // console.log(data)
                const {evolution} = data;
                // console.log(evolution)
                return (
                  <article
                    className="w-40 h-48 mt-3 p-2 mb-2 bg-blue-500 border-2 border-blue-800 rounded shadow-lg text-gray-200 flex flex-col justify-center items-center static m-auto"
                  >
                  <div className="container flex flex-col justify-around items-center">
                      <h1 className="font-bold font-robomono mb-3 text-center">
                        #{evolution.id} {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
                      </h1>
                      {/* <Favorite {...props} /> */}
                    <Link to={`./pokemon/${evolution.id}`}>
                      <img
                        src={evolution.sprites.front_default}
                        alt={evolution.name}
                        className="w-24 bg-red-500 border-4 border-gray-200 rounded-full shadow-md hover:cursor-pointer"
                      />
                    </Link>
                  </div>
                  </article>
                )
              }}
            </Query>
          )
        })       
      }
    </div>
  )
}
