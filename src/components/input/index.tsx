export default function InputComponent(
  {label, type = 'text', placeholder, value, onChange}:
  {
    label: string,
    type?: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} />
      </div>
      <p className="help is-danger">This {label} is invalid</p>
    </div>
  )
}