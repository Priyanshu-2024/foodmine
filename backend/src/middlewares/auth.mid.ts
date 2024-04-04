import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";


export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    console.log(token)
    if(!token) return res.status(HTTP_UNAUTHORIZED).send();

    try {
        const decodedUser = verify(token, 'SomeRandomText');
        req.user = decodedUser;

    } catch (error) {
        res.status(HTTP_UNAUTHORIZED).send();
   
    }

    return next();
}