"use client";

import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface Values {
  eventName: string
  description: string
  startDate: Date
  endDate: Date
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  capacity: string
  eventType: string
  accessibility: string
  organizerName: string
  organizerEmail: string
  organizerPhone: string
}

interface ErrorMessageProps {
  touched: boolean | undefined;
  error: string | undefined;
}


export default function Home() {

  const ErrorMessage = ({ touched, error }: ErrorMessageProps) => (
    touched && error ? <div className="text-red-500 text-sm">{error}</div> : null
  );

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
            Formulário <br />
            {/* {JSON.stringify(formData)} */}
          </p>

          <hr />
          <br />
          <Formik
            initialValues={{
              eventName: '',
              description: '',
              startDate: new Date(),
              endDate: new Date(),
              address: '',
              number: '',
              neighborhood: '',
              city: '',
              state: '',
              postalCode: '',
              capacity: '',
              eventType: '',
              accessibility: '',
              organizerName: '',
              organizerEmail: '',
              organizerPhone: '',
            }}
            validationSchema={Yup.object({
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
            })}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ isSubmitting, touched, errors, values, handleBlur, handleChange }) => (
              <Form className="max-w-lg p-4 bg-white shadow-md rounded-lg">
                <p className="text-gray-700">{JSON.stringify(errors, null, 2)}</p>
                <div className="mb-4 text-left">
                  <label htmlFor="eventName" className="block text-gray-700">Nome do Evento</label>
                  <p className="block text-gray-700"> {JSON.stringify(values)}</p>
                  <Field
                    name="eventName"
                    placeholder="Nome do evento"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {touched.eventName && errors.eventName && (
                    <div className="text-red-500 text-sm">{errors.eventName}</div>
                  )}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="description" className="block text-gray-700">Descrição do Evento</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {touched.description && errors.description && (
                    <div className="text-red-500 text-sm">{errors.description}</div>
                  )}
                </div>

                <div className='flex flex-row'>
                  <div className="mb-4 text-left basis-1/4 mr-3">
                    <label htmlFor="startDate" className="block text-gray-700">Data de Início</label>
                    <Field
                      id="startDate"
                      name="startDate"
                      type="date"
                      className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="mb-4 text-left basis-1/4">
                    <label htmlFor="endDate" className="block text-gray-700">Data de Término</label>
                    <Field
                      id="endDate"
                      name="endDate"
                      type="date"
                      className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="postalCode" className="block text-gray-700">CEP</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {touched.postalCode && errors.postalCode ? (
                    <div className="text-red-500 text-sm">{errors.postalCode}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="address" className="block text-gray-700">Endereço</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"

                  />
                  {touched.address && errors.address ? (
                    <div className="text-red-500 text-sm">{errors.address}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="city" className="block text-gray-700">Cidade</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {touched.city && errors.city ? (
                    <div className="text-red-500 text-sm">{errors.city}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="state" className="block text-gray-700">Estado</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {touched.state && errors.state ? (
                    <div className="text-red-500 text-sm">{errors.state}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="capacity" className="block text-gray-700">Capacidade de pessoas</label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {touched.capacity && errors.capacity ? (
                    <div className="text-red-500 text-sm">{errors.capacity}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="eventType" className="block text-gray-700">Tipo de Evento</label>
                  <input
                    id="eventType"
                    name="eventType"
                    type="number"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {touched.eventType && errors.eventType ? (
                    <div className="text-red-500 text-sm">{errors.eventType}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label className="block text-gray-700 mb-2">O local é acessível?</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="accessibility"
                        value="SIM"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.accessibility === 'SIM'}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Sim</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="accessibility"
                        value="NAO"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.accessibility === 'NAO'}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Não</span>
                    </label>
                  </div>
                  {touched.accessibility && errors.accessibility ? (
                    <div className="text-red-500 text-sm">{errors.accessibility}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="organizerName" className="block text-gray-700">Organizadora</label>
                  <input
                    id="organizerName"
                    name="organizerName"
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"

                  />
                  {touched.organizerName && errors.organizerName ? (
                    <div className="text-red-500 text-sm">{errors.organizerName}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="organizerEmail" className="block text-gray-700">E-mail Organizadora</label>
                  <input
                    id="organizerEmail"
                    name="organizerEmail"
                    type="email"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"

                  />
                  {touched.organizerEmail && errors.organizerEmail ? (
                    <div className="text-red-500 text-sm">{errors.organizerEmail}</div>
                  ) : null}
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="organizerPhone" className="block text-gray-700">Contato Organizadora</label>
                  <input
                    id="organizerPhone"
                    name="organizerPhone"
                    type="tel"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"

                  />
                  {touched.organizerPhone && errors.organizerPhone ? (
                    <div className="text-red-500 text-sm">{errors.organizerPhone}</div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Salvar'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
