const main = `https://localhost:7044/api/`;

const routes = {

    // Admin
    admins: `${main}Admins`,
    adminRegister: `${main}Admins/register`,
    adminLogIn: `${main}Admins/login`,
    adminLogOut: `${main}Admins/logout`,
    adminProfilePicture: `${main}Admins/uploadProfilePicture`,
    adminAuthenticate: `${main}Admins/auth`,

}


export default routes;
