import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import FormEdit from './FormEdit';


export default function Buscar(props) {
    const [valorColuna, setValorColuna] = React.useState('')
    let entidade
    async function executaFuncao() {
        try {
            if (props.noData) {
                entidade = await props.funcao(valorColuna)
                console.log(entidade)
                return(entidade)
            } else {
                entidade = await props.funcao(valorColuna)
                console.log(entidade.data)
                return (entidade.data)
            }


        } catch (error) {
            console.log(error)
            return undefined
        } finally {

        }

    }

    function mudaValor(valor) {
        console.log(valor)
        console.log(props)
        setValorColuna(valor)

    }
    return (
        <Paper
            variant="outlined"
            elevation={0}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', boxShadow: 0, alignItems: 'center', maxWidth: 300 }}
        >
            <FormControl defaultValue="" >
                <InputBase placeholder={`Busca por ${props.coluna}`}
                    onChange={
                        (event) => {
                            mudaValor(event.target.value);
                        }} />
                <FormHelperText />
            </FormControl>
            <FormEdit  deletar={props.deletar} executa={executaFuncao} icone={<SearchIcon></SearchIcon>} funcao={props.editar} ignore='id'></FormEdit>
        </Paper>
    )
}
