"use client";

import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

export default function Home() {
  const formik = useFormik({
    initialValues: {
      eventName: '',
      description: '',
      startDate: '',
      endDate: '',
      address: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      postalCode: '',
      capacity: '',
      eventType: '',
      accessibility: false,
      organizerName: '',
      organizerEmail: '',
      organizerPhone: '',
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required('O nome do evento é obrigatório'),
      description: Yup.string().required('A descrição é obrigatória'),
      startDate: Yup.date().required('Data de início é obrigatória'),
      endDate: Yup.date().required('Data de término é obrigatória'),
      address: Yup.string().required('Endereço é obrigatório'),
      number: Yup.string().required('Número é obrigatório'),
      neighborhood: Yup.string().required('Bairro é obrigatório'),
      city: Yup.string().required('Cidade é obrigatória'),
      state: Yup.string().required('Estado é obrigatório'),
      postalCode: Yup.string().required('CEP é obrigatório'),
      capacity: Yup.number().required('Capacidade é obrigatória'),
      eventType: Yup.string().required('Tipo de evento é obrigatório'),
      organizerName: Yup.string().required('Nome do organizador é obrigatório'),
      organizerEmail: Yup.string()
        .email('E-mail inválido')
        .required('E-mail do organizador é obrigatório'),
      organizerPhone: Yup.string().required('Telefone do organizador é obrigatório'),
    }),
    onSubmit: (values) => {
      console.log('Form Data', values);

      setFormData(values)
    },
  });

  const [formData, setFormData] = useState({});

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-left">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Deploy faster
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to deploy your app
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
            mi viverra elit nunc.


            Formulário <br />
            {JSON.stringify(formData)}
          </p>

          <form onSubmit={formik.handleSubmit} className="max-w-lg p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4 text-left">
              {JSON.stringify(formik.errors, null, 2)}
              <label htmlFor="eventName" className="block text-gray-700">Nome do Evento</label>
              <input
                id="eventName"
                name="eventName"
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.eventName}
              />
              {formik.touched.eventName && formik.errors.eventName ? (
                <div className="text-red-500 text-sm">{formik.errors.eventName}</div>
              ) : null}
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="description" className="block text-gray-700">Descrição do Evento</label>
              <textarea
                id="description"
                name="description"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm">{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="startDate" className="block text-gray-700">Data de Início</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
              ) : null}
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="endDate" className="block text-gray-700">Data de Término</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
              ) : null}
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="address" className="block text-gray-700">Endereço</label>
              <input
                id="address"
                name="address"
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-sm">{formik.errors.address}</div>
              ) : null}
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="city" className="block text-gray-700">Cidade</label>
              <input
                id="city"
                name="city"
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500 text-sm">{formik.errors.city}</div>
              ) : null}
            </div>

            <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
