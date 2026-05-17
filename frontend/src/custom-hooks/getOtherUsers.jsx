import axios from "axios";
import { useEffect } from "react"
import { useDispatch, } from "react-redux"
import { Serverurl } from "../main";
import { setOtherUsers } from "../redux/userSlice";


const getOtherUsers = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let users = await axios.get(`${Serverurl}/api/user/other-users`, {
                    withCredentials: true
                });
                dispatch(setOtherUsers(users.data));
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        return;
                    }
                }
                console.log("Error fetching others user: ", error);
            }
        }
        fetchUser();
    }, [dispatch]);
}

export default getOtherUsers;