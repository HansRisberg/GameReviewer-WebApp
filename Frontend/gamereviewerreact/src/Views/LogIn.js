import LoginForm from "../Components/LoginForm"

const LoginView = () => {
    return(
        <div>
            <h1>Login View</h1>
            <p>This is where you can log in, to create a new user click link to register. Or You can login with : Email: TestUser@gmail.com, Password: Test/9 </p>
            <LoginForm />
        </div>
    );
};

export default LoginView;