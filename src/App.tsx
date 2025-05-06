import './App.css'

import { useState, createContext } from 'react';

import { seedDatabase } from './backend/database/seeded_database';

import { createComponent } from './backend/component/component';
import { ComponentEnum as CE } from './backend/component/component_type';
import { Database } from './backend/database/database_type';
import SideBar from './components/Sidebar';

const App = () => {
  const [database, updateDatabase] = useState<Database>(() => {
      const db = localStorage.getItem("database");
      if (db === undefined) seedDatabase();
      return JSON.parse(db as string);
    });

    // context to move this to 
  console.log('database', database);
  return (   
    <PageContext.Provider value={{
      database, updateDatabase
    }}>
      <div className="app">
        <SideBar />
        This is the app!
      </div>
    </PageContext.Provider>
  )
}

export const PageContext = createContext();

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