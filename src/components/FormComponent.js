// src/components/FormComponent.js
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
});

export default function FormComponent({ addOrEdit, selectedUser }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      addOrEdit(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (selectedUser) {
      formik.setValues(selectedUser);
    }
  }, [selectedUser]);

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <span>{formik.errors.name}</span>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <span>{formik.errors.email}</span>
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        <span>{formik.errors.phone}</span>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
