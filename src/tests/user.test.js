import db from "./db";
import userRepository from "../services/user/repository/user-repository";

beforeAll(async () => {
    await db.connect()
})

afterAll(async () =>
    await db.closeDatabase()
)

let user;
let userId;

describe('creates users', () => {
    const firstName = "bec";
    const middleName = "sam";
    const lastName = "mojo";
    const phoneNumber = "0911331133";
    const email = "bec@gmail.com";

    it('returns the created user', async() => {
        user = await userRepository.createOneUser({
            firstName,
            middleName,
            lastName,
            phoneNumber,
            password: "",
            email
        })
        // check if users are created with correct field
        userId = user._id;
        expect(user.firstName).toEqual(firstName);
        expect(user.middleName).toEqual(middleName);
        expect(user.lastName).toEqual(lastName);
        expect(user.phoneNumber).toEqual(phoneNumber);
        expect(user.email).toEqual(email);
    })
})

describe('updates user', () => {
    it ('updates user email', async () => {
        const newEmail = "mel@gmail.com";
        user = await userRepository.updateUserEmail({newEmail,userId});
        expect(user.email).toEqual(newEmail);
    })

    it ('updates user phone number', async () => {
        const newPhoneNumber = "0922345587";
        user = await userRepository.updateUserPhoneNumber({newPhoneNumber,userId});
        expect(user.phoneNumber).toEqual(newPhoneNumber);
    })

    it('updates user name', async () => {
        const firstName = "mel";
        const middleName = "mi";
        const lastName = "bel";
        user = await userRepository.updateUserName({firstName,middleName,lastName,userId})
        expect(user.firstName).toEqual(firstName);
        expect(user.middleName).toEqual(middleName);
        expect(user.lastName).toEqual(lastName);
    })

    it('updates user role', async () => {
        const role = "ADMIN";
        user = await userRepository.updateUserRole({role,userId});
        expect(user.role).toEqual(role);
    })

    it ('updates user status', async () => {
        const status = "BLOCKED";
        user = await userRepository.updateUserStatus({status,userId});
        expect(user.status).toEqual(status);
    })
})