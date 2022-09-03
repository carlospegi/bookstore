import React, { useState } from 'react'
import { useAppContext } from '../store/Store';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const [title, setTitle] = useState("");
    const [author, settAuthor] = useState("");
    const [cover, setCover] = useState("");
    const [intro, setIntro] = useState("");
    const [completed, setCompleted] = useState(false);
    const [review, setReview] = useState("");

    const navigate = useNavigate()
    const store = useAppContext()


    const inputStyles = {
        formContainer: {
            width: "400px",
            margin: "0 auto"
        },
        container: {
            display: "flex",
            flexDirection: "column",
            gap: '5px',
            margin: "15px 0"
        },
        title: {
            fontSize: "16px",
            textAlign: "left",
            color: "white"
        },
        input: {
            padding: "10px",
            borderRadius: "5px",
            fonSize: "16px"
        },
    }
    const buttonStyle = {
        padding: "15px 20px",
        minWidth: "200px",
        border: "none",
        borderRadius: "5px",
        color: "white",
        fonWeight: "bolder",
        fontSize: "18px",
        backgroundColor: "green"
    }

    function handleChangeFile(e) {
        const element = e.target
        const file = element.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            setCover(reader.result.toString())
        }

    }

    function handleSubmit(e) {
        e.preventDefault()

        const newBook = {
            id: crypto.randomUUID(),
            title,
            author,
            cover,
            intro,
            completed,
            review



        }
        // TODO: mandar registrar libro
        store.createItem(newBook)
        navigate('/')
    }


    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value




        switch (name) {
            case "title": setTitle(value)
                break;
            case "author": settAuthor(value)
                break;
            case "cover": setCover(value)
                break;
            case "intro": setIntro(value)
                break;
            case "review": setReview(value)
                break;
            case "completed": setCompleted(e.target.value)
                break;
            default:
        }
    }



    return (
        <Layout>
            <form onSubmit={handleSubmit} style={inputStyles.formContainer} >
                <div style={inputStyles.container}>
                    <div style={inputStyles.title}>Title</div>
                    <input
                        type="text"
                        name='title'
                        onChange={handleChange}
                        value={title}
                        style={inputStyles.input}
                    ></input>
                </div>
                <div style={inputStyles.container}>
                    <div style={inputStyles.title}>Author</div>
                    <input
                        type="text"
                        name='author'
                        onChange={handleChange}
                        value={author}
                        style={inputStyles.input}
                    ></input>
                </div>
                <div style={inputStyles.container}>
                    <div style={inputStyles.title}>Cover</div>
                    <input
                        type="file"
                        name='cover'
                        onChange={handleChangeFile}
                        style={inputStyles.input}
                    />
                    <div>{
                        cover ? <img src={cover} width="100" alt='preview'></img> : ""
                    } </div>
                </div>
                <div style={inputStyles.container}>
                    <div style={inputStyles.title}>Intro</div>
                    <input
                        type="text"
                        name='intro'
                        onChange={handleChange}
                        value={intro}
                        style={inputStyles.input}
                    ></input>
                </div>

                <div>
                    <div style={inputStyles.title}>Completed</div>
                    <input
                        type="checkbox"
                        name='completed'
                        onChange={handleChange}
                        value={completed}
                    ></input>
                </div>
                <div style={inputStyles.container}>
                    <div style={inputStyles.title}>Review</div>
                    <input
                        type="text"
                        name='review'
                        onChange={handleChange}
                        value={review}
                        style={inputStyles.input}
                    ></input>
                </div>
                <input type="submit" value="Register Book" style={buttonStyle} ></input>
            </form>
        </Layout>
    )
}
