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
    pageNumbersInView = allPageNumbers.slice(28, 32)
  }


  // console.log(pageNumbersInView);

  const firstPage = allPageNumbers[0];
  const lastPage = allPageNumbers[allPageNumbers.length - 1];

  return (
    <nav className='w-56 border border-black mt-15 mx-auto'>
      <ul className='flex flex-row justify-around items-center'>
        {/* {
          allPageNumbers.map((number: number) => {
            return (
              <li key={number}>
                <button onClick={() => paginate(number)}>{number}</button>
              </li>
            )
          })
        } */}
        <li>
          <button onClick={() => paginate(1)}>{firstPage}</button>
        </li>

        {
          pageNumbersInView.map((number: number) => {
            return (
              <li key={number}>
                <button onClick={() => paginate(number)}>{number}</button>
              </li>
            )
          })
        }

        <li>
          <button onClick={() => paginate(lastPage)}>{lastPage}</button>
        </li>
      </ul>
    </nav>
  )
}
