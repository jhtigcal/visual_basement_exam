import { convertPascalToSentence } from '../../../helpers';

function TextInput({ field, fieldIndex, onChange, hasErrors }) {
  const { fieldName, value } = field;

  function handleFieldDataChange(e) {
    let { value } = e.target;
    let localField = field;
    localField.value = value;

    onChange(localField, fieldIndex);
  }

  return (
    <div className="form-group mb-4">
      <label to={fieldName} className="form-label">
        {convertPascalToSentence(fieldName)}
      </label>
      <input
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleFieldDataChange}
        type="text"
        className={`form-control${!hasErrors ? '' : ' is-invalid'}`}
      />
      <div className="invalid-feedback">
        {(hasErrors && hasErrors.message) || 'Invalid input.'}
      </div>
    </div>
  );
}

export default TextInput;
