import React from 'react'

export default function Pagination(props: any): JSX.Element {
  const allPageNumbers = [];
  const {totalPokemon, pokemonPerPage, paginate, currPage} = props;
  // console.log(props)

  for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
    allPageNumbers.push(i);
  }

  let pageNumbersInView: any = [];
  let currPageIndex = allPageNumbers.indexOf(currPage);

  if (currPage < 5) {
    pageNumbersInView = allPageNumbers.slice(1, 5);
  }
  else if (currPage >= 5 && currPage <= 29) {
    pageNumbersInView = allPageNumbers.slice(currPageIndex -2, currPage + 2)
  }
  else if (currPage > 29) {
    pageNumbersInView = allPageNumbers.slice(28, 33)
  }


  // console.log(pageNumbersInView);

  const firstPage = allPageNumbers[0];
  const lastPage = allPageNumbers[allPageNumbers.length - 1];

  return (
    <nav className='w-full mx-auto bg-gray-700 shadow-md py-1 fixed bottom-0'>
      <ul className='w-64 mx-auto flex flex-row justify-around items-center text-gray-200'>
        <h1 className='font-mono text-md'>Page: </h1>
        {
          currPage === firstPage ?
          (
            <li>
              <button 
                className='w-6 focus:outline-none bg-gray-200 rounded-full text-gray-700'
                onClick={() => paginate(1)}>
                {firstPage}
              </button>
            </li>
          ) : (
            <li>
              <button 
                className='w-6 focus:outline-none'
                onClick={() => paginate(1)}>
                {firstPage}
              </button>
            </li>
          )
        }
       
        {
          currPage < 5 ? null : <p>...</p>
        }
        {
          pageNumbersInView.map((number: number) => {
            if (number === currPage) {
              return (
                <li key={number}>
                <button 
                  className='w-6 focus:outline-none bg-gray-200 rounded-full text-gray-700'
                  onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
              )
            }
            return (
              <li key={number}>
                <button 
                  className='w-6 focus:outline-none'
                  onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            )
          })
        }
        {
          currPage < 30 ? <p>...</p> : null
        }
        {
          currPage === lastPage ?
          (
            <li>
              <button 
                className='w-6 focus:outline-none bg-gray-200 rounded-full text-gray-700'
                onClick={() => paginate(lastPage)}>
                {lastPage}
              </button>
            </li>
          ) : (
            <li>
              <button 
                className='w-6 focus:outline-none'
                onClick={() => paginate(lastPage)}>
                {lastPage}
              </button>
            </li>
          )
        }
      </ul>
    </nav>
  )
}
