import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Componente de Cabeçalho (Header)
const Header = ({ home, consoles, games, gift, logo, path, totalList }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const openMenu = () => setMenuIsOpen(!menuIsOpen);
  const openSearch = () => setSearchIsOpen(!searchIsOpen);

  const search = (input) => {
    const idValue = document.getElementById(`src-product${input}`).value;
    if (idValue !== "") {
      window.location.href = `/srcPage/${idValue}`;
    }
  };

  const enter = (event, input) => {
    if (event.keyCode === 13) {
      search(input);
    }
  };

  return (
    <div className="hidden lg:flex justify-around items-center bg-blue-500 h-20">
      <Link className="h-14" href={home}>
        {/* Imagem de logo */}
        <img className="h-full" src="/GGS_logo.png" alt="Logo Game Store" />
      </Link>

      <nav className="w-7/12 xl:w-1/2 flex justify-around items-center">
        <Link className={`navbar-font px-4 ${path === "consoles" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`} href={consoles}>
          Consoles
        </Link>

        <Link className={`navbar-font px-4 ${path === "games" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`} href={games}>
          Jogos
        </Link>

        {/* Link Gift Card ajustado */}
        <Link className={`navbar-font px-4 ${path === "gift" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`} href={gift}>
          <span className="whitespace-nowrap">Gift Card</span> {/* Isso vai manter "Gift Card" na mesma linha */}
        </Link>

        <Link className={`navbar-font px-4 ${path === "sobre" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`} href="/sobre">
          Sobre
        </Link>

        <Link className={`navbar-font px-4 ${path === "duvidas" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`} href="/duvidas">
          Dúvidas
        </Link>

        <div className="flex bg-white xl:w-80 h-8 rounded-full md:w-64">
          <input onKeyDown={(event) => enter(event, "1")} id="src-product1" placeholder="Procurar..." className="p-1 m-1 ml-2 w-full focus:outline-none" type="text" />
          <svg onClick={() => search("1")} className="mr-4 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </nav>

      <Link href="/shoppingCart" className="flex flex-row">
        <svg className="h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        {totalList > 0 && (
          <div className="-translate-y-2 -translate-x-3">
            <p className="px-2 text-white bg-red-500 rounded-full">{totalList}</p>
          </div>
        )}
      </Link>
    </div>
  );
};

// Seção Sobre a Empresa
const AboutSection = () => (
  <div className="about-section py-10 px-5 bg-gray-200 text-center">
    <h2 className="text-3xl font-bold mb-5">Sobre a Game Store</h2>
    <p className="text-xl">
      A Game Store é uma empresa apaixonada por games, dedicada a oferecer os melhores produtos e experiências para gamers de todo o mundo.
      Nossa missão é trazer entretenimento de qualidade e inovação para todos os nossos clientes, com um foco em serviços excepcionais e preços acessíveis.
    </p>
  </div>
);

// Seção de Funcionários
const EmployeesSection = () => {
  const employees = [
    { name: "João", role: "Desenvolvedor", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Maria", role: "Designer", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Carlos", role: "Gerente", photo: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Ana", role: "Marketing", photo: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "Lucas", role: "Suporte", photo: "https://randomuser.me/api/portraits/men/5.jpg" },
  ];

  return (
    <div className="employee-section py-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-5">Nossos Funcionários</h2>
      <div className="flex justify-around flex-wrap">
        {employees.map((employee, index) => (
          <div key={index} className="employee-card w-32 h-40 m-4 text-center">
            <img className="w-full h-full object-cover rounded-full" src={employee.photo} alt={employee.name} />
            <p className="mt-2 font-semibold">{employee.name}</p>
            <p>{employee.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Seção de Cadastro de Dados Pessoais
const PersonalInfoSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    receivePromotions: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode tratar os dados coletados
    alert('Dados enviados com sucesso!');
  };

  return (
    <div className="personal-info-section py-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-5">Cadastro para Promoções e Dicas</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-5 rounded shadow">
        <div className="mb-4">
          <label className="block text-left text-lg font-semibold">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-lg font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-lg font-semibold">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-lg font-semibold">Celular</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="receivePromotions"
              checked={formData.receivePromotions}
              onChange={handleChange}
              className="mr-2"
            />
            Desejo receber promoções e dicas
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

// Página Sobre
const AboutPage = () => {
  const [totalList, setTotalList] = useState(0);

  // Simulando o valor de totalList, você pode substituir isso pela sua lógica real.
  useEffect(() => {
    setTotalList(5);  // Aqui você pode substituir com a lógica real de contagem de itens no carrinho
  }, []);

  return (
    <div>
      <Header
        totalList={totalList}
        home="../"
        consoles="../consoles"
        games="../games"
        gift="../giftCard"
        logo="/GGS_logo.png"
        path="sobre"
      />

      <AboutSection />
      <EmployeesSection />
      <PersonalInfoSection />
    </div>
  );
};

export default AboutPage;
