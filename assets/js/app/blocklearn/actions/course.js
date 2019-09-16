export const fetchCourses = () => {
    return (dispatch, getState) => {
        let {token} = getState().auth;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["authorization"] = `Token ${token}`;
        }

        return fetch("/courses/list/", {headers, })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return dispatch({type: 'LIST_COURSES', courses: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}
