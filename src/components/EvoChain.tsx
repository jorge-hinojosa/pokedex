import React from 'react'
import { Query } from "react-apollo";
import {GET_EVO_CHAIN} from '../Queries';
import Evolution from './Evolution';
import { IEvolution } from '../Interfaces';


export default function EvoChain(props: any): JSX.Element {
  console.log(props.evoChainUrl)
  let evoChainPath = props.evoChainUrl.split('v2')[1];
  console.log(evoChainPath)
  return (
    <div className='w-full'>
      <Query 
        query={GET_EVO_CHAIN}
        fetchPolicy={"network-only"}
        variables={{
          path: evoChainPath
        }}
      
      >
        {({loading, error, data}: {[key:string]: any}) => {
          if (loading) return <p>Loading...</p>
          if (error)  return <p>Error: {error.message}</p>
          if (!data) return <p className="text-gray-700">Error: {error.message}</p>
          const {chain} = data.evolution_chain;
          console.log(chain);

          const getNestedObject = (nestedObj: any, pathArr: any) => {
            return pathArr.reduce((obj: any, key: any) =>
                (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
          }

          let evolutions = [];

          let baseSpecies: IEvolution = {
            name: getNestedObject(chain, ['species', 'name']), 
            url: getNestedObject(chain, ['species', 'url']) 
          }

          let firstEvo: IEvolution = {
            name: getNestedObject(chain, ['evolves_to', 0, 'species', 'name']),
            url: getNestedObject(chain, ['evolves_to', 0, 'species', 'url'])
          };

          let secondEvo: IEvolution = {
            name: getNestedObject(chain, ['evolves_to', 0, 'evolves_to', 0, 'species', 'name']),
            url: getNestedObject(chain, ['evolves_to', 0, 'evolves_to', 0,'species', 'url'])
          };

          let branchLevelOne = getNestedObject(chain, ['evolves_to']);

          let branchLevelTwo = getNestedObject(chain, ['evolves_to', 0, 'evolves_to']);

          //Check for Evolution Branches and Push Evolution Objects into 'evolutions' array
          if (branchLevelTwo && branchLevelTwo.length > 1) {
            evolutions = branchLevelTwo.map((evo: any, i: number) => {
              return evo.species;
            })
            if (firstEvo && firstEvo.name !== undefined && firstEvo.url !== undefined) {
              evolutions.unshift(firstEvo);
              evolutions.unshift(baseSpecies);
            }
          }
          else if (branchLevelOne && branchLevelOne.length > 1) {
            evolutions = branchLevelOne.map((evo: any, i: number) => {
              return evo.species
            })
            evolutions.unshift(baseSpecies);
          } else if (secondEvo && secondEvo.name !== undefined && secondEvo.url !== undefined) {
            console.log('hit')
            evolutions.push(baseSpecies, firstEvo, secondEvo)
          } else if (firstEvo && firstEvo.name !== undefined && firstEvo.url !== undefined) {
            evolutions.push(baseSpecies, firstEvo)
          }
          console.log(evolutions)

        

          let viewEvolutions = evolutions.map((evo: any, i: number) => {
            return <Evolution key={i} name={evo.name} url={evo.url}/>
          })
          return (
            <div className='antialiased text-gray-700 flex flex-row flex-wrap justify-around items-center'>
              {viewEvolutions.length > 0? viewEvolutions : <p>Looks like this Pokémon has no evolutions!</p>}
            </div>
          )
        }}
      </Query>
    </div>
  )
}
