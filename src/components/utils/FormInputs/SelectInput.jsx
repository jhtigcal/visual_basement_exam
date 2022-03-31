import { convertPascalToSentence } from '../../../helpers';

function SelectInput({ field, fieldIndex, onChange }) {
  const { fieldName, value, options } = field;

  function handleFieldDataChange(e) {
    let { value } = e.target;
    let localField = field;
    localField.value = value;

    onChange(localField, fieldIndex);
  }

  return (
    <div className="form-group mb-2">
      <label to={fieldName} className="form-label">
        {convertPascalToSentence(fieldName)}
      </label>
      <select
        id={fieldName}
        value={value}
        onChange={handleFieldDataChange}
        className="form-control"
      >
        {options &&
          options.length &&
          options.map((o, i) => (
            <option key={`select-${fieldName}-${i}`} value={o}>
              {o.charAt(0).toUpperCase() + o.slice(1)}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectInput;
