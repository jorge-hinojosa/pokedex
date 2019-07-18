import React from 'react'
import { Query } from 'react-apollo'
import {GET_SPRITES} from '../Queries'
import { Link } from 'react-router-dom';
// import Favorite from './Favorite';

export default function PokemonEntries(props:any): JSX.Element {
  return (
    <div className='mb-10'>
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
                    className="w-5/6 flex flex-col justify-around items-center mt-3 p-2 mb-2 bg-blue-500 border-2 border-blue-800 rounded shadow-lg text-gray-200 static mx-auto"
                  >
                  <div className="container flex flex-row justify-around items-center">
                    <section className="text-center -mt-2 ml-2">
                      <h1 className="font-bold font-robomono mb-1">
                        #{evolution.id} {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
                      </h1>
                      {/* <Favorite {...props} /> */}
                    </section>
                    <Link to={`./pokemon/${evolution.id}`}>
                      <img
                        src={evolution.sprites.front_default}
                        alt={evolution.name}
                        className="w-20 bg-red-500 border-4 border-gray-200 rounded-full shadow-md hover:cursor-pointer"
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
