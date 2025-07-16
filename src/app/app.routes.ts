import { Routes } from '@angular/router';

import { Vogal } from './components/vogal/vogal';
import { App } from './app';
import { Home } from './components/home/home';
import { PedidoList } from './components/pedido-list/pedido-list';
import { PedidoForm } from './components/pedido-form/pedido-form';
import { PedidoDetalhado } from './components/pedido-detalhado/pedido-detalhado';
import { RelatorioResumo } from './components/relatorio-resumo/relatorio-resumo';
import { RelatorioPedidosPendentes } from './components/relatorio-pedidos-pendentes/relatorio-pedidos-pendentes';
import { ClientesMaisAtivos } from './components/clientes-mais-ativos/clientes-mais-ativos';
import { ProdutoList } from './components/produto-list/produto-list';
import { ProdutoForm } from './components/produto-form/produto-form';
import { ClienteList } from './components/cliente-list/cliente-list';
import { ClienteForm } from './components/cliente-form/cliente-form';


export const routes: Routes = [
    { path: '', component : Home },
    { path: 'vogal', component: Vogal },
    { path: 'pedidos', component: PedidoList },
    { path: 'pedido/novo', component: PedidoForm },
    { path: 'pedido/:id', component: PedidoDetalhado },

    { path: 'resumo', component: RelatorioResumo },
    { path: 'pendentes', component: RelatorioPedidosPendentes },
    { path: 'ativos', component: ClientesMaisAtivos },

    { path: 'produtos', component: ProdutoList },
    { path: 'produto/novo', component: ProdutoForm },
    { path: 'produtos/editar/:id', component: ProdutoForm },

    { path: 'clientes', component: ClienteList },
    { path: 'cliente/novo', component: ClienteForm },
    { path: 'clientes/editar/:id', component: ClienteForm },


















];
