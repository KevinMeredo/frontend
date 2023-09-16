import { api } from "./api";

export async function getConsultas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/consultas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteConsulta(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/consulta/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateConsulta(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/consulta/${data.id}`, {
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

export async function createConsulta(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/consulta', {
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
