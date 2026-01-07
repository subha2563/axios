import React, { useEffect, useState } from 'react'
import axios from 'axios'

// MOCK API URL
const API_URL = "https://jsonplaceholder.typicode.com/posts"

function Post() {

    // state to store posts data
    const [posts, setPosts] = useState([])

    // state to store input values
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    // state to store edit post id
    const [editId, setEditId] = useState(null)

    // fetch posts when component loads
    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setPosts(res.data.slice(0, 3))
            })
            .catch(err => console.log(err))
    }, [])

    // ADD POST (mock)
    const addPost = () => {
        if (title.trim() === '' || body.trim() === '') {
            alert("Fields should not be empty!")
            return
        }

        axios.post(API_URL, {
            title,
            body,
            userId: 1
        })

        const newPost = {
            id: posts.length + 1,
            title,
            body
        }

        setPosts([...posts, newPost])
        setTitle('')
        setBody('')
        alert("Post added successfully!")
    }

    // START EDIT
    const startEdit = (post) => {
        setEditId(post.id)
        setTitle(post.title)
        setBody(post.body)
    }

    // UPDATE POST (mock)
    const updatePost = () => {
        if (title.trim() === '' || body.trim() === '') {
            alert("Fields should not be empty!")
            return
        }

        axios.patch(`${API_URL}/${editId}`, {
            title,
            body
        })
        .then(() => {
            const updatedPosts = posts.map(post =>
                post.id === editId
                    ? { ...post, title, body }
                    : post
            )

            setPosts(updatedPosts)
            setEditId(null)
            setTitle('')
            setBody('')
            alert("Post updated successfully!")
        })
    }

    // DELETE POST (mock)
    const deletePost = (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return

        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                const filteredPosts = posts.filter(post => post.id !== id)
                setPosts(filteredPosts)
                alert("Post deleted successfully!")
            })
    }

    // CANCEL EDIT
    const cancelEdit = () => {
        setEditId(null)
        setTitle('')
        setBody('')
    }

    return (
        <div>
            <h3>Post List</h3>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>BODY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>

                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => startEdit(post)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deletePost(post.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                className="form-control"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                placeholder="Enter Body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </td>
                        <td>
                            {editId ? (
                                <>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={updatePost}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={addPost}
                                >
                                    Add
                                </button>
                            )}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Post
