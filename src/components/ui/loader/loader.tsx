import './loader.scss'

function Loader() {

  return (
    <>
    <section className='loader'>
      <svg
        role="img"
        className="loader__spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="40"
        height="40"
      >
        <circle cx="50" cy="50" r="48" fill="#ED5564" stroke="#000" strokeWidth="4"/>
        <path d="M2 50h96" stroke="#000" strokeWidth="4"/>
        <circle cx="50" cy="50" r="16" fill="#fff" stroke="#000" strokeWidth="4"/>
      </svg>
      <span>Cargando...</span>
    </section>
    </>
  )
}

export default Loader