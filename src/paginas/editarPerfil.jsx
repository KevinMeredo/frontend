import { Form, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { deleteUser, getUser, updateUser } from '../services/user-service'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Nav } from '../componentes/Nav';
import ModalConfirmacao from '../componentes/ModalConfirmacao'

export function EditarPerfil() {

    const [dados, setDados] = useState({})
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            console.log(dados)
            await updateUser(dados);
            navigate('/Painel');
        } catch (error) {
            console.log(error)
        }
    };
    let CPFFlag = false
    let nascimentoFlag = false
    const mudaDado = (valor, chave) => {
        console.log(dados, chave, valor)
        let novoDado = dados
        novoDado[chave] = valor
        setDados(novoDado)
        if (chave === 'nascimento') nascimentoFlag = true
        if (chave === 'CPF') CPFFlag = true
    }
    async function findUser() {
        try {
            const user = await getUser()
            delete user.data.senha
            setDados(user.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function removeUser(id) {
        try {
            await deleteUser(id);
            navigate('/')

        } catch (error) {
            console.error(error);
        }
    }
    const getMinDate = () => {
        let data = new Date()
        data.setFullYear(data.getFullYear() - 18)
        console.log(data.getFullYear())

        return data
    }
    function VerificaCPF(CPF) {

        var soma;
        var resto;
        soma = 0;
        if (CPF === "00000000000") {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);
        }

        resto = soma % 11;

        if (resto === 10 || resto === 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }

        if (resto !== parseInt(CPF.substring(9, 10))) {
            return false;
        }

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
        }
        resto = soma % 11;

        if (resto === 10 || resto === 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }

        if (resto !== parseInt(CPF.substring(10, 11))) {
            return false;
        }

        return true;
    }
    const eAdulto = (data) => {
        const currentDate = new Date(data).getTime()
        const minDate = getMinDate().getTime()
        console.log(currentDate)
        console.log(minDate)
        console.log(currentDate < minDate)
        return currentDate < minDate
    }

    useEffect(() => {
        findUser()
        console.log(errors)
    }, [errors])

    return (

        <div className='d-flex justify-content-center '>
            <Nav></Nav>
            <div className='login-registro-card'>
                <Form className=' form-container p-5 card mw-800px ' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <h1>Editar Perfil</h1>
                        </Col>

                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                id="nome"
                                defaultValue={dados.nome}
                                isInvalid={errors.nome}
                                isValid={!errors.nome}
                                placeholder="Insira seu nome completo"
                                {...register('nome', {
                                    onChange: (e) => { mudaDado(e.target.value, e.target.name) },
                                    pattern: {
                                        value: /^[a-zA-Z ]+$/,
                                        message: 'Use apenas Letras'
                                    }
                                })}
                            />
                            {errors.nome && <Form.Control.Feedback type="invalid">{errors.nome.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                name="CPF"
                                id="CPF"
                                defaultValue={dados.CPF}
                                isInvalid={errors.CPF}
                                isValid={!errors.CPF}
                                placeholder="Insira seu CPF"
                                {...register('CPF', {
                                    onChange: (e) => { mudaDado(e.target.value, e.target.name) },
                                    pattern: {
                                        value: /[0-9]{11}/,
                                        message: 'Escreva os 11 números do CPF (apenas os números)'
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: "CPF invalido"
                                    },
                                    validate: value => {
                                        if (CPFFlag) {
                                            console.log(VerificaCPF(value) || "ERRO")
                                            return VerificaCPF(value) || 'CPF invalido!'
                                        }

                                    }
                                })}
                            />
                            {errors.CPF && <Form.Control.Feedback type="invalid">{errors.CPF.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className='coluna60 mb-3'>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                id="email"
                                isInvalid={errors.email}
                                isValid={!errors.email}
                                defaultValue={dados.email}
                                placeholder="Insira seu e-mail"
                                {...register('email', {
                                    onChange: (e) => { mudaDado(e.target.value, e.target.name) },
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'E-mail inválido'
                                    }
                                })}
                            />
                            {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group className='coluna40 mb-3 '>
                            <Form.Label className='reticencias'>Data de Nascimento</Form.Label>
                            <Form.Control
                                type='date'
                                name="nascimento"
                                id="nascimento"
                                min={getMinDate()}
                                isInvalid={errors.nascimento}
                                isValid={!errors.nascimento}
                                defaultValue={dados.nascimento}
                                placeholder="Insira sua data de nascimento"
                                {...register('nascimento', {
                                    onChange: (e) => { mudaDado(e.target.value, e.target.name) },
                                    validate: value => {
                                        if (nascimentoFlag) {
                                            console.log(eAdulto(value) || "ERRO")
                                            return eAdulto(value) || 'O usuário deve ter mais de 18 anos!'
                                        }

                                    },
                                })}
                            />

                            {errors.nascimento && <Form.Control.Feedback type="invalid">{errors.nascimento.message}</Form.Control.Feedback>}

                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Nova Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="senha"
                                id="senha"
                                isInvalid={errors.senha}
                                isValid={!errors.senha}
                                placeholder="Insira sua senha"
                                {...register('senha', {
                                    onChange: (e) => { mudaDado(e.target.value, e.target.name) },
                                    minLength: {
                                        value: 6,
                                        message: "A senha deve ter no mínimo 6 caracteres"
                                    }
                                })}
                            />
                            {errors.senha && <Form.Control.Feedback type="invalid">{errors.senha.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row className=' display-flex justify-content-center align-items-center  w-100'>
                        <Button className='w-50 position' type="submit">Cadastrar</Button>
                        <ModalConfirmacao texto='deletar' funcao={async () => removeUser()} />
                    </Row>

                </Form>
            </div>
        </div>
    );
}
