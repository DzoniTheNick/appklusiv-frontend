interface UserToken {
    iat: number,
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    },
}

export default UserToken;