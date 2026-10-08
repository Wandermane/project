import '../styles/MainPage.css'
import React, { useState, useEffect } from 'react';

import Header from '../components/Header'
import Posts from '../components/Posts';

function MainPage() {
  return (
    <>
      <Header />
      <Posts />
    </>
  );
}
export default MainPage
