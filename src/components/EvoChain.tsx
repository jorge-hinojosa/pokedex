import React from 'react'
import { Query } from "react-apollo";
import {GET_EVO_CHAIN} from '../Queries';


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
          return (
            <div>
              <p>Base Species: {chain.species.name}</p>
              <p>First Evolution: {chain.evolves_to[0].species.name}</p>
              <p>Second Evolution: {chain.evolves_to[0].evolves_to[0].species.name}</p>
            </div>
          )
        }}
      </Query>
    </div>
  )
}
