import RegistrationForm from "../Components/RegistrationForm";

const RegisterView = () => {
    return(
        <div>
            <h1>Register View</h1>
            <p>This is where you can register. Password requirements are : An uppercase character, lowercase character, a digit, and a non-alphanumeric character. Passwords must be at least six characters long. </p>
            <RegistrationForm />
        </div>
    );
};

export default RegisterView;