# Activate-Checked

## Introdução:
Activate-Checked é um plugin JQuery para resolver problemas de clicks em elementos com inputs. A proposta é tornar facil a ampliação da zona de click para marcar inputs do tipo checked and radio.

## Features:

1. Events:
Disparo de eventos no inicio e no fim de cada mudança de estado. 
*Veja como na sessão Options*.

2. Element Class:
Por padrão o quando o click é acionado num elemento, é adicionado a class active nele, mas você pode alterar o nome da classe.
*Veja como na sessão Options*.

3. Suporte para Radio and Checkbox:
Por padrão o plugin verifica se o input é checkbox ou radio. 
Quando é do tipo checkbox é possivel marcar mais do que um elemento (comportamento parecido com o checkbox), no caso do radio quando você seleciona um automaticamente desmarca o outro.

## Options:

| Option            | Type         | Default            | Obs                    |
|-------------------|--------------|--------------------|------------------------|
|elClass            | String       | active             | Será adicionado quando o estado do input for checked |
|onload             | function     | null               | Disparado quando antes do plugin ser ativado |
|onstart            | function     | null               | Disparado no click do elemento, antes de realizar qualquer mudança no elemento ou no input |
|onfinish           | function     | null               | Disparado no click do elemento, depois de realizar as mudanças no elemento e no input |


## Exemplo:

```javascript
var lines = $('table tr');
lines.activateChecked('input', {
    elClass: 'line-checked',
    onload: function() {
        console.log('Loading plugin...');
    }
});

lines.on('ac:start', function() {
    console.log('start checked in element:', this);
});

lines.on('ac:finish', function() {
    console.log('finish checked in element:', this);
});
```

## Contribuidores:

* Matheus Bordin