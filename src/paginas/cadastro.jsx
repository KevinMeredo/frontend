import { Form, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {registerUser} from '../services/user-service'
import { useNavigate } from 'react-router-dom';

export function Cadastro(){
    
    const { handleSubmit, register, formState: { errors } } = useForm({mode: 'onChange'});
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
        return data.getFullYear()
    }
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
                                isInvalid={errors.fullName}
                                isValid={!errors.fullName}
                                required
                                placeholder="Insira seu nome completo"
                                {...register('nome', {
                                    required: 'Nome Completo é obrigatório'
                                })}
                            />
                            {errors.fullName && <Form.Control.Feedback type="invalid">{errors.fullName.message}</Form.Control.Feedback>}
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
                                    required: 'CPF é obrigatório'
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
                                isInvalid={errors.date}
                                isValid={!errors.date}
                                placeholder="Insira sua data de nascimento"
                                {...register('nascimento', {
                                    required: {
                                        value: true,
                                        message: 'Data de nascimento é obrigatória'
                                    },  
                                    max: {
                                        value: getMinDate(),
                                        message: "Idade minima: 18 anos"
                                    } 
                                })}
                            />
                            
                            {errors.date && <Form.Control.Feedback type="invalid">{errors.date.message}</Form.Control.Feedback>}
                            
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="text"
                                name="senha"
                                id="senha"
                                isInvalid={errors.senha}
                                isValid={!errors.senha}
                                required
                                placeholder="Insira sua senha"
                                {...register('senha', {
                                    required: 'Senha é obrigatória'
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
    