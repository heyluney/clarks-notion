import './App.css'

import { useState, createContext, Dispatch, SetStateAction } from 'react';

import { seedDatabase } from './backend/database/seeded_database';

import { createComponent } from './backend/component/component';
import { ComponentEnum as CE } from './backend/component/component_type';
import { Database } from './backend/database/database_type';
import SideBar from './components/Sidebar';
import { retrievePages } from './backend/database/database';
import { PageComponent } from './backend/component/component_type';
import Page from './components/Page';
import { Routes, Route } from 'react-router';
import Error from './Error';
type PageContextType = {
  database: Database,
  updateDatabase: Dispatch<SetStateAction<Database>>
};

const App = () => {
  const [database, updateDatabase] = useState<Database>(() => {
      const db = localStorage.getItem("database");
      if (db === undefined) seedDatabase();
      return JSON.parse(db as string);
    });


  console.log('database', database);
  return (   
    <PageContext.Provider value={{
      database: database, 
      updateDatabase: updateDatabase
    }}>
      <div className="app">
        app
        <SideBar />
        <Routes>
          <Route key="clark" path="/clarks-notion/error" element={<Error/>} />
          <Route key="clark2" path="/clarks-notion/pages/1" element={<Page page={retrievePages(database)[0]}/>} />

        </Routes>
      </div>
    </PageContext.Provider>
  )
}


          // {database && retrievePages(database).map(page =>
          //   <Route
          //     key={page.id}
          //     path={`/clarks-notion/pages/${page.id}`} 
          //     element={<Page page={page}/>}
          //   />
          // )}


export const PageContext = createContext<PageContextType | undefined>(undefined);

export default App;

// onClick={() => {
//   const component = createComponent(
//     CE.Page, 
//     0,
//     { title: "This is unusual!!",
//       emoji: "clark"
//     }); // create the component

//   updateDatabase(database => {
//     return {...database, [component.id]: component}
//   })
// }}