import { GraficoBarra } from '../componentes/GraficoBarra';
import { GraficoPizza} from  '../componentes/GraficoPizza';
import { Nav } from '../componentes/Nav';
import * as React from 'react'; 

export function Painel(){
    return (
        <>
            < Nav classname="App-header"></Nav>
            <GraficoPizza></GraficoPizza>
            <GraficoBarra ></GraficoBarra>
        </>
        
    )
}