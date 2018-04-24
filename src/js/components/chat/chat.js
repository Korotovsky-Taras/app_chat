import {Message} from '../message/message';
import template from './chat.pug';

export class Chat {

    constructor(el, data) {
        this.el = el;
        this.data = data;
        this.render();

    }

    render(text = 'test', user = '') {
        this.el.innerHTML += template({
            text, user
        });
    }

    insertMessage(text) {
        this.render(text)
    }

}

