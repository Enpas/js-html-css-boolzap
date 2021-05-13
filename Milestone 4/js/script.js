const app = new Vue({

  el: '#app',
  
  data: {
    user: {
      name: 'Nome Utente',
      avatar: '_io'
    },
    
    contacts: [
      {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
    ],
    
    currentContact: 0,
    messageSent: '',
    research: '',
    displayedChat: undefined

  },

  methods: {

    // con questa funzione è possibile inviare messaggi ai contatti tramite il tasto invio, e una volta ricevuto rispoderanno "ok" dopo 1 secondo. Inoltre vengono aggiunte anche la data e l'ora dell'ultimo accesso di ogni contatto
    replyMessage() {
      if (this.messageSent.trim().length != 0) {
        this.contacts[this.currentContact].messages.push(
          {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: this.messageSent,
            status: 'sent'
          }
        );
        this.messageSent = '';
        setTimeout(() => {
          this.contacts[this.currentContact].messages.push(
            {
              date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
              text: 'ok',
              status: 'received'
            }
          );
        }, 1000);
      } 
    },
    
    // funzione per riportare la data dell'ultimo messaggio del contatto attivo
    lastAccess(index) {
      let timeAccess = this.contacts[index].messages;
      return timeAccess[timeAccess.length - 1].date
    },

    // funzione per riportare il testo dell'ultimo messaggio del contatto attivo, troncato con '...' se più lungo di 30 caratteri, altrimenti per intero
    lastMessage(index) {
      let messageSlice = this.contacts[index].messages;
      if (messageSlice[messageSlice.length - 1].text.length > 30) {
        let slicedText = messageSlice[messageSlice.length - 1].text.slice(0,30);
        return slicedText + '...'
      } else {
      return messageSlice[messageSlice.length - 1].text
      }
    },

    // funzione per ricercare i contatti nell'input in alto a sinistra sopra la lista, vengono visualizzati solo i contatti che contengono le lettere inserite dall'utente
    researchUser(str) {
      this.contacts.forEach((contact) => {
        if (contact.name.toLowerCase().includes(str.toLowerCase())) {
          contact.visible = true;
        } else {
          contact.visible = false; 
        }
      })
    },

    // funzione per eliminare il messaggio selezionato
    deleteMessage(index) {
      this.contacts[this.currentContact].messages.splice(index, 1);
    }

  }

}); 