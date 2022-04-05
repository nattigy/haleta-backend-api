import authRepository from "../data-access/auth-data-access";
import sessionUseCases from "./session-use-cases";


const createOneUser = async ({firstName, middleName, lastName, password, phoneNumber, image, email}) => {
    try {
        const user = await authRepository.createOneUser(
            {firstName, middleName, lastName, password, phoneNumber, image, email}
        );
        if (!user) {
            return Promise.reject(new Error("user create Error!"));
        }
        return sessionUseCases.saveNewSession(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createOneUser,
};
