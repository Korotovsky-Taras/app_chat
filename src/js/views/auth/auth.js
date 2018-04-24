import {View} from '../view';
import {Auth} from '../../components/auth/auth';
import {User} from '../../models/user';

export class AuthView extends View {

    constructor(el) {
        super(el);
        this.auth = new Auth(this.el, {});

        this.auth.onLogin = (name, pwd) => {

            if (name && pwd) {
                let model = new User(name, pwd);
                model.save();
                location.hash = '#chat';
            } else {
                console.log('Authorization failed');
            }

        }
    }

}