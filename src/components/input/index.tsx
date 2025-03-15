export default function InputComponent(
  {label, type = 'text', placeholder, name}:
  {
    label: string,
    type?: string,
    placeholder: string,
    name: string,
  }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" type={type} placeholder={placeholder} name={name} />
      </div>
      {/* <p className="help is-danger">This {label} is invalid</p> */}
    </div>
  )
}