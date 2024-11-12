import Link from "next/link";
import { useState } from "react";

export default function Header(props) {
  const homePath = props.home;
  const consolesPath = props.consoles;
  const gamesPath = props.games;
  const giftPath = props.gift;
  const logoPath = props.logo;
  const path = props.path;
  const totalList = props.totalList;

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para o campo de busca

  function openMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  function openSearch() {
    setSearchIsOpen(!searchIsOpen);
  }

  function search(input) {
    if (searchQuery.trim() !== "") {
      window.location.href = `/srcPage/${searchQuery}`;
    }
  }

  function handleSearchInput(event) {
    setSearchQuery(event.target.value); // Atualizando o estado com o valor digitado
  }

  function enter(event) {
    if (event.keyCode === 13) {
      search(); // Executando a busca quando pressionar Enter
    }
  }

  return (
    <>
      <div className="hidden lg:flex justify-around items-center bg-blue-500 h-20">
        <Link className="h-14" href={homePath}>
          <img className="h-full" src={logoPath} alt="Logo" />
        </Link>

        <nav className="w-7/12 xl:w-1/2 flex justify-around items-center">
          {/* Links de navegação */}
          <Link
            className={`navbar-font px-4 ${path === "consoles" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`}
            href={consolesPath}
          >
            Consoles
          </Link>

          <Link
            className={`navbar-font px-4 ${path === "games" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`}
            href={gamesPath}
          >
            Jogos
          </Link>

          <Link
  className={`navbar-font px-4 py-2 ${path === "gift" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`}
  href={giftPath}
  style={{ whiteSpace: "nowrap" }}
>
  Gift Card
</Link>





          {/* Links para Sobre e Dúvidas */}
          <Link
            className={`navbar-font px-4 ${path === "sobre" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`}
            href="/sobre"
          >
            Sobre
          </Link>

          <Link
            className={`navbar-font px-4 ${path === "duvidas" ? "text-white bg-orange-500" : "hover:text-white hover:bg-orange-500"} rounded-full`}
            href="/duvidas"
          >
            Dúvidas
          </Link>

          {/* Barra de pesquisa */}
          <div className="flex bg-white xl:w-80 h-8 rounded-full md:w-64">
            <input
              value={searchQuery} // Usando o estado para o valor
              onChange={handleSearchInput} // Atualizando o estado a cada digitação
              onKeyDown={(event) => enter(event)}
              placeholder="Procurar..."
              className="p-1 m-1 ml-2 w-full focus:outline-none"
              type="text"
            />
            <svg
              onClick={search}
              className="mr-4 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </nav>

        <Link href="/shoppingCart" className="flex flex-row">
          <svg
            className="h-9"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {totalList > 0 ? (
            <div className="-translate-y-2 -translate-x-3">
              <p className="px-2 text-white bg-red-500 rounded-full">{totalList}</p>
            </div>
          ) : null}
        </Link>
      </div>

      {/* Menu Mobile */}
      <div className="flex lg:hidden justify-between items-center bg-blue-500 h-20 px-5 sm:px-10">
        {searchIsOpen ? (
          <div className="flex bg-white w-full h-8 rounded-full">
            <input
              value={searchQuery} // Usando o estado para o valor da pesquisa
              onChange={handleSearchInput} // Atualizando o estado
              onKeyDown={(event) => enter(event)}
              placeholder="Procurar..."
              className="p-1 m-1 ml-2 w-full focus:outline-none"
              autoFocus
              type="text"
            />
            <svg
              onClick={search}
              className="m-1 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        ) : (
          <Link className="h-10 sm:h-14" href={homePath}>
            <img className="h-full" src={logoPath} alt="Logo" />
          </Link>
        )}
      </div>

      {/* Menu Mobile Toggle */}
      {menuIsOpen && (
        <div className="absolute w-screen h-fit z-40">
          <div className="flex justify-end mt-px">
            <ul className="flex flex-col w-36 bg-blue-500 ">
              {/* Links do menu */}
              <li><Link href={homePath}>Home</Link></li>
              <li><Link href={consolesPath}>Consoles</Link></li>
              <li><Link href={gamesPath}>Jogos</Link></li>
              <li><Link href={giftPath}>Gift Card</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/duvidas">Dúvidas</Link></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
