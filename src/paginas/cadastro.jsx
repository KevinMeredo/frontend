import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './styles.css';

export function Cadastro(){
    
    const { handleSubmit, register, formState: { errors } } = useForm({mode: 'onChange'});

    const onSubmit = (data) => {
        console.log(data);
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
                          <p>Tem uma conta? <a href='/Login'>Entrar</a></p>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                id="fullName"
                                isInvalid={errors.fullName}
                                isValid={!errors.fullName}
                                required
                                placeholder="Insira seu nome completo"
                                {...register('fullName', {
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
                                name="date"
                                id="date"
                                required
                                isInvalid={errors.date}
                                isValid={!errors.date}
                                placeholder="Insira sua data de nascimento"
                                {...register('date', {
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
                    <Form.Group as={Col} className="mb-5">
                        <Form.Check type="checkbox" label="Condordo com os termos de serviço." 
                        name="checkbox"
                        id="checkbox"
                        defaultChecked 
                        {...register('checkbox', {
                          required: {
                              value: true,
                              message: 'Concorde para registrar-se'
                          },
                      })}
                        />
                    </Form.Group>
                    <Row className=' display-flex justify-content-center align-items-center w-100'>
                      <Button className='w-50 position' type="submit">Cadastrar</Button>
                    </Row>
                    
                </Form>
            </div>
        </div>
    );
}  
    