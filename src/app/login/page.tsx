"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation'; // Usado para redirecionar para a Home
import * as Yup from 'yup';

interface LoginValues {
  username: string;
  password: string;
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
            Login fest-fy.com
          </p>

          <hr />
          <br />
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string().email().required('E-mail obrigatório'),
              password: Yup.string()
                .required('Senha é obrigatório')
                .min(6, '`Por favor, insira pelo menos 6 caracteres`'),
            })}
            onSubmit={(
              values: LoginValues,
              { setSubmitting, resetForm }: FormikHelpers<LoginValues>
            ) => {
              setTimeout(() => {
                // Simulação de login bem-sucedido
                setSubmitting(false);
                alert('Login successful!');

                console.log('Form values:', values);

                // Atualizar o localStorage com a nova lista de eventos
                localStorage.setItem('loginUser', JSON.stringify(values));

                // Redireciona para a página "Home"
                router.push('/');
                resetForm();
              }, 500);
            }}
          >
            {({ isSubmitting, handleBlur, isValid }) => (
              <Form className="max-w-xx p-5 bg-white shadow-md rounded-lg">
                <div className="mb-4 text-left">
                  <label htmlFor="username" className="block text-gray-700">E-mail</label>
                  <Field
                    name="username"
                    placeholder="Informe o seu e-mail"
                    type="email"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4 text-left">
                  <label htmlFor="password" className="block text-gray-700">Senha</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    onBlur={handleBlur}
                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50     text-gray-900 placeholder-gray-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>


                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? 'Validando...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
