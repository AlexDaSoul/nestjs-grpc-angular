export const getUserIdFromJWT = (jwt: string): string => {
    const token = jwt.split('.')[1];
    const payload = JSON.parse(atob(token));

    return payload.id;
};
