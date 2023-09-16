import { api } from "./api";

export async function getMedicos() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/medicos', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteMedico(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/medico/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateMedico(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/medico/${data.id}`, {
        nome: data.nome,
        email: data.email,
        CPF: data.CPF,
        nascimento: data.nascimento,
        CRM: data.CRM,
        naturalidade: data.naturalidade
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createMedico(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/medico', {
        CPF_Paciente: data.CPF_Paciente,
        CRM_Medico: data.CRM_Medico,
        tipo: data.tipo,
        status: data.status,
        urgencia: data.urgencia,
        observação: data.observação,
        dia: data.dia
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
