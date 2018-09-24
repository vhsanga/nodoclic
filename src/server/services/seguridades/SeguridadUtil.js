/**
 * Created by netoec84 on 30/07/17.
 */

export default class SeguridadUtil {

    static isUserInRol(user, rol) {
        for (let i = 0; i < user.perfiles.length; i++) {
            if (user.perfiles[i].perfil.pe_nombre == rol) {
                return true;
            }
        }
        return false;
    }

    static getUsernameFromRequest(req) {
        if (typeof req.user == 'undefined' || req.user == null || typeof req.user.username == 'undefined' || req.user.username == null) {
            return 'guest';
        }
        return req.user.username;
    }

}