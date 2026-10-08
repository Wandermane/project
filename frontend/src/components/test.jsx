useEffect(() => {
  const timer = setInterval(() => {
    console.log('Тик-так');
  }, 1000);

  // Функция очистки (сработает, когда компонент удалится с экрана)
  return () => clearInterval(timer);
}, []); // [] означает, что таймер создастся только один раз
