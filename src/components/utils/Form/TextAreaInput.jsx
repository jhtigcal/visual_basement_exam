function TextAreaInput({ field, fieldIndex, onChange }) {
  const { fieldName, value } = field;

  function handleFieldDataChange(e) {
    let { value } = e.target;
    let localField = field;
    localField.value = value;

    onChange(localField, fieldIndex);
  }

  return (
    <div className="form-group">
      <label to={fieldName}>{fieldName}</label>
      <textarea
        rows={4}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleFieldDataChange}
      />
    </div>
  );
}

export default TextAreaInput;
