import { Form, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css'
import { loginUser } from '../services/user-service';
import { useNavigate } from 'react-router-dom';

export function Login(){
    
    const { handleSubmit, register, formState: { errors } } = useForm({mode: 'onChange'});

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await loginUser(data);
            navigate('/Painel');
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
    return (
        <div className='d-flex justify-content-center '>
            <div className='login-registro-card'>
                <Form className=' form-container p-5 card mw-800px ' noValidate validated={!errors} onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            Seja bem-vindo!
                            <Row> 
                                <Col> <h1>Login</h1> </Col>
                            </Row>
                        </Col>        
                        <Col className='w-auto' >
                          <p >Sem registro? <a href='/Cadastro'>Registre-se</a></p>
                        </Col>       
                    </Row>
                    
                    <Row>
                        <Form.Group as={Col} sm className='mb-4'>
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
                                    }
                                })}
                            />
                            {errors.CPF && <Form.Control.Feedback type="invalid">{errors.CPF.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-4'>
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
                                    required: 'Senha é obrigatória'
                                })}
                            />
                            {errors.senha && <Form.Control.Feedback type="invalid">{errors.senha.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row className=' display-flex justify-content-center align-items-center w-100'>
                      <Button className='w-50 position' type="submit">Entrar</Button>
                    </Row>
                    
                </Form>
            </div>
        </div>
    );
}  
    