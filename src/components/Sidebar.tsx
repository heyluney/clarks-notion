import "./Sidebar.css"

import { Link } from "react-router"
import {  } from "react"
import { PageContext } from "../App"
import useCustomContext from '../backend/hooks/useContext';

import { retrievePages } from "../backend/database/database"

const SideBar = () => {
    // have a function that 
    const { database } = useCustomContext(PageContext);
    // it errors out in app because database could theoretically be null
    return (
        <div className="sidebar">
            {database && retrievePages(database).map(page => 
                <Link to={`/clarks-notion/pages/${page.id}`} key={page.id}>
                <div >
                    {page.title}
                </div>
                </Link>
            )}
        </div>
    )
}

export default SideBar;