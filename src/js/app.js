import {AuthView} from './views/auth/auth';
import {ChatView} from "./views/chat/chat";
import {Router} from './modules/router';

window.addEventListener('DOMContentLoaded', () => {
    let router = new Router();

    router.register('login', new AuthView(document.body));
    router.register('chat', new ChatView(document.body));

    router.start();
});
