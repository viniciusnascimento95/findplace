"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

interface Infrastructure {
  airConditioning: boolean;
  wifi: boolean;
  parking: boolean;
  wheelchairAccess: boolean;
  restrooms: boolean;
  kitchenBuffetArea: boolean;
}

interface Equipment {
  projector: boolean;
  soundSystem: boolean;
  microphones: boolean;
  tablesAndChairs: boolean;
  specialLighting: boolean;
}
interface Values {
  eventName: string
  description: string
  // startDate: string
  // endDate: string
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  capacity: string
  eventType: string
  accessibility: string

  infrastructure: Infrastructure;
  equipment: Equipment;
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
    let events = [];
    if (typeof window !== 'undefined') {
      events = JSON.parse(localStorage.getItem('events') || '[]');
    }

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
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-10">
          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Bem-vindo à Aplicação!</h1>
            <p className="text-gray-600 mt-2">
              Acesse as páginas de login, criação de conta ou volte para a página inicial.
            </p>
          </div>
          <div className="px-6 py-4">
            {/* Link para a Home */}
            <Link
              href="/"
              className="block w-full text-center bg-blue-700 text-white font-bold py-2 rounded-md mt-2 hover:bg-blue-600"
            >
              Página Inicial (Você está nessa página)
            </Link>

            {/* Link para a página de Login */}
            <Link
              href="/login"
              className="block w-full text-center bg-blue-500 text-white font-bold py-2 rounded-md mt-2 hover:bg-blue-600"
            >
              Login
            </Link>

            {/* Link para a página de Criação de Conta */}
            <Link
              href="/signUp"
              className="block w-full text-center bg-blue-500 text-white font-bold py-2 rounded-md mt-2 hover:bg-blue-600"
            >
              Criar Conta
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-2xl lg:text-left">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Deploy faster fest-fy.com
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to deploy your app fest-fy.com
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Formulário cadastro do espaço <br />
          </p>



