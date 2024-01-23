import React, { useEffect, useState } from 'react';

const App = () => {

    const [urlAPI] = useState("http://localhost:3001")

    const [users, setUsers] = useState(null)

    const [name, setName] = useState("");

    useEffect(() => {
        getUsersAsync()
    }, [])

    const getUsers = () => {
        const url = `${urlAPI}/users`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((responseJson) => {
                console.log(responseJson)
                setUsers(responseJson)
            })
            .catch((error) => {
                console.log(error.message)
            })

        console.log("Hola")

    }


    const getUsersAsync = async () => {
        try {
            const url = `${urlAPI}/users`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await fetch(url, options)
            const responseJson = await response.json()
            console.log(responseJson)

            setUsers(responseJson)

        } catch (error) {
            console.log(error.message)
        }
    }

    /* 
    async function prueba(){

    } 
    */

    const createUser = async (name) => {
        try {
            const raw = JSON.stringify({ name: name })
            const url = `${urlAPI}/users`;
            const options = {
                method: 'POST',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await fetch(url, options)

            const data = await response.json()

            /* if(data.id){
                getUsersAsync()
            } */
            if (data.id) {
                setUsers(prevState => {
                    return [...prevState, data]
                })
            }
            //console.log(data)
            setName("")

        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteUser = async (id) => {
        try {

            const url = `${urlAPI}/users/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await fetch(url, options)

            if (response.ok) getUsersAsync()

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            <h1>REACT APP</h1>
            <ul>
                {
                    !!users && Array.isArray(users) && users.length > 0 &&
                    users.map(({ id, name }) => {
                        return <li key={id} onClick={() => deleteUser(id)}>{name}</li>
                    })
                }
            </ul>

            <div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => {
                    if (name !== "") createUser(name)
                }}>Agregar</button>
            </div>
        </>
    )
}

export default App;