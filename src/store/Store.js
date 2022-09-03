import { createContext, useContext, useState } from "react"

const AppContext = createContext({
    items: [],
})

export default function Store({ children }) {

    const [items, setItems] = useState([]);

    function createItem(item) {
        const temp = [...items]
        temp.push(item)
        setItems(temp)
    }
    function getItem(id) {
        const item = items.find(item => item.id === id)
        return item
    }
    function updateItem(id, value, nameInput) {
        const temp = [...items]
        const item = temp.find(item => item.id === id)
        switch (nameInput) {
            case "title": item.title = value
                break;
            case "author": item.author = value
                break;
            case "intro": item.intro = value
                break;
            case "completed": item.completed = value
                break;
            case "review": item.review = value
                break;
            case "cover": item.cover = value
                break;
            default:
                break;
        }
        item.nameInput = value  //TODO:    c/u  
        setItems(temp)

        /*   const index  = item.findIndex((i)=> i.id === item.id) 
          const temp = [...items]
          temp[index] = {...item} */

    }

    return (
        <div>
            {/*  {children} */}
            <AppContext.Provider value={
                {
                    items,
                    createItem,
                    getItem,
                    updateItem
                }
            }>
                {children}
            </AppContext.Provider>
        </div>
    )
}
export function useAppContext() {
    return useContext(AppContext)
}