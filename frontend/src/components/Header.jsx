// src/components/Header.jsx
function Header() {
  return (
    <header style={{
      backgroundColor: '#2c3e50',
      padding: '20px',
      color: 'white',
      textAlign: 'center'
    }}>
      <h1>Мой сайт-визитка</h1>
      <nav>
        <a href="#" style={{ color: 'white', margin: '0 10px' }}>Главная</a>
        <a href="#" style={{ color: 'white', margin: '0 10px' }}>Обо мне</a>
        <a href="#" style={{ color: 'white', margin: '0 10px' }}>Портфолио</a>
      </nav>
    </header>
  )
}

export default Header