import { api } from "./api";

export async function getPacientes() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/pacientes', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getByCPF(CPF) {
    if(!CPF) CPF=0
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/paciente/${CPF}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deletePaciente(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/paciente/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updatePaciente(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/paciente/${data.id}`, {
        nome: data.nome,
        email: data.email,
        CPF: data.CPF,
        nascimento: data.nascimento,
        RG: data.RG,
        naturalidade: data.naturalidade
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createPaciente(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/paciente', {
        nome: data.nome,
        email: data.email,
        CPF: data.CPF,
        nascimento: data.nascimento,
        RG: data.RG,
        naturalidade: data.naturalidade
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
