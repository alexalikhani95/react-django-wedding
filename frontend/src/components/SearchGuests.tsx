import { Input } from './ui/input'

type Props = {
    value: string;
    onChange: (value: string) => void
}

export const SearchGuests = ({value, onChange}: Props) => {
  return (
      <Input
        placeholder="Search guest..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white"
      />
  )
}