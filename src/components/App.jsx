import { Route, Routes } from 'react-router-dom';
import { Chat } from './Chat/Chat';
// import { ChatsLayout } from './ChatsLayout/ChatsLayout';

import { Layout } from './Layout/Layout';

// Chat App
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route path="login" element={<Chat />}>
        {/* <Route path="users" element={<ChatsLayout />}>
          <Route path=":userId" element={<div>UserMessage</div>}></Route>
        </Route> */}
      </Route>
    </Routes>
  );
};
