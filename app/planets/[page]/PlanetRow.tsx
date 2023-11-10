import { FieldDetails } from '@/app/components/FieldDetails'
import { Planet } from '@/app/types'

const renderableFields = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
]

export function PlanetRow({ planet }: { planet: Planet }) {
  const fields = Object.entries(planet)

  return (
    <div className='md:grid grid-cols-2 gap-2 py-8'>
      {fields.map(([key, value]) => {
        if (!value.toString()) return null
        if (!renderableFields.includes(key)) return null
        return <FieldDetails key={key} label={key} value={value} />
      })}
    </div>
  )
}
