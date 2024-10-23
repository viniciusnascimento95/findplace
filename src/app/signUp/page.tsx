"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation'; // Usado para redirecionar para a Home
import * as Yup from 'yup';

interface SignUpValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function Login() {
  const router = useRouter();

  return (
    <div className="bg-gray-200 py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-left">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Welcome Back!
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Criando conta fest-fy.com
          </p>

          <hr />
          <br />
          <Formik
            initialValues={{
              email: '',
              name: '',
              phone: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('E-mail inválido')
                .required('E-mail obrigatório'),
              name: Yup.string()
                .required('Nome obrigatório')
                .min(3, 'Nome deve ter pelo menos 3 caracteres'),
              phone: Yup.string()
                .required('Telefone obrigatório')
                .matches(
                  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                  'Número de telefone inválido'
                ),
              password: Yup.string()
                .required('Senha é obrigatória')
                .min(6, 'Por favor, insira pelo menos 6 caracteres'),
              confirmPassword: Yup.string()
                .required('Confirmação de senha é obrigatória')
                .oneOf([Yup.ref('password')], 'As senhas devem coincidir'),
            })}
            onSubmit={(
              values: SignUpValues,
              { setSubmitting, resetForm }: FormikHelpers<SignUpValues>
            ) => {
              setTimeout(() => {
                setSubmitting(false);
                alert('Login bem-sucedido!');

                console.log('Form values:', values);

                localStorage.setItem('signUpUser', JSON.stringify(values));

                // Redireciona para a página "Home"
                router.push('/');
                resetForm();
              }, 500);
            }}
          >
            {({ isSubmitting, handleBlur, isValid }) => (
              <Form className="max-w-xx p-5 bg-white shadow-md rounded-lg">
                {/* Campo Nome */}
                <div className="mb-4 text-left">
                  <label htmlFor="name" className="block text-gray-700">Nome</label>
                  <Field
                    name="name"
                    placeholder="Informe o seu nome"
                    type="text"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Campo E-mail */}
                <div className="mb-4 text-left">
                  <label htmlFor="email" className="block text-gray-700">E-mail</label>
                  <Field
                    name="email"
                    placeholder="Informe o seu e-mail"
                    type="email"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Campo Telefone */}
                <div className="mb-4 text-left">
                  <label htmlFor="phone" className="block text-gray-700">Telefone</label>
                  <Field
                    name="phone"
                    placeholder="Informe o seu telefone"
                    type="tel"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Campo Senha */}
                <div className="mb-4 text-left">
                  <label htmlFor="password" className="block text-gray-700">Senha</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Campo Confirmar Senha */}
                <div className="mb-4 text-left">
                  <label htmlFor="confirmPassword" className="block text-gray-700">Confirme a Senha</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? 'Validando...' : 'Criar conta'}
                </button>
              </Form>
            )}
          </Formik>

        </div>
      </div>
    </div>
  );
}
