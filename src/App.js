import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  NumberInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from './components/utils/Form';

// Create an API
const api = axios.create({
  baseURL: 'https://vb-react-exam.netlify.app/api/form',
});

// This functions renders the form data
// based on its input type
function renderInputFromType(field, fieldIndex, onChange) {
  const { type } = field;

  switch (type) {
    case 'text':
      return (
        <TextInput
          key={fieldIndex}
          field={field}
          fieldIndex={fieldIndex}
          onChange={(field, fieldIndex) => {
            onChange(field, fieldIndex);
          }}
        />
      );
    case 'email':
      return (
        <TextInput
          key={fieldIndex}
          field={field}
          fieldIndex={fieldIndex}
          onChange={(field, fieldIndex) => {
            onChange(field, fieldIndex);
          }}
        />
      );
    case 'multiline':
      return (
        <TextAreaInput
          key={fieldIndex}
          field={field}
          fieldIndex={fieldIndex}
          onChange={(field, fieldIndex) => {
            onChange(field, fieldIndex);
          }}
        />
      );
    case 'select':
      return (
        <SelectInput
          key={fieldIndex}
          field={field}
          fieldIndex={fieldIndex}
          onChange={(field, fieldIndex) => {
            onChange(field, fieldIndex);
          }}
        />
      );
    case 'number':
      return (
        <NumberInput
          key={fieldIndex}
          field={field}
          fieldIndex={fieldIndex}
          onChange={(field, fieldIndex) => {
            onChange(field, fieldIndex);
          }}
        />
      );
    default:
      <TextInput
        key={fieldIndex}
        field={field}
        fieldIndex={fieldIndex}
        onChange={(field, fieldIndex) => {
          onChange(field, fieldIndex);
        }}
      />;
  }
}

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [success, setSuccess] = useState('');

  // GET Form Data on Component Mount
  useEffect(() => {
    setLoading(true);
    api
      .get('/')
      .then((res) => {
        if (res.data && res.data.success === true) setFormData(res.data.data);
        setLoading(false);
      })
      .catch((err) => alert(err));
  }, []);

  function onChange(newFieldData, index) {
    const newFormData = [...formData];
    newFormData[index] = newFieldData;

    setFormData(newFormData);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to send this?')) {
      setLoading(true);

      let reducedData = {};

      formData.forEach((field) => {
        reducedData[field.fieldName] = field.value;
      });

      api
        .post('/', reducedData)
        .then((res) => {
          setSuccess(res.data);
        })
        .then(setLoading(false))
        .catch((err) => console.error(err));
    }
  }

  return (
    <div>
      <h1>Visual Basement Test</h1>
      {!loading ? (
        <div>
          {formData && formData.length
            ? formData.map((field, i) => {
                return renderInputFromType(field, i, onChange);
              })
            : null}
          <button onClick={onSubmit}>Submit</button>
        </div>
      ) : (
        <div>Please wait a moment...</div>
      )}
      <br />
      <pre>{success === '' ? null : JSON.stringify(success, null, 2)}</pre>
    </div>
  );
}

export default App;
