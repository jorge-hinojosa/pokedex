import React from 'react'

export default function Type(props: any): JSX.Element {
  let {type} = props;
  return (
    <div>
      {
      type === 'Normal' ? <h1 className='w-16 text-sm mr-1 shadow bg-gray-300 text-gray-700 rounded flex justify-center items-center'>Normal</h1> :

      type === 'Fighting' ? <h1 className='w-16 text-sm mr-1 shadow bg-red-700 text-gray-200 rounded flex justify-center items-center'>Fighting</h1> : 
      
      type === 'Flying' ? <h1 className='w-16 text-sm mr-1 shadow bg-purple-300 text-gray-700 rounded flex justify-center items-center'>Flying</h1> :

      type === 'Poison' ? <h1 className='w-16 text-sm mr-1 shadow bg-purple-500 text-gray-200 rounded flex justify-center items-center'>Poison</h1> :

      type === 'Ground' ? <h1 className='w-16 text-sm mr-1 shadow bg-yellow-800 text-gray-200 rounded flex justify-center items-center'>Ground</h1> :

      type === 'Rock' ? <h1 className='w-16 text-sm mr-1 shadow bg-gray-500 text-gray-200 rounded flex justify-center items-center'>Rock</h1> :

      type === 'Bug' ? <h1 className='w-16 text-sm mr-1 shadow bg-green-300 text-gray-700 rounded flex justify-center items-center'>Bug</h1> :

      type === 'Ghost' ? <h1 className='w-16 text-sm mr-1 shadow bg-purple-700 text-gray-200 rounded flex justify-center items-center'>Ghost</h1> :

      type === 'Steel' ? <h1 className='w-16 text-sm mr-1 shadow bg-gray-400 text-gray-700 rounded flex justify-center items-center'>Steel</h1> :

      type === 'Fire' ? <h1 className='w-16 text-sm mr-1 shadow bg-red-500 text-gray-200 rounded flex justify-center items-center'>Fire</h1> :

      type === 'Water' ? <h1 className='w-16 text-sm mr-1 shadow bg-blue-500 text-gray-200 rounded flex justify-center items-center'>Water</h1> :

      type === 'Grass' ? <h1 className='w-16 text-sm mr-1 shadow bg-green-400 text-gray-700 rounded flex justify-center items-center'>Grass</h1> :

      type === 'Electric' ? <h1 className='w-16 text-sm mr-1 shadow bg-yellow-500 text-gray-700 rounded flex justify-center items-center'>Electric</h1> :

      type === 'Psychic' ? <h1 className='w-16 text-sm mr-1 shadow bg-pink-500 text-gray-200 rounded flex justify-center items-center'>Psychic</h1> :

      type === 'Ice' ? <h1 className='w-16 text-sm mr-1 shadow bg-blue-200 text-gray-700 rounded flex justify-center items-center'>Ice</h1> :

      type === 'Dragon' ? <h1 className='w-16 text-sm mr-1 shadow bg-blue-800 text-gray-200 rounded flex justify-center items-center'>Dragon</h1> :

      type === 'Dark' ? <h1 className='w-16 text-sm mr-1 shadow bg-gray-800 text-gray-200 rounded flex justify-center items-center'>Dark</h1> :

      type === 'Fairy' ? <h1 className='w-16 text-sm mr-1 shadow bg-pink-300 text-gray-700 rounded flex justify-center items-center'>Fairy</h1> :

      type === 'Unknown' ? <h1 className='w-16 text-sm mr-1 shadow bg-black text-gray-200 rounded flex justify-center items-center'>Unknown</h1> :

      type === 'Shadow' ? <h1 className='w-16 text-sm mr-1 shadow bg-gray-800 text-gray-200 rounded flex justify-center items-center'>Shadow</h1> :

      null
      }
    </div>
  )
}
