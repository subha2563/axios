import axios from 'axios';
import React, { useEffect, useState } from 'react'

// MOCK API URL
const API_URL = "https://jsonplaceholder.typicode.com/comments"

function Comments() {
    // state to store the data from url
    const [comments, setComments] = useState([]);

    // state to store input values
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')

    // state to store edit comment id
    const [editId, setEditId] = useState(null)

    // useEffect runs when the component is reloaded
    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setComments(res.data.slice(0, 3));
            })
            .catch(err => console.log(err))
    }, []);

    // ADD COMMENT (mock)
    const addComment = () => {
        if (name.trim() === '' || email.trim() === '' || body.trim() === '') {
            alert("Fields should not be empty!")
            return
        }

        axios.post(API_URL, {
            name,
            email,
            body,
            postId: 1
        })
        .then(() => {
            const newComment = {
                id: comments.length + 1, // Simple mock ID generation
                name,
                email,
                body
            }
            setComments([...comments, newComment])
            setName('')
            setEmail('')
            setBody('')
            alert("Comment added successfully!")
        })
        .catch(err => console.log(err))
    }

    // START EDIT
    const startEdit = (comment) => {
        setEditId(comment.id)
        setName(comment.name)
        setEmail(comment.email)
        setBody(comment.body)
    }

    // UPDATE COMMENT (mock)
    const updateComment = () => {
        if (name.trim() === '' || email.trim() === '' || body.trim() === '') {
            alert("Fields should not be empty!")
            return
        }

        axios.patch(`${API_URL}/${editId}`, {
            name,
            email,
            body
        })
        .then(() => {
            const updatedComments = comments.map(comment =>
                comment.id === editId
                    ? { ...comment, name, email, body }
                    : comment
            )

            setComments(updatedComments)
            setEditId(null)
            setName('')
            setEmail('')
            setBody('')
            alert("Comment updated successfully!")
        })
        .catch(err => console.log(err))
    }

    // DELETE COMMENT (mock)
    const deleteComment = (id) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return

        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                const filteredComments = comments.filter(comment => comment.id !== id)
                setComments(filteredComments)
                alert("Comment deleted successfully!")
            })
            .catch(err => console.log(err))
    }

    // CANCEL EDIT
    const cancelEdit = () => {
        setEditId(null)
        setName('')
        setEmail('')
        setBody('')
    }

    return (
        <div>
            <h3>Comments List</h3>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>BODY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.id}>
                            <td>{comment.id}</td>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.body}</td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => startEdit(comment)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteComment(comment.id)}
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
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                        onClick={updateComment}
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
                                    onClick={addComment}
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

export default Comments
