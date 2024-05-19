class Pilha {
    constructor() {
        this.elementos = [];
        this.maxSize = 10;
    }

    isFull() {
        return this.elementos.length === this.maxSize;
    }

    isEmpty() {
        return this.elementos.length === 0;
    }

    push(elemento) {
        if (this.isFull()) {
            alert('A pilha está cheia!!!');
            return false;
        }
        if (elemento.includes(';')) {
            alert('O valor possui ; ');
            return false;
        }
        this.elementos.push(elemento);
        return true;
    }

    pop() {
        if (this.isEmpty()) {
            alert('A pilha está vazia!!!');
            return false;
        }
        this.elementos.pop();
        return true;
    }

    getElementos() {
        return this.elementos;
    }
}

class PilhaUI {
    constructor() {
        this.pilha = new Pilha();
        this.formPilha = document.getElementById('formPilha');
        this.elementoInput = document.getElementById('elemento');
        this.conteudoDiv = document.getElementById('conteudo');
        this.inserirBtn = document.getElementById('inserirBtn');
        this.retirarBtn = document.getElementById('retirarBtn');
        this.toggleViewBtn = document.getElementById('toggleViewBtn');
        this.isTableView = true;

        this.inserirBtn.addEventListener('click', () => this.adicionarElemento());
        this.retirarBtn.addEventListener('click', () => this.removerElemento());
        this.toggleViewBtn.addEventListener('click', () => this.toggleView());

        this.render();
    }

    setarCampo() {
        this.elementoInput.value = "";
        this.elementoInput.focus();
    }

    adicionarElemento() {
        const elemento = this.elementoInput.value.trim();
        if (elemento && this.pilha.push(elemento)) {
            this.render();
        }
    }

    removerElemento() {
        if (this.pilha.pop()) {
            this.render();
        }
    }

    toggleView() {
        this.isTableView = !this.isTableView;
        this.render();
    }

    render() {
        if (this.isTableView) {
            this.renderTable();
        } else {
            this.renderGraph();
        }
    }

    renderTable() {
        const elementos = this.pilha.getElementos();
        let retorno = `A quantidade de elementos da pilha é: ${elementos.length}`;
        retorno += "<br><table class='tabela'>";
        retorno += "<tr><td>Posição</td>";
        for (let i = 1; i <= this.pilha.maxSize; i++) {
            retorno += `<td>${i}</td>`;
        }
        retorno += "</tr><tr><td>Elemento</td>";
        
        elementos.forEach((el, index) => {
            retorno += `<td>${el}</td>`;
        });

        for (let i = elementos.length; i < this.pilha.maxSize; i++) {
            retorno += "<td></td>";
        }

        retorno += "</tr></table>";
        this.conteudoDiv.innerHTML = retorno;
        this.setarCampo();
    }

    renderGraph() {
        const elementos = this.pilha.getElementos();
        let retorno = `A quantidade de elementos da pilha é: ${elementos.length}`;
        retorno += "<br><div class='graph'>";
        
        elementos.forEach((el, index) => {
            retorno += `<div class='bar' style='height:${(index + 1) * 20}px;'>${el}</div>`;
        });

        this.conteudoDiv.innerHTML = retorno;
        this.setarCampo();
    }
}

document.addEventListener('DOMContentLoaded', () => new PilhaUI());