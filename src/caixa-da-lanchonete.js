class CaixaDaLanchonete {

    calcularValorDaCompra(formaDePagamento, itens) {
            const menu =[
            {codigo: 'cafe', descricao: 'Café', valor:3.0},
            {codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor:1.5},
            {codigo: 'suco', descricao: 'Suco Natural', valor:6.2},
            {codigo: 'sanduiche', descricao: 'Sanduíche', valor:6.5},
            {codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor:2.0},
            {codigo: 'salgado', descricao: 'Salgado', valor:7.25},
            {codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche ( não é principal)', valor:9.5},
            {codigo: 'combo2', descricao: '1 Café e 1 Sanduíche ( não é principal)', valor:7.5}
                         ];

          const itemExtraToPrincipal = {
             'chantily': 'cafe',
             'queijo': 'sanduiche',
                           
            };
            const combos = ['combo1', 'combo2'];

    const descontos = {
        dinheiro: 0.05,
        credito:0.03,
        debito:0.0
    }
    if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
      }
    if(!descontos.hasOwnProperty(formaDePagamento)){
        return 'Forma de pagamento inválida!';
    }
   
    let total  = 0;
    for(const item of itens){
        const [codigo, quantidade] = item.split(',');
        const menuItem = menu.find(item => item.codigo === codigo);
        const codigoPrincipal = itemExtraToPrincipal[codigo];
      
        
        if(!menuItem){
            return 'Item inválido!';
        }
        if(quantidade <= 0){
            return 'Quantidade inválida!';
        }
        if (menuItem.descricao.includes('extra')) {
           
            const codigoPrincipalNoPedido = itens.find(item => item.includes(codigoPrincipal));
            const quantidadePrincipalNoPedido = itens.filter(item => item.includes(codigoPrincipal)).length;
             const quantidadeExtrasNoPedido = itens.filter(item => item.includes(codigo)).length;

            if ((quantidadeExtrasNoPedido >= 2 && quantidadePrincipalNoPedido >= 1) || !codigoPrincipalNoPedido) {

                //permitir pedidos com mais de um extra se tiver ao menos um principal \\ Pedidos com 2 extras e um principal | (OK)
                //Pedidos apenas com principal (OK)
                //Pedidos apenas com extra (OK)
                //Pedidos com item extra respectivo (OK)
                //Pedidos com item extra não respectivo (OK)
                

              return 'Item extra não pode ser pedido sem o principal';
            }
          }
      
        const valorItem = menuItem.valor * parseInt(quantidade, 10);
        total += valorItem;
   // return "";
}

if(formaDePagamento === 'credito'){
    total += total * 0.03;
}else{
    total -= total * descontos[formaDePagamento];
}
return `R$ ${total.toFixed(2).replace('.', ',')}`;
}
}

export { CaixaDaLanchonete };
