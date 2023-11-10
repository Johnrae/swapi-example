"use client";

import { FieldDetails } from "@/app/components/FieldDetails";
import { Loader } from "@/app/components/Loader";
import { PlanetRow } from "@/app/planets/[page]/PlanetRow";
import { Person, Planet } from "@/app/types";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

const renderableFields = [
  "name",
  "height",
  "mass",
  "hair_color",
  "skin_color",
  "eye_color",
  "birth_year",
  "gender",
];

async function getPlanet(id: number) {
  const res = await fetch(`https://swapi.dev/api/planets/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  let data: Planet = await res.json();
  const peopleToFetch = data.residents;

  const people = await Promise.all(
    peopleToFetch.map(async (person) => {
      const res = await fetch(person);
      return res.json();
    })
  );

  return { ...data, residents: people };
}

function Residents({ data }: { data: Person[] }) {
  return (
    <div>
      <h2 className="w-full border-b text-xl py-4">Residents</h2>
      <div className="divide-y py-4">
        {data.map((person) => {
          const fields = Object.entries(person);
          return (
            <div key={person.name} className="md:grid grid-cols-2 gap-4">
              {fields.map(([key, value]) => {
                if (!value.toString()) return null;
                if (!renderableFields.includes(key)) return null;
                return <FieldDetails key={key} label={key} value={value} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PlanetPage() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery(["planet", id], () =>
    getPlanet(Number(id))
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="flex min-h-screen flex-col p-24">
      <div className="w-prose">
        <h1 className="text-2xl">Planet: {data.name}</h1>

        <PlanetRow planet={data} />
        <Residents data={data.residents as Person[]} />
      </div>
    </div>
  );
}
