import React from 'react'
import { Store } from '../Store'
import { Query } from 'react-apollo'
import {GET_SPRITES} from '../Queries'

export default function ViewAll(): JSX.Element {
  const {state} = React.useContext(Store);
  const {allPokemon} = state;

  console.log(allPokemon)

  console.log(state)
  return (
    <div className='mt-10 font-robo'>
      {
        allPokemon.map((pokemon: any, i: number) => {
          const pokemonID = pokemon.url.split('s/')[1]
          console.log(pokemonID)

          return <Query 
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
                    console.log(data)
                    const {evolution} = data;
                    console.log(evolution)
                    return (
                      <div>
                        <img src={evolution.sprites.front_default} alt={evolution.name}/>
                        <h1>#{evolution.id} {evolution.name}</h1>
                      </div>
                    )
                  }}
                  </Query>
        })
      }
      
    </div>
  )
}
