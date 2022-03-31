import { useEffect, useState } from 'react';
import {
  NumberInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from './utils/FormInputs';
import { validateInput } from '../helpers';
import _ from 'lodash';

// This functions renders the form data
// based on its input type
function renderInputFromType(field, fieldIndex, onChange, hasErrors) {
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
          hasErrors={hasErrors}
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
          hasErrors={hasErrors}
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
          hasErrors={hasErrors}
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
          hasErrors={hasErrors}
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
          hasErrors={hasErrors}
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
        hasErrors={hasErrors}
      />;
  }
}

export default function Form({ formData, onChange, onSubmit, loading }) {
  const [disableSubmit, setDisableSubmit] = useState(false); // Disables submit when there is an error
  const [errors, setErrors] = useState([]); // For tracking errors

  useEffect(() => {
    if (!errors.length) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [errors]);

  async function handleChange(field, index) {
    let localErrors = [];
    const requiredFieldNames = ['firstName', 'lastName', 'emailAddress'];
    await onChange(field, index);

    // Validate required fields
    formData.forEach((field, index) => {
      const { fieldName, value } = field;
      if (requiredFieldNames.includes(fieldName)) {
        const validate = validateInput(fieldName, value, index);
        if (validate) {
          localErrors = [...localErrors, validate];
        }
      }
    });

    setErrors(localErrors);
  }

  async function handleSubmit(e) {
    setDisableSubmit(true);
    await onSubmit(e);
    setDisableSubmit(false);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="mt-4">Visual Basement Test</h1>
      {!loading ? (
        formData &&
        formData.map((field, index) => {
          return renderInputFromType(
            field,
            index,
            handleChange,
            _.find(errors, (o) => o.fieldName === field.fieldName) || false
          );
        })
      ) : (
        <p>Please wait a moment</p>
      )}
      <button
        className="btn btn-lg btn-primary"
        disabled={disableSubmit}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
