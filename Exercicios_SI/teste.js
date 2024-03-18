class Alunos {

    constructor(nome, ra, p1, p2) {


        this.nome = nome;

        this.ra = ra;

        this.p1 = p1;

        this.p2 = p2;


    }

    media() {

        return (this.p1 + this.p2) / 2;


    }

    info() {

        return {

            nome: this.nome,
            ra: this.ra,
            p1: this.p1,
            p2: this.p2,
            media: this.media(),
            situacao: this.media() >= 6 ? "aprovado" : "reprovado"

        };

    }

}

function addAluno() {
    var nome = document.getElementById('nomeAluno');
    var ra = document.getElementById('raAluno');
    var p1 = document.getElementById('notaP1');
    var p2 = document.getElementById('notaP2');


    quantidade.style.display = 'flex';
    medias.style.display = 'flex';


    var aluno = new Alunos(nome.value, ra.value, parseFloat(p1.value), parseFloat(p2.value));


    const check = localStorage.getItem(ra.value);

    if(!check){

        localStorage.setItem(ra.value, JSON.stringify(aluno.info()));

        return inserirAlunoTabela(ra.value);

    }else{

        alert("Esse RA ja existe no sistema");
        
        nome.value = '';
        ra.value = '';
        p1.value = '';
        p2.value = '';

        return;

    };

}


function inserirAlunoTabela(ra){

    //Nesta area eu estarei manipulando objetos !!!
    
    var objAluno = JSON.parse(localStorage.getItem(ra));

    var p1Cor = objAluno.p1 >= 6 ? `<td class="p1" style="color:var(--aprovado)">${objAluno.p1}</td>` : `<td class="p1" style="color:var(--reprovado)">${objAluno.p1}</td>`;

    var p2Cor = objAluno.p2 >= 6 ? `<td class="p2" style="color:var(--aprovado)">${objAluno.p2}</td>` : `<td class="p2" style="color:var(--reprovado)">${objAluno.p2}</td>`;

    var mediaCor = objAluno.media >= 6 ? `<td style="color:var(--aprovado)">${objAluno.media}</td>` : `<td style="color:var(--reprovado)">${objAluno.media}</td>`;

    var situacaoCor = objAluno.situacao === 'aprovado' ? `<td class="situation" style="color:var(--aprovado)">${objAluno.situacao}</td>` : `<td class="situation" style="color:var(--reprovado)">${objAluno.situacao}</td>`;


    dialog.style.display = 'none';


    tbody.innerHTML += `<tr class="${objAluno.ra}"><td>${objAluno.nome}</td><td>${objAluno.ra}</td>${p1Cor}${p2Cor}${mediaCor}${situacaoCor}<td class="trash deletar"><i class="fa-solid fa-trash"></i></td></tr>`;


    var deleteIcons = document.querySelectorAll('.deletar');
        
        deleteIcons.forEach(function(icon) {
            icon.addEventListener('click', function() {

                var tr = this.parentNode;
                localStorage.removeItem(tr.className);

                tr.parentNode.removeChild(tr);
                quantidadeAprovado();
                mediaP1();
                mediaP2();
            });
        });
    

    quantidadeAprovado();
    mediaP1();
    mediaP2();


    addMaisAluno.style.display = 'block';
    table.style.display = 'table';
}

function atualizarSite(){

    for(let i = 0; i < localStorage.length; i++){
        inserirAlunoTabela(localStorage.key(i));
    }

    quantidadeAprovado();
    mediaP1();
    mediaP2();

    return;
}

function quantidadeAprovado(){
    ap = 0;
    re = 0;

    document.querySelectorAll('.situation').forEach(idx => {
        if(idx.textContent === 'aprovado'){
            ap++;
        }else{
            re++;
        }
    })

    document.getElementById('aprovados').innerText = `${ap}`;
    document.getElementById('reprovados').innerText = `${re}`;
}


function mediaP1(){
    mediaGeralP1 = 0;
    var i = 0;
    var result = 0;
    var aux = 0;

    document.querySelectorAll('.p1').forEach(idx => {
        result = parseFloat(idx.textContent) + aux;
        aux = result;
        i++;
    })

    result = result/i;

    if(result){

        document.getElementById('mediaP1').innerHTML = result.toFixed(2) >= 6 ? `<span style="color:var(--aprovado)">${result.toFixed(2)}</span>` : `<span style="color:var(--reprovado)">${result.toFixed(2)}</span>`;

    }else{

        document.getElementById('mediaP1').innerHTML = `<span style="color:var(--reprovado)">0</span>`

    }

    

}

function mediaP2(){
    mediaGeralP2 = 0;
    var i = 0;
    var result = 0;
    var aux = 0;

    document.querySelectorAll('.p2').forEach(idx => {
        result = parseFloat(idx.textContent) + aux;
        aux = result;
        i++;
    })

    result = result/i;
    
    

    if(result){

        document.getElementById('mediaP2').innerHTML = result.toFixed(2) >= 6 ? `<span style="color:var(--aprovado)">${result.toFixed(2)}</span>` : `<span style="color:var(--reprovado)">${result.toFixed(2)}</span>`;
        
    }else{

        document.getElementById('mediaP2').innerHTML = `<span style="color:var(--reprovado)">0</span>`;

    }
}
