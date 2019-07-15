import React from 'react'
import { Query } from "react-apollo";
import {GET_EVO_CHAIN, GET_SPRITES} from '../Queries';
import Evolution from './Evolution';


export default function EvoChain(props: any): JSX.Element {
  console.log(props.evoChainUrl)
  let evoChainPath = props.evoChainUrl.split('v2')[1];
  console.log(evoChainPath)
  return (
    <div>
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

          let viewEvolutions = [];

          let baseSpecies = [ 
            getNestedObject(chain, ['species', 'name']), 
            getNestedObject(chain, ['species', 'url']) 
          ]

          let firstEvo = [
            getNestedObject(chain, ['evolves_to', 0, 'species', 'name']),
            getNestedObject(chain, ['evolves_to', 0, 'species', 'url'])
          ];

          let secondEvo = [
            getNestedObject(chain, ['evolves_to', 0, 'evolves_to', 0, 'species', 'name']),
            getNestedObject(chain, ['evolves_to', 0, 'evolves_to', 0,'species', 'url'])
          ];

          let branchLevelOne = getNestedObject(chain, ['evolves_to']);

          let branchLevelTwo = getNestedObject(chain, ['evolves_to', 0, 'evolves_to']);

          //Check for Evolution Branches
          if (branchLevelTwo && branchLevelTwo.length > 1) {
            viewEvolutions = branchLevelTwo.map((evo: any, i: number) => {
              return evo;
            })
            if (firstEvo) {
              viewEvolutions.unshift(firstEvo);
              viewEvolutions.unshift(baseSpecies);
            }
          }
          else if (branchLevelOne && branchLevelOne.length > 1) {
            viewEvolutions = branchLevelOne.map((evo: any, i: number) => {
              return evo
            })
            viewEvolutions.unshift(baseSpecies);
          } else if (secondEvo) {
            viewEvolutions.push(baseSpecies, firstEvo, secondEvo)
          } else if (firstEvo) {
            viewEvolutions.push(baseSpecies, firstEvo)
          }
          console.log(viewEvolutions)
          return (
            <div className='antialiased text-gray-700'>
              EVOLUTIONS
            </div>
          )
        }}
      </Query>
    </div>
  )
}
