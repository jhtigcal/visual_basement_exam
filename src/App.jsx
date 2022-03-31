import { useEffect, useState } from 'react';
import { getFormData, postFormData } from './api';
import Form from './components/Form';

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [success, setSuccess] = useState('');

  async function initializeData() {
    setLoading(true);

    const getResponse = await getFormData();
    if (getResponse.data.success === true) {
      setFormData(getResponse.data.data);
      setLoading(false);
    }
  }

  function onChange(newFieldData, index) {
    const newFormData = [...formData];
    newFormData[index] = newFieldData;

    setFormData(newFormData);
  }

  // GET Form Data on Component Mount
  useEffect(() => {
    initializeData();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setSuccess('');

    let reducedData = {};
    formData.forEach((field) => {
      reducedData[field.fieldName] = field.value;
    });

    setSuccess('Please wait...');
    const response = await postFormData(reducedData);
    setSuccess(response);
  }

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="row g-5 mt-md-5 h-80">
        <div className="col-md-6 col-12">
          <Form
            formData={formData}
            onChange={onChange}
            onSubmit={onSubmit}
            loading={loading}
          />
        </div>

        <div className="col-md-6 col-12" style={{ height: '80vh' }}>
          <div className="card bg-dark text-light" style={{ height: '100%' }}>
            <div className="card-body mx-3 my-3">
              <h1 className="card-title">Response</h1>
              <pre className="text-wrap">
                {success === '' ? null : JSON.stringify(success)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
