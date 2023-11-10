import { unslugify } from "../utils";

interface FieldProps {
  label: string;
  value: string;
}
export function FieldDetails({ label, value }: FieldProps) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-400">{unslugify(label)}</span>
      <span className="text-xl">{value}</span>
    </div>
  );
}
