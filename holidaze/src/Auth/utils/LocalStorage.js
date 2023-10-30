export const setToken = (token, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem("userName", userName);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserName = () => {
    return localStorage.getItem('userName')
};

export const removeToken = () => {
    localStorage.removeItem('token');
};



function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        if (isJsonString(value)) {
            return JSON.parse(value);
        }
        return value;
    } catch (err) {
        console.log(err);
        return null;
    }
}
