// import admin from "../../config/firebase-config";

const phoneVerification = async (resolve, source, args, context, info) => {
    // const {phoneVerification} = context;
    // let phoneNumber = "";
    //
    // await admin
    //     .auth()
    //     .verifyIdToken(phoneVerification)
    //     .then((decodedToken) => {
    //         phoneNumber = decodedToken.phone_number;
    //     })
    //     .catch(() => Promise.reject(new Error("Error happened!")));
    // if (phoneNumber === "") {
    //     return Promise.reject(new Error("Phone number not detected!"));
    // }
    // context.phoneNumber = phoneNumber;
    return resolve(source, args, context, info);
}

export default phoneVerification;
