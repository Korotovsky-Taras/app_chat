import {View} from '../view';
import {Chat} from "../../components/chat/chat";
import {Message} from '../../components/message/message';
import {User} from '../../models/user';


export class ChatView extends View {

    constructor(el) {
        super(el);

        this.user = User.get();

        if (!this.user) {
            location.hash = '#login';
            return;
        }

        this.chat = new Chat(document.createElement('div'), {});
        this.message = new Message(document.createElement('div'));

        this.el.appendChild(this.chat.el);
        this.el.appendChild(this.message.el);

        this.message.insertMessage = (text) => {
            this.chat.insertMessage(text);
        };

    }

}