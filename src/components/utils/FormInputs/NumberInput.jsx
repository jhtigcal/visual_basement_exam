import { convertPascalToSentence } from '../../../helpers';

function NumberInput({ field, fieldIndex, onChange }) {
  const { fieldName, value } = field;

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
      <input
        className="form-control"
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleFieldDataChange}
        type="number"
        min={0}
      />
    </div>
  );
}

export default NumberInput;