          <hr />
          <br />
          <Formik
            initialValues={{
              eventName: '',
              description: '',
              // startDate: '', desativado pois nesse modulo não vamos precisar no momento
              // endDate: '', desativado pois nesse modulo não vamos precisar no momento
              address: '',
              number: '',
              neighborhood: '',
              city: '',
              state: '',
              postalCode: '',
              capacity: '',
              eventType: '',
              accessibility: '',
              infrastructure: {
                airConditioning: false,
                wifi: false,
                parking: false,
                wheelchairAccess: false,
                restrooms: false,
                kitchenBuffetArea: false,
              },
              equipment: {
                projector: false,
                soundSystem: false,
                microphones: false,
                tablesAndChairs: false,
                specialLighting: false,
              },
            }}
            validationSchema={Yup.object({
              eventName: Yup.string().required('O nome do evento é obrigatório'),
              description: Yup.string().required('A descrição é obrigatória'),
              // startDate: Yup.date()
              //   .required('Data de início é obrigatória'),
              // //.nullable(),
              // endDate: Yup.date()
              //   .required('Data de término é obrigatória')
              //   //.nullable(),
              //   .min(
              //     Yup.ref('startDate'),
              //     'A data de término deve ser posterior à data de início'
              //   ),
              address: Yup.string().required('Endereço é obrigatório'),
              number: Yup.string().required('Número é obrigatório'),
              neighborhood: Yup.string().required('Bairro é obrigatório'),
              city: Yup.string().required('Cidade é obrigatória'),
              state: Yup.string().required('Estado é obrigatório'),
              postalCode: Yup.string().required('CEP é obrigatório'),
              capacity: Yup.number().required('Capacidade é obrigatória'),
              eventType: Yup.string().required('Tipo de evento é obrigatório'),
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
              <Form className="max-w-xx p-5 bg-white shadow-md rounded-lg">
                {/* <p className="text-gray-700">Erros: {JSON.stringify(errors, null, 2)}</p> */}
                <div className="mb-4 text-left">
                  <label htmlFor="eventName" className="block text-gray-700">Nome do espaço</label>

                  <Field
                    name="eventName"
                    placeholder="Digite o nome do evento (ex.: Workshop de Criatividade em Grupo)"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage name="eventName" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="description" className="block text-gray-700">Descrição do espaço</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Exemplo: 'Descrição do workshop de desenvolvimento pessoal, com foco em habilidades de comunicação e networking.'"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>

                {/* <div className='flex flex-row'>
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
                </div> */}

                <hr className='my-2' />

                <div className="flex flex-wrap mb-4 justify-between">
                  {/* Seção Infraestrutura */}
                  <div className="text-left basis-1/2 lg:basis-1/4 mr-3 ">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Infraestrutura</h3>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="infrastructure.airConditioning"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Ar-condicionado</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="infrastructure.wifi"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Wi-Fi</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="infrastructure.parking"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Estacionamento</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="infrastructure.wheelchairAccess"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Acessibilidade para cadeirantes</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="infrastructure.restrooms"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Banheiros</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="infrastructure.kitchenBuffetArea"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Cozinha ou área para buffet</span>
                      </label>
                    </div>
                  </div>

                  {/* Seção Equipamentos */}
                  <div className="text-left basis-1/2 lg:basis-1/4 mr-3">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Fornecedores Exclusivos</h3>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="equipment.projector"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Projetor</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="equipment.soundSystem"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Sistema de som</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="equipment.microphones"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Microfones</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="equipment.tablesAndChairs"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Mesas e cadeiras</span>
                      </label>

                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="equipment.specialLighting"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Iluminação especial</span>
                      </label>
                    </div>
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
                        placeholder="Digite seu CEP"
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


        <div className="container flex m-5 flex-wrap">
          {savedEvents.map((event, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 mr-3 border border-gray-200 relative max-w-md">
              {/* Botão de remoção com "X" */}
              <button
                type="button"
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-100 hover:text-red-700 rounded-full transition-colors duration-200"
                onClick={() => removeItem(index)}
              >
                &times;
              </button>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.eventName || "Evento sem nome"}</h2>
              <p className="text-gray-600 mb-4">{event.description || "Sem descrição disponível"}</p>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className='text-gray-500'>
                    <span className="font-bold text-gray-900">Local:</span> {event.address || "Sem endereço"}, {event.number || "S/N"}
                  </p>
                  <p className='text-gray-500'><span className="font-bold text-gray-900">Bairro:</span> {event.neighborhood || "Sem bairro"}</p>
                  <p className='text-gray-500'><span className="font-bold text-gray-900">Cidade:</span> {event.city || "Sem cidade"}, {event.state || "Sem estado"}</p>
                  <p className='text-gray-500'><span className="font-bold text-gray-900">CEP:</span> {event.postalCode || "Sem CEP"}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className='text-gray-500'><span className="font-bold text-gray-900">Capacidade:</span> {event.capacity || "Sem capacidade"}</p>
                <p className='text-gray-500'><span className="font-bold text-gray-900">Tipo de Evento:</span> {event.eventType || "Sem tipo de evento"}</p>
                <p className='text-gray-500'><span className="font-bold text-gray-900">Acessibilidade:</span> {event.accessibility || "Não informado"}</p>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-800">Infraestrutura Disponível:</h3>
                <ul className="list-disc pl-5 text-gray-500">
                  {event.infrastructure.airConditioning && <li>Ar-condicionado</li>}
                  {event.infrastructure.wifi && <li>Wi-Fi</li>}
                  {event.infrastructure.parking && <li>Estacionamento</li>}
                  {event.infrastructure.wheelchairAccess && <li>Acessibilidade para cadeirantes</li>}
                  {event.infrastructure.restrooms && <li>Banheiros</li>}
                  {event.infrastructure.kitchenBuffetArea && <li>Cozinha ou área para buffet</li>}
                  {/* {event.infrastructure.tables && <li>Mesas</li>}
                  {event.infrastructure.chairs && <li>Cadeiras</li>} */}
                </ul>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-800">Fornecedores Exclusivos Disponíveis:</h3>
                <ul className="list-disc pl-5 text-gray-500">
                  {event.equipment.projector && <li>Projetor</li>}
                  {event.equipment.soundSystem && <li>Sistema de som</li>}
                  {event.equipment.microphones && <li>Microfones</li>}
                  {event.equipment.tablesAndChairs && <li>Mesas e cadeiras</li>}
                  {event.equipment.specialLighting && <li>Iluminação especial</li>}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

