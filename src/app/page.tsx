"use client";

export default function Home() {

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Menu Lateral */}
      <aside className="w-64 bg-gray-800 text-gray-100">
        <div className="p-6 font-bold text-teal-500 text-2xl">
          fest-fy.com
        </div>
        <nav>
          <ul>
            <li className="px-4 py-2 hover:bg-teal-500 hover:text-white">
              Dashboard
            </li>
            <li className="px-4 py-2 hover:bg-teal-500 hover:text-white">
              Espaços
            </li>
            <li className="px-4 py-2 hover:bg-teal-500 hover:text-white">
              Reservas
            </li>
            <li className="px-4 py-2 hover:bg-teal-500 hover:text-white">
              Usuários
            </li>
            <li className="px-4 py-2 hover:bg-teal-500 hover:text-white">
              Configurações
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8">
        <header className="text-3xl font-semibold text-gray-700 mb-8">
          Dashboard
        </header>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Cards de exemplo */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-teal-600">Espaços Disponíveis</h2>
            <p className="mt-4 text-gray-600">Gerencie e visualize os espaços para eventos.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-teal-600">Reservas Recentes</h2>
            <p className="mt-4 text-gray-600">Veja as últimas reservas confirmadas.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-teal-600">Estatísticas de Uso</h2>
            <p className="mt-4 text-gray-600">Acompanhe as estatísticas de uso da plataforma.</p>
          </div>
        </section>
        
      </main>
    </div>
  );
}

