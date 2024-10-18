"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

interface Values {
  eventName: string
  description: string
  startDate: string
  endDate: string
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

export default function Home() {

  const [savedEvents, setSavedEvents] = useState<Values[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setSavedEvents(JSON.parse(storedEvents));
    }
  }, []);

  const saveEvent = (values: Values) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(values);
    localStorage.setItem('events', JSON.stringify(events));
    setSavedEvents(events);
  };

  async function fetchAddressByPostalCode(postalCode: string) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${postalCode}/json/`);
      if (!response.ok) {
        throw new Error('Erro ao consultar o CEP');
      }
      const data = await response.json();
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
      return data;
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      return null;
    }
  }


  function removeItem(index: number): void {
    // Obter a lista de eventos do localStorage e convertê-la em um array
    const events = JSON.parse(localStorage.getItem('events') || '[]');

    // Verificar se o index está dentro do intervalo válido
    if (index >= 0 && index < events.length) {
      // Remover o item do array usando splice
      events.splice(index, 1);

      // Atualizar o localStorage com a nova lista de eventos
      localStorage.setItem('events', JSON.stringify(events));

      console.log('Item removido com sucesso!', index, events);
    } else {
      console.error('Index inválido:', index);
    }

    location.reload()
  }


  return (
    <div className="bg-gray-200 py-24 sm:py-32">
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
          </p>

          <hr />
          <br />
          <Formik
            initialValues={{
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
              accessibility: '',
              organizerName: '',
              organizerEmail: '',
              organizerPhone: '',
            }}
            validationSchema={Yup.object({
              eventName: Yup.string().required('O nome do evento é obrigatório'),
              description: Yup.string().required('A descrição é obrigatória'),
              startDate: Yup.date()
                .required('Data de início é obrigatória'),
              //.nullable(),
              endDate: Yup.date()
                .required('Data de término é obrigatória')
                //.nullable(),
                .min(
                  Yup.ref('startDate'),
                  'A data de término deve ser posterior à data de início'
                ),
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
              { setSubmitting, resetForm }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {

                setSubmitting(false);
                saveEvent(values);
                resetForm();
              }, 500);
            }}
          >
            {({ isSubmitting, handleBlur, isValid, setFieldValue }) => (
              <Form className="max-w-xx p-4 bg-white shadow-md rounded-lg">
                {/* <p className="text-gray-700">Erros: {JSON.stringify(errors, null, 2)}</p> */}
                <div className="mb-4 text-left">
                  <label htmlFor="eventName" className="block text-gray-700">Nome do Evento</label>                 
                  
                  <Field
                    name="eventName"
                    placeholder="Nome do evento"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage name="eventName" component="div" className="text-red-500 text-sm" />
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
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
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

                <hr className='my-2' />

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Endereço</h3>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/3 px-2 mb-4">
                      <label htmlFor="postalCode" className="block text-gray-700">CEP</label>
                      <Field
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
                          const postalCode = e.target.value;
                          if (postalCode) {
                            const addressData = await fetchAddressByPostalCode(postalCode);
                            if (addressData) {
                              setFieldValue('address', addressData.logradouro);
                              setFieldValue('neighborhood', addressData.bairro);
                              setFieldValue('city', addressData.localidade);
                              setFieldValue('state', addressData.uf);
                            }
                          }
                        }}
                      />
                      <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="w-full md:w-2/3 px-2 mb-4">
                      <label htmlFor="address" className="block text-gray-700">Endereço</label>
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-full md:w-1/4 px-2 mb-4">
                      <label htmlFor="number" className="block text-gray-700">Número</label>
                      <Field
                        id="number"
                        name="number"
                        type="text"
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="number" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-full md:w-1/4 px-2 mb-4">
                      <label htmlFor="neighborhood" className="block text-gray-700">Bairro</label>
                      <Field
                        id="neighborhood"
                        name="neighborhood"
                        type="text"
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="neighborhood" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-full md:w-1/4 px-2 mb-4">
                      <label htmlFor="city" className="block text-gray-700">Cidade</label>
                      <Field
                        id="city"
                        name="city"
                        type="text"
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-full md:w-1/4 px-2 mb-4">
                      <label htmlFor="state" className="block text-gray-700">Estado</label>
                      <Field
                        id="state"
                        name="state"
                        type="text"
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="capacity" className="block text-gray-700">Capacidade de pessoas</label>
                  <Field
                    id="capacity"
                    name="capacity"
                    type="number"
                    placeholder="Ex: 100"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage name="capacity" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="eventType" className="block text-gray-700">Tipo de Evento</label>
                  <Field
                    id="eventType"
                    name="eventType"
                    type="text"
                    placeholder="Ex: Conferência"
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage name="eventType" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4 text-left">
                  <label className="block text-gray-700 mb-2">O local é acessível?</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <Field
                        type="radio"
                        name="accessibility"
                        value="SIM"
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Sim</span>
                    </label>
                    <label className="inline-flex items-center">
                      <Field
                        type="radio"
                        name="accessibility"
                        value="NAO"
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Não</span>
                    </label>
                  </div>
                  <ErrorMessage name="accessibility" component="div" className="text-red-500 text-sm" />
                </div>

                <hr className='my-2' />
                <div className='flex flex-row gap-4'>
                  <div className="mb-4 text-left basis-1/3">
                    <label htmlFor="organizerName" className="block text-gray-700">Organizadora</label>
                    <Field
                      id="organizerName"
                      name="organizerName"
                      type="text"
                      placeholder="Nome da organizadora"
                      className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage name="organizerName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="mb-4 text-left basis-1/3">
                    <label htmlFor="organizerEmail" className="block text-gray-700">E-mail Organizadora</label>
                    <Field
                      id="organizerEmail"
                      name="organizerEmail"
                      type="email"
                      placeholder="exemplo@email.com"
                      className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage name="organizerEmail" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="mb-4 text-left basis-1/3">
                    <label htmlFor="organizerPhone" className="block text-gray-700">Contato Organizadora</label>
                    <Field
                      id="organizerPhone"
                      name="organizerPhone"
                      type="tel"
                      placeholder="(XX) XXXXX-XXXX"
                      className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <ErrorMessage name="organizerPhone" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>


                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? 'Enviando...' : 'Salvar'}
                </button>
              </Form>
            )}
          </Formik>
        </div>


        <div className='container flex m-5'>
          {savedEvents.map((event, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 mr-3 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.eventName || "Evento sem nome"}</h2>
              <p className="text-gray-600 mb-4">{event.description || "Sem descrição disponível"}</p>

              <button type="button"
                className="mt-4 mb-4 w-40 bg-red-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => removeItem(index)}>Removendo item</button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-bold">Data de Início:</span> {new Date(event.startDate).toLocaleString()}</p>
                  <p><span className="font-bold">Data de Término:</span> {new Date(event.endDate).toLocaleString()}</p>
                </div>
                <div>
                  <p><span className="font-bold">Local:</span> {event.address || "Sem endereço"}, {event.number}</p>
                  <p><span className="font-bold">Bairro:</span> {event.neighborhood || "Sem bairro"}</p>
                  <p><span className="font-bold">Cidade:</span> {event.city || "Sem cidade"}, {event.state || "Sem estado"}</p>
                  <p><span className="font-bold">CEP:</span> {event.postalCode || "Sem CEP"}</p>
                </div>
              </div>

              <div className="mt-4">
                <p><span className="font-bold">Capacidade:</span> {event.capacity || "Sem capacidade"}</p>
                <p><span className="font-bold">Tipo de Evento:</span> {event.eventType || "Sem tipo de evento"}</p>
                <p><span className="font-bold">Acessibilidade:</span> {event.accessibility || "Não informado"}</p>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-800">Organizador:</h3>
                <p><span className="font-bold">Nome:</span> {event.organizerName || "Sem nome"}</p>
                <p><span className="font-bold">Email:</span> {event.organizerEmail || "Sem email"}</p>
                <p><span className="font-bold">Telefone:</span> {event.organizerPhone || "Sem telefone"}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
