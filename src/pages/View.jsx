import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../store/Store'

export default function View() {


  const [item, setItem] = useState(null);


  const params = useParams();
  const store = useAppContext();
  useEffect(() => {
    const book = store.getItem(params.bookId);
    setItem(book);


  }, []);

  const itemStyles = {
    container: {
      display: "flex",
      gap: "20px",
      color: "white",
      width: "800px",
      margin: "0 auto"
    }
  }


  const data = {
    backgroundColor: "#181d27",
    padding: "2px 80px 10px 8px",
    borderRadius: "5px"
  }

  const botton = {
    padding: "10px 20px",
    backgroundColor: "purple",
    border: "none",
    color: "white",
    fontWeight: "bolder",
    fontSize: "15px",
    borderRadius: "5px",


  }

  const itemUpdate = {
    padding: "8px",
    borderRadius: "5px",
    fonSize: "16px",
    margin: "5px 0",
    width: "100%",

  }

  const column = {
    display: "flex",
    flexDirection: "column"
  }

  function Infobook() {

    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditCover, setIsEditCover] = useState(false);
    const [isEditAuthor, setIsEditAuthor] = useState(false);
    const [isEditIntro, setIsEditIntro] = useState(false);
    const [isEditCompleted, setIsEditCompleted] = useState(false);
    const [isEditReview, setIsEditReview] = useState(false);



    const [newTitle, setNewTitle] = useState(item?.title);
    const [newCover, setNewCover] = useState(item?.cover);
    const [newAuthor, setNewAuthor] = useState(item?.author);
    const [newIntro, setNewIntro] = useState(item?.intro);
    const [newComplete, setNewComplete] = useState(false);
    const [newReview, setNewReview] = useState(item?.review);


    function handleedit(e) {
      const itemName = e.target.name;

      switch (itemName) {
        case "title": setIsEditTitle(true)
          break;
        case "cover": setIsEditCover(true)
          break;
        case "author": setIsEditAuthor(true)
          break;
        case "intro": setIsEditIntro(true)
          break;
        case "completed": setIsEditCompleted(true)
          break;
        case "review": setIsEditReview(true)
          break;


        default:
          break;
      }

    }

    function handleChangeFile(e) {
      const element = e.target
      const file = element.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function () {
        setNewCover(reader.result.toString())
      }
    }
    function handleChange(e) {
      const value = e.target.value
      const nameInput = e.target.name
      switch (nameInput) {

        case 'title': setNewTitle(value)
          break;
        case 'autor': setNewAuthor(value)
          break;
        case 'intro': setNewIntro(value)
          break;
        case 'completed': setNewComplete(value)
          break;
        case 'review': setNewReview(value)
          break;

        default:
          break;
      }

      if (e.target.name === 'title') {
        const value = e.target.value
        setNewTitle(value)
      }
      if (e.target.name === 'author') {
        const value = e.target.value
        setNewAuthor(value)
      }
      if (e.target.name === 'intro') {
        const value = e.target.value
        setNewIntro(value)
      }
      if (e.target.name === 'complete') {
        const value = e.target.value
        setNewComplete(value)
      }
      if (e.target.name === 'review') {
        const value = e.target.value
        setNewReview(value)
      }
    }

    function handleSubmit(e) {
      const nameInput = e.target.name
      e.preventDefault()

      if (e.target.name === 'title') {
        store.updateItem(item?.id, newTitle, nameInput)
        setIsEditTitle(false)
      }
      if (e.target.name === 'cover') {
        store.updateItem(item?.id, newCover, nameInput)
        setIsEditCover(false)
      }
      if (e.target.name === 'author') {
        store.updateItem(item?.id, newAuthor, nameInput)
        setIsEditAuthor(false)
      }
      if (e.target.name === 'intro') {
        store.updateItem(item?.id, newIntro, nameInput)
        setIsEditIntro(false)
      }
      if (e.target.name === 'completed') {
        store.updateItem(item?.id, newComplete, nameInput)
        setIsEditCompleted(false)
      }
      if (e.target.name === 'review') {
        store.updateItem(item?.id, newReview, nameInput)
        setIsEditReview(false)
      }
    }
    return (
      <div style={itemStyles.container}>

        {isEditCover ?
          <div>
            <form style={column} name='cover' onSubmit={handleSubmit}>

              <input
                type="file"
                name='cover'
                onChange={handleChangeFile}
                style={botton}
              />
              <div>
                <>
                  <img src={newCover} width="100" alt='preview'></img>
                  <input style={botton} type="submit" value={`Update Cover`} ></input>
                </>

              </div>
            </form>
          </div> :

          <div>
            <div>{item?.cover ? <img src={item.cover} width="400" alt="cover" /> : ""} </div>
            <button name='cover' style={botton} onClick={handleedit} >Edit </button>
          </div>

        }

        <div>
          <div style={data}>
            {

              isEditTitle ?
                <form name='title' onSubmit={handleSubmit}>
                  <input style={itemUpdate} name='title' onChange={handleChange} type="text" value={newTitle} ></input>
                  <input style={botton} type="submit" value={`Update Title`} ></input>
                </form> :
                <div >
                  <h3>Title</h3>
                  <h2>{item?.title}</h2>
                  <button style={botton} name='title' onClick={handleedit} >Edit</button>
                </div>
            }
          </div>
          <div style={data}>
            {isEditAuthor ?
              <form name='author' onSubmit={handleSubmit}>
                <input style={itemUpdate} name='author' onChange={handleChange} type="text" value={newAuthor} ></input>
                <input style={botton} type="submit" value={`Update Author`}></input>
              </form> :
              <>
                <h2>{item?.author}</h2>
                <button style={botton} name='author' onClick={handleedit} >Edit</button>
              </>
            }
          </div>
          <div style={data}>
            {isEditCompleted ?
              <form name='completed' onSubmit={handleSubmit}>
                <input style={itemUpdate} name='completed' onChange={handleChange} type="checkbox" value={newComplete} ></input>
                <input style={botton} type="submit" value={`Update Completed`} ></input>
              </form> :
              <>
                <h2>{item?.completed ? "Leido" : "Por terminar"}</h2>
                <button style={botton} name='completed' onClick={handleedit} >Edit</button>
              </>
            }
          </div>
          <div style={data}>
            {isEditIntro ?
              <form name='intro' onSubmit={handleSubmit}>
                <input style={itemUpdate} name='intro' onChange={handleChange} type="text" value={newIntro} ></input>
                <input style={botton} type="submit" value={`Update Intro`} ></input>
              </form> :
              <>
                <h2>{item?.intro}</h2>
                <button style={botton} name='intro' onClick={handleedit} >Edit</button>
              </>
            }
          </div>
          <div style={data}>
            {isEditReview ?
              <form name='review' onSubmit={handleSubmit}>
                <input style={itemUpdate} name='review' onChange={handleChange} type="text" value={newReview} ></input>
                <input style={botton} type="submit" value={`Update Review`}></input>
              </form> :
              <>
                <h2>{item?.review}</h2>
                <button style={botton} name='review' onClick={handleedit} >Edit</button>
              </>
            }
          </div>

        </div>
      </div> // contenedor
    )
  }

  if (!item) {
    return <Layout>Item not found</Layout>
  }
  return (
    <Layout>
      <Infobook />
    </Layout>
  )
}
