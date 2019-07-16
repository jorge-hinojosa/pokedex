import React from 'react'

export default function Game(props: any): JSX.Element {
  let {version} = props;
  return (
    <div className='mb-1'>
      {
      version === 'Red' ? <h1 className='w-20 shadow bg-red-500 text-gray-200 rounded flex justify-center items-center'>Red</h1> :

      version === 'Blue' ? <h1 className='w-20 shadow bg-blue-500 text-gray-200 rounded flex justify-center items-center'>Blue</h1> : 
      
      version === 'Yellow' ? <h1 className='w-20 shadow bg-yellow-500 text-gray-200 rounded flex justify-center items-center'>Yellow</h1> :

      version === 'Gold' ? <h1 className='w-20 shadow bg-yellow-600 text-gray-200 rounded flex justify-center items-center'>Gold</h1> :

      version === 'Silver' ? <h1 className='w-20 shadow bg-gray-500 text-gray-200 rounded flex justify-center items-center'>Silver</h1> :

      version === 'Crystal' ? <h1 className='w-20 shadow bg-blue-300 text-gray-200 rounded flex justify-center items-center'>Crystal</h1> :

      version === 'Ruby' ? <h1 className='w-20 shadow bg-red-700 text-gray-200 rounded flex justify-center items-center'>Ruby</h1> :

      version === 'Sapphire' ? <h1 className='w-20 shadow bg-blue-600 text-gray-200 rounded flex justify-center items-center'>Sapphire</h1> :

      version === 'Emerald' ? <h1 className='w-20 shadow bg-green-600 text-gray-200 rounded flex justify-center items-center'>Emerald</h1> :

      version === 'Firered' ? <h1 className='w-20 shadow bg-red-600 text-gray-200 rounded flex justify-center items-center'>Firered</h1> :

      version === 'Leafgreen' ? <h1 className='w-20 shadow bg-green-500 text-gray-200 rounded flex justify-center items-center'>Leafgreen</h1> :

      version === 'Diamond' ? <h1 className='w-20 shadow bg-blue-400 text-gray-200 rounded flex justify-center items-center'>Diamond</h1> :

      version === 'Pearl' ? <h1 className='w-20 shadow bg-pink-400 text-gray-200 rounded flex justify-center items-center'>Pearl</h1> :

      version === 'Platinum' ? <h1 className='w-20 shadow bg-purple-500 text-gray-200 rounded flex justify-center items-center'>Platinum</h1> :

      version === 'Heartgold' ? <h1 className='w-20 shadow bg-yellow-700 text-gray-200 rounded flex justify-center items-center'>Heartgold</h1> :

      version === 'Soulsilver' ? <h1 className='w-20 shadow bg-gray-600 text-gray-200 rounded flex justify-center items-center'>Soulsilver</h1> :

      version === 'Black' ? <h1 className='w-20 shadow bg-black text-gray-200 rounded flex justify-center items-center'>Black</h1> :

      version === 'White' ? <h1 className='w-20 shadow bg-white text-gray-700 rounded flex justify-center items-center border border-gray-700'>White</h1> :

      version === 'Black-2' ? <h1 className='w-20 shadow bg-gray-700 text-gray-200 rounded flex justify-center items-center'>Black-2</h1> :

      version === 'White-2' ? <h1 className='w-20 shadow bg-white text-gray-700 rounded flex justify-center items-center border border-dashed border-gray-700'>White-2</h1> :

      null
      }
    </div>
  )
}
