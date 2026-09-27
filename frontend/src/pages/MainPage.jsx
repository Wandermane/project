import '../styles/MainPage.css'
import Header from '../components/Header'

import React, { useState, useEffect } from 'react';

function MainPage() {
  // 1) Сначала функциональная часть
  const [posts, setPosts] = useState([]); // хранит состояния компонента,  его изменения на странице
  const [loading, setLoading] = useState(true);

  // Новые состояния для полей формы
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

// 1. функция получения постов
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Ожидаем (await) сам запрос к серверу
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        // Ожидаем (await), пока сырой ответ превратится в JS-массив
        const data = await response.json();
    
        setPosts(data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        // Блок catch заменяет .catch() и ловит любые ошибки
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      }
    };

    // Вызываем функцию 1 
    fetchPosts();
  }, []);

    // 2. функция отправки нового поста (POST) ВНЕ ПРЕДЫДУЩЕГО ХУКА
    const handleCreatePost = async (e) => {
      e.preventDefault(); // Отменяем перезагрузку страницы при отправке формы

    // Простая проверка: если поля пустые — ничего не делаем
    if (!title.trim() || !body.trim()) return;

    // вся логика (шапка запроса в Post: какой http-метод, заголовки и т.д. )
    // тело запроса (какие состояния строк берем и что меняем)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: title, // берем текст из инпута заголовка
          body: body,   // берем текст из инпута описания
          userId: 1,
        }),
      });

      const newPost = await response.json();
      // Добавляем созданный пост в НАЧАЛО текущего списка постов
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      // Очищаем поля формы после успешной отправки
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Не удалось создать пост:', error);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  
  // 2) Затем работа с выводом компонентов, выгружаем туда результат методов
  return (
    <div>
    <Header />
    {/* ФОРМА ДОБАВЛЕНИЯ ПОСТА */}
      <form onSubmit={handleCreatePost} style={{ margin: '20px 0', display: 'flex',
         flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <h3>Создать новый пост</h3>
        <input 
          type="text" 
          placeholder="Заголовок поста" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Текст поста" 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
        />
        <button type="submit">Опубликовать</button>
      </form>

    {/* ПОЛУЧЕНИЕ ПОСТОВ */}
     <h2>Список постов от JSONPlaceholder</h2>
     <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default MainPage
