'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'
import { PlanetRow } from './PlanetRow'
import { Planet, SwapiPlanetResponse } from '@/app/types'
import { Loader } from '@/app/components/Loader'
import { getPlanetIdFromUrl } from '@/app/utils'

async function getPlanets(page: number = 1): Promise<SwapiPlanetResponse> {
  const res = await fetch(`https://swapi.dev/api/planets?page=${page}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function Home() {
  const { page } = useParams()
  const currentPage = page ? Number(page) : 1
  const { data, isLoading, isError } = useQuery(['planets', currentPage], () =>
    getPlanets(Number(currentPage))
  )

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (!data) return <div>No data</div>
  const { results: planets } = data

  return (
    <main className='flex min-h-screen flex-col p-24'>
      <h1 className='text-2xl'>Planets</h1>
      <span>Page {currentPage}</span>
      <div className='w-prose divide-y flex flex-col'>
        {planets &&
          planets.map((planet: Planet) => (
            <Link
              href={`/planet/${getPlanetIdFromUrl(planet.url)}`}
              key={planet.name}
            >
              <PlanetRow key={planet.name} planet={planet} />
            </Link>
          ))}
      </div>
      <div className='flex flex-row justify-between'>
        <div>
          {data.previous && (
            <Link href={`/planets/${currentPage - 1}`}>
              {'< '}Previous Page
            </Link>
          )}
        </div>
        <div>
          {data.next && (
            <Link href={`/planets/${currentPage + 1}`}>Next Page {' >'}</Link>
          )}
        </div>
      </div>
    </main>
  )
}
