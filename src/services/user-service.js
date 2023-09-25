import { api } from './api'

export async function registerUser(data) {
    const result = await api.post('/register', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function loginUser(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}


export async function getUser() {
    const accessToken = sessionStorage.getItem('token');
    
    console.log(JSON.parse(accessToken))
    const result = await api.get('/user',{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result)
    return result;
}
export async function updateUser(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/user/${data.id}`, {
        nome: data.nome,
        email: data.email,
        CPF: data.CPF,
        nascimento: data.nascimento,
        senha: data.senha,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
export async function deleteUser() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/user`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    console.log(result)
    return result;
}