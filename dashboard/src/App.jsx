import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Components';
import { Home,Login,NotFound,UpdatePosts,CreatePost,GetAllPost,Posts,Comments,Categories,UpdateCategory,CreateCategory,GetAllCategories,Users,UpdateUser,GetAllUsers} from './Pages';

const App = () => {
  return (
    <Routes>
      {/* Wrap all routes with the Layout component */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* Home route */}
        <Route path="/login" element={<Login />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/posts" element={<Posts />}>
          <Route path="" element={<GetAllPost />} /> {/* Matches /posts */}
          <Route path="create" element={<CreatePost />} /> {/* Matches /posts/create */}
          <Route path=":id" element={<UpdatePosts />} /> {/* Matches /posts/:id */}
        </Route>
        <Route path="/categories" element={<Categories />}>
          <Route path="" element={<GetAllCategories />} /> {/* Matches /posts */}
          <Route path="create" element={<CreateCategory />} /> {/* Matches /posts/create */}
          <Route path=":id" element={<UpdateCategory />} /> {/* Matches /posts/:id */}
        </Route>
        <Route path="/users" element={<Users />}>
          <Route path="" element={<GetAllUsers />} /> {/* Matches /posts */}
          <Route path=":id" element={<UpdateUser />} /> {/* Matches /posts/:id */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;