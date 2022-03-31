function SelectInput({ field, fieldIndex, onChange }) {
  const { fieldName, value, options } = field;

  function handleFieldDataChange(e) {
    let { value } = e.target;
    let localField = field;
    localField.value = value;

    onChange(localField, fieldIndex);
  }

  return (
    <div className="form-group">
      <label to={fieldName}>{fieldName}</label>
      <select id={fieldName} value={value} onChange={handleFieldDataChange}>
        {options &&
          options.length &&
          options.map((o, i) => (
            <option key={`select-${fieldName}-${i}`} value={o}>
              {o}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectInput;
