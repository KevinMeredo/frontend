import { Form, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { registerUser } from '../services/user-service'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Cadastro() {

    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            navigate('/Painel');
        } catch (error) {
            console.log(error.response.data.error)
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
        console.log(errors)
    }, [errors])

    return (
        <div className='d-flex justify-content-center '>
            <div className='login-registro-card'>
                <Form className=' form-container p-5 card mw-800px ' noValidate validated={!errors} onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <h1>Registrar</h1>
                        </Col>
                        <Col>
                            <p>Tem uma conta? <a href='/'>Entrar</a></p>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                id="nome"
                                isInvalid={errors.nome}
                                isValid={!errors.nome}
                                required
                                placeholder="Insira seu nome completo"
                                {...register('nome', {
                                    required: 'Nome Completo é obrigatório',
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
                                isInvalid={errors.CPF}
                                isValid={!errors.CPF}
                                required
                                placeholder="Insira seu CPF"
                                {...register('CPF', {
                                    required: 'CPF é obrigatório',
                                    pattern: {
                                        value: /[0-9]{11}/,
                                        message: 'Escreva os 11 números do CPF (apenas os números)'
                                    },
                                    maxLength:{
                                        value: 11,
                                        message: "CPF invalido"
                                    },
                                    validate:  value => {
                                        console.log(VerificaCPF(value) || "ERRO")
                                        return VerificaCPF(value) || 'CPF invalido!'
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
                                required
                                isInvalid={errors.email}
                                isValid={!errors.email}
                                placeholder="Insira seu e-mail"
                                {...register('email', {
                                    required: 'E-mail é obrigatório',
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
                                required
                                min={getMinDate()}
                                isInvalid={errors.nascimento}
                                isValid={!errors.nascimento}
                                placeholder="Insira sua data de nascimento"
                                {...register('nascimento', {
                                    validate: value => {
                                        console.log(eAdulto(value) || "ERRO")
                                        return eAdulto(value) || 'O usuário deve ter mais de 18 anos!'
                                    },
                                    required: 'Data de nascimento é obrigatória',
                                })}
                            />

                            {errors.nascimento && <Form.Control.Feedback type="invalid">{errors.nascimento.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="senha"
                                id="senha"
                                isInvalid={errors.senha}
                                isValid={!errors.senha}
                                required
                                placeholder="Insira sua senha"
                                {...register('senha', {
                                    required: 'Senha é obrigatória',
                                    minLength: {
                                        value: 6,
                                        message: "A senha deve ter no mínimo 6 caracteres"
                                    }
                                })}
                            />
                            {errors.senha && <Form.Control.Feedback type="invalid">{errors.senha.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row className=' display-flex justify-content-center align-items-center w-100'>
                        <Button className='w-50 position' type="submit">Cadastrar</Button>
                    </Row>

                </Form>
            </div>
        </div>
    );
}
