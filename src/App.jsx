import { useEffect, useState } from 'react'
import './App.css'
import { router } from './rout/router';
import { RouterProvider } from 'react-router';
import { PostsProvider } from './context/PostsContext';

function App() {
  return (
      <PostsProvider>
            <RouterProvider router={router} />
      </PostsProvider>
  )
}

export default App
