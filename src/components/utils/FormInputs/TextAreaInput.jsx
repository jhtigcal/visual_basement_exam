import { convertPascalToSentence } from '../../../helpers';

function TextAreaInput({ field, fieldIndex, onChange }) {
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
      <textarea
        rows={4}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleFieldDataChange}
        className="form-control"
      />
    </div>
  );
}

export default TextAreaInput;
