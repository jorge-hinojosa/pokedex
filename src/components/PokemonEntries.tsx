import React from 'react'
import { Query } from 'react-apollo'
import {GET_SPRITES} from '../Queries'
import { Link } from 'react-router-dom';

export default function PokemonEntries(props:any): JSX.Element {
  console.log(props)
  return (
    <React.Fragment>
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
                  <Link to={`/pokemon/${evolution.id}`}>
                    <div className='m-auto flex flex-col justify-center items-center'>
                      <img src={evolution.sprites.front_default} alt={evolution.name}/>
                      <h1>#{evolution.id} {evolution.name}</h1>
                    </div>            
                  </Link>
                )
              }}
            </Query>
          )
        })       
      }
    </React.Fragment>
  )
}
