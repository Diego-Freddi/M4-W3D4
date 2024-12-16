document.addEventListener('DOMContentLoaded', () => {
    // Recupero dei riferimenti agli elementi DOM necessari
    const selettoreFiltro = document.getElementById('dfTipoFiltro');    // Select per il tipo di filtro
    const campoDiRicerca = document.getElementById('dfCampoCerca');    // Input di ricerca
    const corpoTabella = document.getElementById('dfCorpoTabella');    // Corpo della tabella
    let utenti = [];  // Array che conterrà gli utenti recuperati dall'API

    // Funzione asincrona per recuperare gli utenti da API esterna
    async function recuperaUtenti() {
        try {
            // Effettua la chiamata HTTP all'endpoint degli utenti
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            // Converte la risposta in JSON e salva gli utenti nell'array
            utenti = await response.json();
            // Renderizza subito gli utenti recuperati
            mostraUtenti(utenti);
        } catch (error) {
            // Gestione degli errori durante il recupero
            console.error('Errore nel recupero degli utenti:', error);
        }
    }

    // Funzione che filtra gli utenti in base al testo cercato
    function filtraUtenti() {
        // Recupera il tipo di filtro selezionato (name/username/email)
        const tipoFiltro = selettoreFiltro.value;
        // Recupera il testo cercato e lo converte in minuscolo
        const testoCercato = campoDiRicerca.value.toLowerCase();

        // Filtra l'array degli utenti
        const utentiFiltrati = utenti.filter(utente => {
            // Verifica se il campo selezionato dell'utente contiene il testo cercato
            return utente[tipoFiltro].toLowerCase().includes(testoCercato);
        });

        // Renderizza gli utenti filtrati
        mostraUtenti(utentiFiltrati);
    }

    // Funzione che si occupa di visualizzare gli utenti nella tabella
    function mostraUtenti(utentiDaMostrare) {
        // Genera le righe della tabella mappando gli utenti
        corpoTabella.innerHTML = utentiDaMostrare.map(utente => `
            <tr>
                <td>${utente.name}</td>
                <td>${utente.username}</td>
                <td>${utente.email}</td>
            </tr>
        `).join(''); // Unisce tutte le righe in una singola stringa HTML
    }

    // Configurazione degli event listener
    selettoreFiltro.addEventListener('change', filtraUtenti);  // Ascolta i cambi nel select
    campoDiRicerca.addEventListener('input', filtraUtenti);    // Ascolta l'input di testo

    // Avvia il caricamento degli utenti quando la pagina è pronta
    recuperaUtenti();
});
